/**
 * Paper Dashboard Backend - Security Enhanced (Fixed)
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 8080;
const SHARED_DIR = path.join(__dirname, '..', 'shared');
const PAPERS_DIR = path.join(SHARED_DIR, 'papers');
const KEY_FILE = path.join(__dirname, '.api_key');

// API 密钥管理
function getApiKey() {
  // 1. 先尝试从环境变量读取
  if (process.env.API_KEY) {
    return process.env.API_KEY;
  }
  
  // 2. 从文件读取
  if (fs.existsSync(KEY_FILE)) {
    const saved = fs.readFileSync(KEY_FILE, 'utf-8').trim();
    if (saved) return saved;
  }
  
  // 3. 生成新密钥并保存
  const newKey = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(KEY_FILE, newKey);
  console.log(`[Security] New API key generated: ${newKey}`);
  return newKey;
}

const API_KEY = getApiKey();

const ALLOWED_ORIGINS = [
  'http://192.168.1.161:3460',
  'http://localhost:3000',
  'http://localhost:8080'
];

// API 密钥认证中间件
function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'] || req.query.api_key;
  
  if (!key) {
    return res.status(401).json({ error: 'API key required', hint: 'Use X-Api-Key header' });
  }
  
  if (key !== API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  
  next();
}

// CORS 配置
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[Security] Blocked CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// 确保目录存在
[SHARED_DIR, PAPERS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

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

// ============================================
// Status Management
// ============================================

function createInitialStatus(taskId) {
  return {
    task_id: taskId,
    stage: 'INTAKE',
    stage_status: 'idle',
    progress: { papers_processed: 0, papers_total: 0, topics_generated: 0 },
    result: null,
    messages: [{ timestamp: new Date().toISOString(), from: 'system', content: '任务已创建' }],
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
  return updated;
}

function getStatus(taskId) {
  const statusPath = path.join(PAPERS_DIR, taskId, 'status.json');
  if (!fs.existsSync(statusPath)) return null;
  return JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
}

// ============================================
// API Endpoints
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/key', (req, res) => {
  res.json({ message: 'Pass X-Api-Key header or api_key query param' });
});

// 所有其他端点都需要认证
app.use('/api', requireApiKey);

app.post('/api/tasks', (req, res) => {
  const taskId = crypto.randomUUID();
  const taskDir = path.join(PAPERS_DIR, taskId);
  fs.mkdirSync(path.join(taskDir, 'input'), { recursive: true });
  fs.mkdirSync(path.join(taskDir, 'workspace'), { recursive: true });
  const status = createInitialStatus(taskId);
  fs.writeFileSync(path.join(taskDir, 'status.json'), JSON.stringify(status, null, 2));
  res.json({ task_id: taskId, status });
});

app.post('/api/tasks/:taskId/papers', upload.single('paper'), async (req, res) => {
  const { taskId } = req.params;
  const taskDir = path.join(PAPERS_DIR, taskId);
  if (!fs.existsSync(taskDir)) return res.status(404).json({ error: 'Task not found' });
  if (!req.file) return res.status(400).json({ error: 'No paper uploaded' });
  
  const inputDir = path.join(taskDir, 'input');
  fs.renameSync(req.file.path, path.join(inputDir, req.file.originalname));
  
  const status = getStatus(taskId);
  updateStatus(taskId, {
    progress: { ...status?.progress, papers_total: (status?.progress?.papers_total || 0) + 1 }
  });
  
  res.json({ success: true, paper_name: req.file.originalname });
});

app.get('/api/tasks/:taskId/status', (req, res) => {
  const status = getStatus(req.params.taskId);
  if (!status) return res.status(404).json({ error: 'Task not found' });
  res.json(status);
});

app.post('/api/tasks/:taskId/trigger', async (req, res) => {
  const { taskId } = req.params;
  if (!fs.existsSync(path.join(PAPERS_DIR, taskId))) {
    return res.status(404).json({ error: 'Task not found' });
  }
  updateStatus(taskId, { stage_status: 'processing' });
  res.json({ success: true });
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
  res.json({ success: true });
});

app.delete('/api/tasks/:taskId', (req, res) => {
  const taskDir = path.join(PAPERS_DIR, req.params.taskId);
  if (!fs.existsSync(taskDir)) return res.status(404).json({ error: 'Task not found' });
  fs.rmSync(taskDir, { recursive: true, force: true });
  res.json({ success: true });
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  Paper Dashboard Backend - Security Enhanced            ║
║  Port:     ${PORT}                                        ║
║  Auth:     X-Api-Key Required                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
