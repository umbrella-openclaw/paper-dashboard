/**
 * Paper Dashboard Backend - Hybrid Session Trigger
 * 
 * 混合方案实现：
 * 1. 接收 Dashboard 上传请求
 * 2. 保存文件到 shared/ 目录
 * 3. 调用 sessions_spawn 触发 OpenClaw
 * 4. 提供状态轮询接口
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const PORT = 8080;
const SHARED_DIR = path.join(__dirname, '..', 'shared');
const PAPERS_DIR = path.join(SHARED_DIR, 'papers');
const OPENCLAW_CLI = '/home/nothingts/.npm-global/bin/openclaw';

// Ensure directories exist
[SHARED_DIR, PAPERS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PAPERS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
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
    progress: {
      papers_processed: 0,
      papers_total: 0,
      topics_generated: 0
    },
    result: null,
    messages: [
      {
        timestamp: new Date().toISOString(),
        from: 'system',
        content: '任务已创建，等待上传参考论文'
      }
    ],
    error: null,
    updated_at: new Date().toISOString()
  };
}

function updateStatus(taskId, updates) {
  const statusPath = path.join(PAPERS_DIR, taskId, 'status.json');
  if (!fs.existsSync(statusPath)) {
    return null;
  }
  
  const status = JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
  const updated = { ...status, ...updates, updated_at: new Date().toISOString() };
  fs.writeFileSync(statusPath, JSON.stringify(updated, null, 2));
  return updated;
}

function getStatus(taskId) {
  const statusPath = path.join(PAPERS_DIR, taskId, 'status.json');
  if (!fs.existsSync(statusPath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
}

function addMessage(taskId, from, content) {
  const status = getStatus(taskId);
  if (!status) return null;
  
  status.messages.push({
    timestamp: new Date().toISOString(),
    from,
    content
  });
  
  return updateStatus(taskId, { messages: status.messages });
}

// ============================================
// Session Trigger
// ============================================

function triggerOpenClawSession(taskId) {
  console.log(`[${taskId}] Triggering OpenClaw session...`);
  
  // Update status to processing
  updateStatus(taskId, {
    stage_status: 'processing',
    messages: [{
      timestamp: new Date().toISOString(),
      from: 'system',
      content: '正在启动 OpenClaw Session...'
    }]
  });
  
  // Create workspace directory
  const workspaceDir = path.join(PAPERS_DIR, taskId, 'workspace');
  if (!fs.existsSync(workspaceDir)) {
    fs.mkdirSync(workspaceDir, { recursive: true });
  }
  
  // The actual session spawning will be done by the frontend
  // This backend just manages file storage and status
  return { success: true, taskId };
}

// ============================================
// API Endpoints
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'paper-dashboard-backend',
    shared_dir: PAPERS_DIR
  });
});

/**
 * Create a new paper task
 */
app.post('/api/tasks', (req, res) => {
  const taskId = crypto.randomUUID();
  const taskDir = path.join(PAPERS_DIR, taskId);
  
  // Create task directory structure
  fs.mkdirSync(path.join(taskDir, 'input'), { recursive: true });
  fs.mkdirSync(path.join(taskDir, 'workspace'), { recursive: true });
  
  // Initialize status
  const status = createInitialStatus(taskId);
  fs.writeFileSync(
    path.join(taskDir, 'status.json'),
    JSON.stringify(status, null, 2)
  );
  
  res.json({ task_id: taskId, status });
});

/**
 * Upload paper to existing task
 */
app.post('/api/tasks/:taskId/papers', upload.single('paper'), async (req, res) => {
  const { taskId } = req.params;
  const taskDir = path.join(PAPERS_DIR, taskId);
  
  if (!fs.existsSync(taskDir)) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  if (!req.file) {
    return res.status(400).json({ error: 'No paper file uploaded' });
  }
  
  const inputDir = path.join(taskDir, 'input');
  const targetPath = path.join(inputDir, req.file.originalname);
  
  // Move file to input directory
  fs.renameSync(req.file.path, targetPath);
  
  // Update status
  const status = getStatus(taskId);
  const papers_total = (status?.progress?.papers_total || 0) + 1;
  
  updateStatus(taskId, {
    progress: { ...status?.progress, papers_total },
    messages: [{
      timestamp: new Date().toISOString(),
      from: 'system',
      content: `已上传参考论文: ${req.file.originalname}`
    }]
  });
  
  res.json({
    success: true,
    paper_name: req.file.originalname,
    papers_total
  });
});

