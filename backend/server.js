/**
 * Paper Dashboard Backend - with Real AI Processing
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
const logger = require('./logger');

const PORT = 8080;
const SHARED_DIR = path.join(__dirname, '..', 'shared');
const PAPERS_DIR = path.join(SHARED_DIR, 'papers');
const KEY_FILE = path.join(__dirname, '.api_key');
const PROCESSOR_SCRIPT = path.join(__dirname, 'processor.js');

function getApiKey() {
  if (process.env.API_KEY) return process.env.API_KEY;
  if (fs.existsSync(KEY_FILE)) {
    const saved = fs.readFileSync(KEY_FILE, 'utf-8').trim();
    if (saved) return saved;
  }
  const newKey = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(KEY_FILE, newKey);
  return newKey;
}

const API_KEY = getApiKey();
const ALLOWED_ORIGINS = ['http://192.168.1.161:3460', 'http://localhost:3000', 'http://localhost:8080'];

function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'] || req.query.api_key;
  if (!key) return res.status(401).json({ error: 'API key required' });
  if (key !== API_KEY) return res.status(403).json({ error: 'Invalid API key' });
  next();
}

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

[SHARED_DIR, PAPERS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.api('info', 'API request', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PAPERS_DIR),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files allowed'));
  }
});

function createInitialStatus(taskId) {
  return {
    task_id: taskId,
    stage: 'INTAKE',
    stage_status: 'idle',
    progress: { papers_processed: 0, papers_total: 0, topics_generated: 0 },
    result: null,
    messages: [{ timestamp: new Date().toISOString(), from: 'system', content: '任务已创建: 未指定标题论文' }],
    title: '未指定标题论文',
    error: null,
    updated_at: new Date().toISOString()
  };
}

function updateStatus(taskId, updates) {
  const statusPath = path.join(PAPERS_DIR, taskId, 'status.json');
  if (!fs.existsSync(statusPath)) return null;
  const status = JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
  const updated = { ...status, ...updates, updated_at: new Date().toISOString() };
  fs.writeFileSync(statusPath, JSON.stringify(updated, null, 2));
  logger.api('info', 'Status updated', { taskId, ...updates });
  return updated;
}

function getStatus(taskId) {
  const statusPath = path.join(PAPERS_DIR, taskId, 'status.json');
  if (!fs.existsSync(statusPath)) return null;
  return JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
}

// Public endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/key', (req, res) => {
  res.json({ message: 'Pass X-Api-Key header' });
});

// Debug endpoints
app.get('/api/debug/logs', (req, res) => {
  const logs = logger.readRecent(200);
  res.json({ logs, count: logs.length });
});

app.post('/api/debug/logs/clear', (req, res) => {
  fs.writeFileSync('/tmp/paper-dashboard-debug.log', '');
  res.json({ success: true });
});

// Protected endpoints
app.use('/api', requireApiKey);

app.post('/api/tasks', (req, res) => {
  const taskId = crypto.randomUUID();
  const taskDir = path.join(PAPERS_DIR, taskId);
  fs.mkdirSync(path.join(taskDir, 'input'), { recursive: true });
  fs.mkdirSync(path.join(taskDir, 'workspace'), { recursive: true });
  
  const status = createInitialStatus(taskId);
  fs.writeFileSync(path.join(taskDir, 'status.json'), JSON.stringify(status, null, 2));
  
  logger.api('info', 'Task created', { taskId });
  res.json({ task_id: taskId, status });
});

app.post('/api/tasks/:taskId/papers', upload.single('paper'), async (req, res) => {
  const { taskId } = req.params;
  logger.upload('info', 'Upload started', { taskId, filename: req.file?.originalname });
  
  const taskDir = path.join(PAPERS_DIR, taskId);
  if (!fs.existsSync(taskDir)) {
    logger.upload('error', 'Task not found', { taskId });
    return res.status(404).json({ error: 'Task not found' });
  }
  
  if (!req.file) {
    logger.upload('error', 'No file uploaded', { taskId });
    return res.status(400).json({ error: 'No paper uploaded' });
  }
  
  const inputDir = path.join(taskDir, 'input');
  fs.renameSync(req.file.path, path.join(inputDir, req.file.originalname));
  
  const status = getStatus(taskId);
  const newTotal = (status?.progress?.papers_total || 0) + 1;
  updateStatus(taskId, {
    progress: { ...status?.progress, papers_total: newTotal },
    messages: [...(status?.messages || []), { timestamp: new Date().toISOString(), from: 'system', content: `已上传: ${req.file.originalname}` }]
  });
  
  logger.upload('info', 'Upload complete', { taskId, filename: req.file.originalname, papers_total: newTotal });
  res.json({ success: true, paper_name: req.file.originalname, papers_total: newTotal });
});

app.get('/api/tasks/:taskId/status', (req, res) => {
  const status = getStatus(req.params.taskId);
  if (!status) return res.status(404).json({ error: 'Task not found' });
  res.json(status);
});

// 关键修复：trigger 现在真正启动 AI 处理
app.post('/api/tasks/:taskId/trigger', async (req, res) => {
  const { taskId } = req.params;
  
  if (!fs.existsSync(path.join(PAPERS_DIR, taskId))) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const status = getStatus(taskId);
  if (!status || status.progress.papers_total === 0) {
    return res.status(400).json({ error: 'No papers uploaded yet' });
  }

  logger.api('info', 'Trigger called - starting AI processing', { taskId });
  
  // 更新状态为处理中
  updateStatus(taskId, { stage_status: 'processing' });
  
  // 启动处理器子进程
  const processor = spawn('node', [PROCESSOR_SCRIPT, taskId], {
    stdio: ['ignore', 'pipe', 'pipe']
  });
  
  processor.stdout.on('data', (data) => {
    const msg = data.toString().trim();
    if (msg) {
      logger.processor?.('info', msg);
    }
  });
  
  processor.stderr.on('data', (data) => {
    const msg = data.toString().trim();
    if (msg) {
      logger.processor?.('error', msg);
    }
  });
  
  processor.on('close', (code) => {
    if (code === 0) {
      logger.api('info', 'AI processing completed', { taskId });
    } else {
      logger.api('error', 'AI processing failed', { taskId, code });
      updateStatus(taskId, { stage_status: 'error', error: 'Processing failed' });
    }
  });
  
  res.json({ success: true, message: 'AI processing started' });
});

app.get('/api/tasks', (req, res) => {
  const tasks = fs.readdirSync(PAPERS_DIR)
    .filter(f => fs.statSync(path.join(PAPERS_DIR, f)).isDirectory())
    .map(taskId => {
      const status = getStatus(taskId);
      return { task_id: taskId, stage: status?.stage, stage_status: status?.stage_status, papers_total: status?.progress?.papers_total, updated_at: status?.updated_at };
    })
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  res.json({ tasks });
});

app.get('/api/tasks/:taskId/topics', (req, res) => {
  const topicsPath = path.join(PAPERS_DIR, req.params.taskId, 'topics.json');
  res.json({ topics: fs.existsSync(topicsPath) ? JSON.parse(fs.readFileSync(topicsPath, 'utf-8')) : [] });
});

app.post('/api/tasks/:taskId/topics', (req, res) => {
  const { taskId } = req.params;
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic required' });
  fs.writeFileSync(path.join(PAPERS_DIR, taskId, 'topics.json'), JSON.stringify(topic, null, 2));
  updateStatus(taskId, { stage_status: 'waiting_confirm', result: { selected_topic: topic } });
  logger.api('info', 'Topic selected', { taskId });
  res.json({ success: true });
});

app.post('/api/tasks/:taskId/messages', (req, res) => {
  const { taskId } = req.params;
  const { action, data } = req.body;
  const status = getStatus(taskId);
  if (!status) return res.status(404).json({ error: 'Task not found' });

  if (action === 'feedback') {
    const msg = {
      timestamp: new Date().toISOString(),
      from: 'user',
      content: `[Feedback] ${data.feedback}`
    };
    updateStatus(taskId, {
      messages: [...(status.messages || []), msg]
    });
    logger.api('info', 'User feedback received', { taskId, feedback: data.feedback });
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Unknown action' });
  }
});

app.delete('/api/tasks/:taskId', (req, res) => {
  const taskDir = path.join(PAPERS_DIR, req.params.taskId);
  if (!fs.existsSync(taskDir)) return res.status(404).json({ error: 'Task not found' });
  fs.rmSync(taskDir, { recursive: true, force: true });
  logger.api('info', 'Task deleted', { taskId: req.params.taskId });
  res.json({ success: true });
});

app.use((error, req, res, next) => {
  logger.error('SERVER', error.message, { stack: error.stack });
  res.status(500).json({ error: error.message });
});

app.listen(PORT, '0.0.0.0', () => {
  logger.api('info', 'Server started', { port: PORT });
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  Paper Dashboard Backend                          ║`);
  console.log(`║  Port: ${PORT}                                      ║`);
  console.log(`║  Processor: ENABLED                               ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);
});

module.exports = app;
