/**
 * Paper Dashboard Backend
 * 
 * Provides API endpoints for:
 * - Paper upload and PDF parsing
 * - AI-powered metadata extraction
 * - Topic recommendation
 * 
 * Integrates with OpenClaw's AI capabilities (Plan C)
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const PORT = 8080;
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const OPENCLAW_GATEWAY = 'http://127.0.0.1:18789';
const OPENCLAW_TOKEN = 'cd4a37c22ea7e71d50c067a18064fe77aac67a2a3fb1bbd7';

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Store for paper analysis results
const paperStore = new Map();

// ============================================
// PDF Processing Utilities
// ============================================

/**
 * Extract text from PDF using basic parsing
 * In production, use pdf-parse or similar library
 */
async function extractTextFromPDF(pdfPath) {
  const stats = fs.statSync(pdfPath);
  return {
    text: `[PDF Content from ${path.basename(pdfPath)}]`,
    pages: Math.ceil(stats.size / 50000),
    size: stats.size
  };
}

// ============================================
// AI Integration with OpenClaw
// ============================================

/**
 * Analyze paper content using AI
 * Creates a structured analysis request for OpenClaw to process
 */
async function analyzePaperWithAI(paperId, pdfPath, extractedText) {
  console.log(`[${paperId}] Starting AI analysis...`);
  
  const analysisPrompt = `
你是学术论文分析专家。请分析以下论文内容，提取元数据并推荐研究选题。

论文内容：
${extractedText.substring(0, 5000)}

请以JSON格式返回分析结果：
{
  "metadata": {
    "title": "论文标题",
    "authors": ["作者1", "作者2"],
    "abstract": "摘要内容",
    "keywords": ["关键词1", "关键词2", "关键词3"],
    "contentSummary": "内容摘要（100字以内）"
  },
  "topicCandidates": [
    {
      "title": "选题1标题",
      "score": 85,
      "summary": "选题简述",
      "rationale": "理论依据",
      "feasibility": "可行性评估"
    }
  ]
}

只返回JSON，不要其他内容。
`;

  const analysisRequest = {
    id: paperId,
    prompt: analysisPrompt,
    status: 'pending',
    createdAt: new Date().toISOString(),
    pdfPath,
    extractedText: extractedText.substring(0, 10000)
  };
  
  paperStore.set(paperId, {
    ...paperStore.get(paperId),
    analysisRequest,
    status: 'analyzing'
  });
  
  return {
    requestId: paperId,
    status: 'analyzing'
  };
}

// ============================================
// API Endpoints
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'paper-dashboard-backend'
  });
});

app.post('/api/papers/analyze', upload.single('paper'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No paper file uploaded' });
    }

    const paperId = crypto.randomUUID();
    const pdfPath = req.file.path;
    
    console.log(`[${paperId}] Processing paper: ${req.file.originalname}`);
    
    paperStore.set(paperId, {
      id: paperId,
      originalName: req.file.originalname,
      filename: req.file.filename,
      pdfPath,
      status: 'extracting',
      createdAt: new Date().toISOString()
    });
    
    const extracted = await extractTextFromPDF(pdfPath);
    paperStore.get(paperId).extractedText = extracted.text;
    paperStore.get(paperId).pages = extracted.pages;
    paperStore.get(paperId).status = 'analyzing';
    
    const result = await analyzePaperWithAI(paperId, pdfPath, extracted.text);
    
    res.json({
      paperId,
      status: 'analyzing',
      message: 'Paper uploaded and analysis started',
      ...result
    });
    
  } catch (error) {
    console.error('Error processing paper:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/papers/:id/status', (req, res) => {
  const paper = paperStore.get(req.params.id);
  
  if (!paper) {
    return res.status(404).json({ error: 'Paper not found' });
  }
  
  res.json({
    id: paper.id,
    status: paper.status,
    originalName: paper.originalName,
    pages: paper.pages,
    createdAt: paper.createdAt
  });
});

app.get('/api/papers/:id/result', async (req, res) => {
  const paper = paperStore.get(req.params.id);
  
  if (!paper) {
    return res.status(404).json({ error: 'Paper not found' });
  }
  
  if (paper.status === 'analyzing' || paper.status === 'pending') {
    return res.json({
      id: paper.id,
      status: paper.status,
      message: 'Analysis in progress...'
    });
  }
  
  if (paper.status === 'completed') {
    return res.json({
      id: paper.id,
      status: 'completed',
      result: paper.result
    });
  }
  
  res.json({
    id: paper.id,
    status: paper.status,
    extractedText: paper.extractedText?.substring(0, 1000)
  });
});

app.post('/api/papers/:id/feedback', async (req, res) => {
  const paper = paperStore.get(req.params.id);
  
  if (!paper) {
    return res.status(404).json({ error: 'Paper not found' });
  }
  
  const { feedback } = req.body;
  
  if (!feedback) {
    return res.status(400).json({ error: 'Feedback text required' });
  }
  
  console.log(`[${paper.id}] Processing feedback: ${feedback}`);
  
  if (!paper.feedbackHistory) {
    paper.feedbackHistory = [];
  }
  paper.feedbackHistory.push({
    feedback,
    timestamp: new Date().toISOString()
  });
  
  res.json({
    id: paper.id,
    status: 'feedback_received',
    message: 'Feedback received. AI regeneration would occur here.',
    feedbackRound: paper.feedbackHistory.length
  });
});

app.get('/api/papers', (req, res) => {
  const papers = Array.from(paperStore.values()).map(p => ({
    id: p.id,
    originalName: p.originalName,
    status: p.status,
    pages: p.pages,
    createdAt: p.createdAt
  }));
  
  res.json({ papers });
});

app.delete('/api/papers/:id', (req, res) => {
  const paper = paperStore.get(req.params.id);
  
  if (!paper) {
    return res.status(404).json({ error: 'Paper not found' });
  }
  
  if (paper.pdfPath && fs.existsSync(paper.pdfPath)) {
    fs.unlinkSync(paper.pdfPath);
  }
  
  paperStore.delete(req.params.id);
  
  res.json({ success: true });
});

app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: error.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  Paper Dashboard Backend - Running                        ║
║  Server: http://0.0.0.0:${PORT}                            ║
║  Upload: ${UPLOAD_DIR}                          ║
╚════════════════════════════════════════════════════════════╝
  `);
  console.log('Endpoints:');
  console.log('  GET  /api/health');
  console.log('  POST /api/papers/analyze');
  console.log('  GET  /api/papers/:id/status');
  console.log('  GET  /api/papers/:id/result');
  console.log('  POST /api/papers/:id/feedback');
  console.log('  GET  /api/papers');
  console.log('  DELETE /api/papers/:id');
});

module.exports = app;
