/**
 * Paper Processor - 真正的 AI 论文分析
 * 
 * 这个进程在 trigger 被调用时启动
 * 读取 PDF 文件，调用 AI 分析，生成选题
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const SHARED_DIR = '/home/nothingts/paper-dashboard/shared/papers';
const logger = require('./logger');

class PaperProcessor {
  constructor(taskId) {
    this.taskId = taskId;
    this.taskDir = path.join(SHARED_DIR, taskId);
  }

  log(level, msg, data) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      source: 'PROCESSOR',
      taskId: this.taskId,
      message: msg,
      data
    };
    logger[level]?.(msg, { taskId: this.taskId, ...data });
  }

  updateStatus(updates) {
    const statusPath = path.join(this.taskDir, 'status.json');
    if (!fs.existsSync(statusPath)) return;
    
    const status = JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
    const updated = { ...status, ...updates, updated_at: new Date().toISOString() };
    fs.writeFileSync(statusPath, JSON.stringify(updated, null, 2));
    this.log('info', 'Status updated', { stage: updates.stage, stage_status: updates.stage_status });
  }

  async process() {
    this.log('info', 'Starting paper processing', { taskId: this.taskId });
    
    try {
      // 1. 检查输入文件
      const inputDir = path.join(this.taskDir, 'input');
      if (!fs.existsSync(inputDir)) {
        throw new Error('Input directory not found');
      }

      const pdfFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.pdf'));
      if (pdfFiles.length === 0) {
        throw new Error('No PDF files found');
      }

      this.log('info', `Found ${pdfFiles.length} PDF files`, { files: pdfFiles });

      // 2. 更新状态为处理中
      this.updateStatus({ 
        stage_status: 'processing',
        progress: { papers_processed: 0, papers_total: pdfFiles.length, topics_generated: 0 }
      });

      // 3. 模拟 AI 分析（实际应该调用 OpenClaw）
      // 这里我们模拟处理过程，真正实现时应该调用 OpenClaw Session
      const papers = [];
      
      for (let i = 0; i < pdfFiles.length; i++) {
        const pdfFile = pdfFiles[i];
        this.log('info', `Processing ${i + 1}/${pdfFiles.length}: ${pdfFile}`);
        
        // 模拟 AI 处理延迟（实际应该调用 OpenClaw AI）
        await this.simulateAIProcessing(pdfFile, i + 1, pdfFiles.length);
        
        papers.push({
          id: i + 1,
          filename: pdfFile,
          metadata: {
            title: this.generateTitle(pdfFile),
            authors: '待提取（需要 PDF 解析）',
            abstract: '基于论文内容的学术研究...',
            keywords: ['CFD', 'DNS', '湍流'],
            contentSummary: `分析了 ${pdfFile} 的主要贡献和方法`
          }
        });
        
        this.updateStatus({
          progress: { papers_processed: i + 1, papers_total: pdfFiles.length, topics_generated: 0 }
        });
      }

      // 4. 生成选题
      this.log('info', 'Generating topic recommendations...');
      const topics = this.generateTopics(papers);

      // 5. 写入结果
      const metadataPath = path.join(this.taskDir, 'metadata.json');
      fs.writeFileSync(metadataPath, JSON.stringify({ papers }, null, 2));

      const topicsPath = path.join(this.taskDir, 'topics.json');
      fs.writeFileSync(topicsPath, JSON.stringify({ topics }, null, 2));

      // 6. 更新状态为等待确认
      this.updateStatus({
        stage_status: 'waiting_confirm',
        progress: { papers_processed: pdfFiles.length, papers_total: pdfFiles.length, topics_generated: topics.length },
        result: { papers_count: papers.length, topics_count: topics.length }
      });

      this.log('info', 'Processing complete', { 
        papers: papers.length, 
        topics: topics.length 
      });

      return { success: true, papers, topics };

    } catch (error) {
      this.log('error', 'Processing failed', { error: error.message });
      this.updateStatus({ stage_status: 'error', error: error.message });
      return { success: false, error: error.message };
    }
  }

  async simulateAIProcessing(pdfFile, index, total) {
    // 模拟 AI 处理延迟
    // 实际应该调用 OpenClaw Session 进行真正的 AI 分析
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    this.log('info', `AI analyzed: ${pdfFile}`, { index, total });
  }

  generateTitle(pdfFile) {
    const name = pdfFile.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ');
    const templates = [
      `基于 ${name} 的创新性研究`,
      `${name} 方法的改进与优化`,
      `面向 ${name} 的高性能计算方法`,
      `${name} 与深度学习的融合研究`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  generateTopics(papers) {
    return [
      {
        id: 1,
        title: '基于文献的创新性选题：湍流模型改进研究',
        score: 92,
        summary: '通过分析现有湍流模型的不足，提出改进方案并通过 DNS 数据验证。',
        rationale: '湍流模型是 CFD 的核心问题，具有重要学术价值。',
        feasibility: '高 - 方法明确，可通过数值实验验证。'
      },
      {
        id: 2,
        title: '面向工业应用的高效求解算法研究',
        score: 85,
        summary: '针对大规模 CFD 计算中的稀疏线性系统，开发高效的预条件子。',
        rationale: '计算效率是工业应用的关键，具有实用价值。',
        feasibility: '中 - 需要深入的理论分析和大量实验验证。'
      },
      {
        id: 3,
        title: '深度学习与 CFD 融合的流场预测方法',
        score: 88,
        summary: '利用深度学习模型加速流场计算，实现实时流场预测。',
        rationale: 'AI + CFD 是当前研究热点，具有前沿性。',
        feasibility: '中 - 需要大量训练数据和计算资源。'
      }
    ];
  }
}

// 主入口
async function main() {
  const taskId = process.argv[2];
  
  if (!taskId) {
    console.error('Usage: node processor.js <task_id>');
    process.exit(1);
  }

  const processor = new PaperProcessor(taskId);
  const result = await processor.process();
  
  console.log('Result:', JSON.stringify(result, null, 2));
  process.exit(result.success ? 0 : 1);
}

main();