/**
 * Get task status
 */
app.get('/api/tasks/:taskId/status', (req, res) => {
  const { taskId } = req.params;
  const status = getStatus(taskId);
  
  if (!status) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json(status);
});

/**
 * Trigger OpenClaw Session for a task
 */
app.post('/api/tasks/:taskId/trigger', async (req, res) => {
  const { taskId } = req.params;
  const taskDir = path.join(PAPERS_DIR, taskId);
  
  if (!fs.existsSync(taskDir)) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const status = getStatus(taskId);
  if (status.progress.papers_total === 0) {
    return res.status(400).json({ error: 'No papers uploaded yet' });
  }
  
  // Trigger session
  const result = triggerOpenClawSession(taskId);
  
  res.json(result);
});

/**
 * List all tasks
 */
app.get('/api/tasks', (req, res) => {
  const tasks = fs.readdirSync(PAPERS_DIR)
    .filter(f => {
      const stat = fs.statSync(path.join(PAPERS_DIR, f));
      return stat.isDirectory();
    })
    .map(taskId => {
      const status = getStatus(taskId);
      return {
        task_id: taskId,
        stage: status?.stage,
        stage_status: status?.stage_status,
        papers_total: status?.progress?.papers_total,
        updated_at: status?.updated_at
      };
    })
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  
  res.json({ tasks });
});

/**
 * Get topics for a task
 */
app.get('/api/tasks/:taskId/topics', (req, res) => {
  const { taskId } = req.params;
  const topicsPath = path.join(PAPERS_DIR, taskId, 'topics.json');
  
  if (!fs.existsSync(topicsPath)) {
    return res.json({ topics: [] });
  }
  
  const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf-8'));
  res.json({ topics });
});

/**
 * Save selected topic
 */
app.post('/api/tasks/:taskId/topics', (req, res) => {
  const { taskId } = req.params;
  const { topic } = req.body;
  
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }
  
  const topicsPath = path.join(PAPERS_DIR, taskId, 'topics.json');
  fs.writeFileSync(topicsPath, JSON.stringify(topic, null, 2));
  
  updateStatus(taskId, {
    stage_status: 'waiting_confirm',
    result: { selected_topic: topic }
  });
  
  res.json({ success: true });
});

/**
 * Send message to task (for Dashboard → Session communication)
 */
app.post('/api/tasks/:taskId/messages', (req, res) => {
  const { taskId } = req.params;
  const { action, data } = req.body;
  
  if (!action) {
    return res.status(400).json({ error: 'Action is required' });
  }
  
  // Add message to status
  addMessage(taskId, 'user', `Action: ${action}, Data: ${JSON.stringify(data)}`);
  
  res.json({ success: true, action });
});

/**
 * Delete task
 */
app.delete('/api/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  const taskDir = path.join(PAPERS_DIR, taskId);
  
  if (!fs.existsSync(taskDir)) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  // Delete all files
  fs.rmSync(taskDir, { recursive: true, force: true });
  
  res.json({ success: true });
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: error.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  Paper Dashboard Backend - Hybrid Session                ║
║  ─────────────────────────────────────────────────────  ║
║  Server:    http://0.0.0.0:${PORT}                        ║
║  Shared:    ${PAPERS_DIR}  ║
╚════════════════════════════════════════════════════════════╝
  `);
  console.log('Endpoints:');
  console.log('  POST /api/tasks                    - Create new task');
  console.log('  POST /api/tasks/:id/papers        - Upload paper');
  console.log('  GET  /api/tasks/:id/status        - Get task status');
  console.log('  POST /api/tasks/:id/trigger       - Trigger OpenClaw session');
  console.log('  GET  /api/tasks                    - List all tasks');
  console.log('  GET  /api/tasks/:id/topics        - Get topics');
  console.log('  POST /api/tasks/:id/topics        - Save selected topic');
  console.log('  POST /api/tasks/:id/messages      - Send message to session');
});

module.exports = app;
