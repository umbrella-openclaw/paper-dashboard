import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const API_BASE = 'http://192.168.1.161:8080';

interface UploadedPaper {
  id: number;
  name: string;
  pages: number;
  status: 'uploaded' | 'processing' | 'analyzing' | 'done' | 'error';
  paperId?: string;
  metadata?: {
    title: string;
    authors: string;
    abstract: string;
    keywords: string[];
    contentSummary: string;
  };
}

interface TopicCandidate {
  id: number;
  title: string;
  score: number;
  summary: string;
  rationale: string;
  feasibility: string;
}

interface TopicFeedback {
  topicId: number;
  feedback: string;
  timestamp: Date;
}

interface SelectedTopic {
  title: string;
  researchObjective: string;
  expectedContribution: string;
  selectedCandidateId: number | null;
}

interface AnalysisResult {
  metadata: {
    title: string;
    authors: string;
    abstract: string;
    keywords: string[];
    contentSummary: string;
  };
  topicCandidates: TopicCandidate[];
}

@customElement('config-stage')
export class ConfigStage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1.2fr 1fr;
      gap: var(--space-4);
      align-items: start;
    }

    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
      display: grid;
      gap: var(--space-4);
      min-height: 520px;
      max-height: 80vh;
      overflow-y: auto;
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .panel h3 .step {
      background: var(--color-accent);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-xs);
    }

    .panel p {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .dropzone {
      border: 1.5px dashed var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-bg);
      padding: var(--space-6) var(--space-4);
      text-align: center;
      transition: all var(--transition-base);
      cursor: pointer;
    }

    .dropzone:hover {
      border-color: var(--color-accent);
      background: #f0fdf4;
      transform: translateY(-1px);
    }

    .dropzone.dragover {
      border-color: var(--color-accent);
      background: #d1fae5;
      transform: scale(1.02);
    }

    .dropzone input {
      display: none;
    }

    .subtle {
      color: var(--color-text-tertiary);
      font-size: var(--text-xs);
    }

    .paper-list {
      display: grid;
      gap: var(--space-2);
      max-height: 280px;
      overflow-y: auto;
      border-top: 1px solid var(--color-border-light);
      padding-top: var(--space-3);
    }

    .paper-item {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--space-2);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .paper-name {
      font-size: var(--text-sm);
      color: var(--color-text-primary);
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .paper-meta {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-top: 2px;
    }

    .paper-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .status {
      font-size: 10px;
      border-radius: 999px;
      font-weight: 700;
      padding: 3px 8px;
      text-align: center;
    }

    .status.uploaded {
      background: #f4f4f5;
      color: #52525b;
    }

    .status.processing {
      background: #dbeafe;
      color: #1e40af;
    }

    .status.analyzing {
      background: #fef3c7;
      color: #92400e;
    }

    .status.done {
      background: #d1fae5;
      color: #065f46;
    }

    .status.error {
      background: #fee2e2;
      color: #991b1b;
    }

    .metadata-preview {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      font-size: var(--text-xs);
      margin-top: var(--space-2);
    }

    .metadata-preview .meta-title {
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    .metadata-preview .meta-authors {
      color: var(--color-text-secondary);
    }

    .metadata-preview .meta-keywords {
      margin-top: 4px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .keyword-tag {
      background: #e0e7ff;
      color: #4338ca;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
    }

    button {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text-primary);
      font-size: var(--text-sm);
      font-weight: 600;
      padding: var(--space-2) var(--space-3);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    button:active:not(:disabled) {
      transform: scale(0.98);
    }

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: #fff;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
      color: #fff;
    }

    button.secondary {
      background: #fef3c7;
      border-color: #fde68a;
      color: #92400e;
    }

    button.secondary:hover:not(:disabled) {
      background: #fde68a;
      border-color: #f59e0b;
      color: #78350f;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .processing {
      border-radius: var(--radius-md);
      border: 1px solid #fde68a;
      background: #fffbeb;
      color: #92400e;
      padding: var(--space-4);
      font-size: var(--text-sm);
      display: grid;
      gap: var(--space-2);
      text-align: center;
    }

    .processing-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #fde68a;
      border-top-color: #f59e0b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .progress-track {
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: #fef3c7;
      overflow: hidden;
      margin-top: var(--space-2);
    }

    .progress-fill {
      height: 100%;
      background: #f59e0b;
      transition: width var(--transition-base);
    }

    .topics-section {
      display: grid;
      gap: var(--space-3);
    }

    .candidate {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: #fff;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .candidate:hover {
      border-color: var(--color-accent);
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }

    .candidate.active {
      border-color: var(--color-accent);
      background: #f0fdf4;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    .candidate-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-2);
      margin-bottom: var(--space-2);
    }

    .candidate-title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
      flex: 1;
    }

    .candidate-score {
      font-size: 11px;
      background: #d1fae5;
      color: #047857;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 700;
      white-space: nowrap;
    }

    .candidate-summary {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin-bottom: var(--space-2);
    }

    .candidate-detail {
      font-size: 10px;
      color: var(--color-text-tertiary);
      background: var(--color-bg);
      padding: var(--space-2);
      border-radius: var(--radius-sm);
      margin-top: var(--space-2);
    }

    .candidate-detail strong {
      color: var(--color-text-secondary);
    }

    .topic-actions {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
      margin-top: var(--space-3);
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-border-light);
    }

    .feedback-section {
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      margin-top: var(--space-3);
    }

    .feedback-section h4 {
      font-size: var(--text-sm);
      font-weight: 600;
      color: #92400e;
      margin-bottom: var(--space-2);
    }

    .feedback-history {
      display: grid;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }

    .feedback-item {
      background: #fff;
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-xs);
    }

    .feedback-item .round {
      font-weight: 600;
      color: #92400e;
    }

    .feedback-item .text {
      color: var(--color-text-primary);
      margin-top: 2px;
    }

    .feedback-input {
      display: grid;
      gap: var(--space-2);
    }

    .feedback-input textarea {
      width: 100%;
      border: 1px solid #fde68a;
      border-radius: var(--radius-md);
      padding: var(--space-2);
      font-size: var(--text-sm);
      font-family: var(--font-sans);
      resize: vertical;
      min-height: 60px;
    }

    .feedback-input textarea:focus {
      outline: none;
      border-color: #f59e0b;
    }

    .topic-detail {
      display: grid;
      gap: var(--space-3);
    }

    .field {
      display: grid;
      gap: var(--space-1);
    }

    .field label {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    .field input,
    .field textarea {
      width: 100%;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: #fff;
      color: var(--color-text-primary);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      padding: var(--space-2) var(--space-3);
    }

    .field input:focus,
    .field textarea:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    .field textarea {
      min-height: 80px;
      resize: vertical;
    }

    .confirm-section {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      margin-top: var(--space-3);
    }

    .confirm-section h4 {
      font-size: var(--text-sm);
      font-weight: 600;
      color: #065f46;
      margin-bottom: var(--space-2);
    }

    .empty {
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      text-align: center;
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
    }

    .empty-waiting {
      background: var(--color-bg);
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-6);
      text-align: center;
    }

    .empty-waiting .icon {
      font-size: 32px;
      margin-bottom: var(--space-2);
    }

    .api-status {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }

    .api-status.connected {
      background: #d1fae5;
      color: #065f46;
    }

    .api-status.disconnected {
      background: #fee2e2;
      color: #991b1b;
    }

    .api-status.connecting {
      background: #fef3c7;
      color: #92400e;
    }

    @media (max-width: 1280px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .panel {
        min-height: auto;
      }
    }
  `;

  @state() private uploadedPapers: UploadedPaper[] = [];
  @state() private topics: TopicCandidate[] = [];
  @state() private selectedTopicId: number | null = null;
  @state() private selectedTopic: SelectedTopic = {
    title: '',
    researchObjective: '',
    expectedContribution: '',
    selectedCandidateId: null
  };
  @state() private processing = false;
  @state() private processingCurrent = 0;
  @state() private analysisComplete = false;
  @state() private feedbackHistory: TopicFeedback[] = [];
  @state() private currentFeedback = '';
  @state() private dragover = false;
  @state() private apiConnected = false;
  @state() private apiChecking = true;
  @state() private errorMessage = '';

  private pollInterval: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.checkApiConnection();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  private async checkApiConnection() {
    this.apiChecking = true;
    try {
      const response = await fetch(`${API_BASE}/api/health`);
      if (response.ok) {
        this.apiConnected = true;
      } else {
        this.apiConnected = false;
      }
    } catch (e) {
      this.apiConnected = false;
    }
    this.apiChecking = false;
  }

  private notifyReadyState() {
    const ready = !this.processing && 
                  this.analysisComplete && 
                  this.selectedTopic.title.trim().length > 0;
    this.dispatchEvent(new CustomEvent<boolean>('config-ready-change', { detail: !!ready }));
  }

  private onReferenceFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.uploadPapersToBackend(Array.from(input.files));
    input.value = '';
  }

  private onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragover = false;
    const list = event.dataTransfer?.files;
    if (!list || list.length === 0) return;
    this.uploadPapersToBackend(Array.from(list).filter(f => f.name.endsWith('.pdf')));
  }

  private onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragover = true;
  }

  private onDragLeave() {
    this.dragover = false;
  }

  private async uploadPapersToBackend(files: File[]) {
    if (files.length === 0) return;
    
    if (!this.apiConnected) {
      this.errorMessage = '后端服务未连接，无法上传论文';
      return;
    }

    const startId = this.uploadedPapers.length + 1;
    
    // Add papers with uploading status
    const rows: UploadedPaper[] = files.map((file, idx) => ({
      id: startId + idx,
      name: file.name,
      pages: 0,
      status: 'uploaded' as const
    }));

    this.uploadedPapers = [...this.uploadedPapers, ...rows];
    this.errorMessage = '';

    // Upload each file to backend
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const paperId = startId + i;
      
      // Update status to processing
      this.uploadedPapers = this.uploadedPapers.map(p => 
        p.id === paperId ? { ...p, status: 'processing' as const } : p
      );

      try {
        const formData = new FormData();
        formData.append('paper', file);

        const response = await fetch(`${API_BASE}/api/papers/analyze`, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          
          // Update with paper ID from backend
          this.uploadedPapers = this.uploadedPapers.map(p => 
            p.id === paperId ? { 
              ...p, 
              status: 'analyzing' as const,
              paperId: result.paperId
            } : p
          );
        } else {
          this.uploadedPapers = this.uploadedPapers.map(p => 
            p.id === paperId ? { ...p, status: 'error' as const } : p
          );
        }
      } catch (e) {
        console.error('Upload error:', e);
        this.uploadedPapers = this.uploadedPapers.map(p => 
          p.id === paperId ? { ...p, status: 'error' as const } : p
        );
        this.errorMessage = `上传失败: ${(e as Error).message}`;
      }
    }

    // Start polling for results
    this.startPolling();
  }

  private startPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
    
    this.pollInterval = window.setInterval(() => {
      this.checkAnalysisResults();
    }, 3000);
  }

  private async checkAnalysisResults() {
    const analyzingPapers = this.uploadedPapers.filter(p => p.status === 'analyzing' || p.status === 'processing');
    
    if (analyzingPapers.length === 0) {
      if (this.pollInterval) {
        clearInterval(this.pollInterval);
        this.pollInterval = null;
      }
      return;
    }

    for (const paper of analyzingPapers) {
      if (!paper.paperId) continue;

      try {
        const statusResponse = await fetch(`${API_BASE}/api/papers/${paper.paperId}/status`);
        if (statusResponse.ok) {
          const status = await statusResponse.json();
          
          // Update pages info
          if (status.pages) {
            this.uploadedPapers = this.uploadedPapers.map(p => 
              p.paperId === paper.paperId ? { ...p, pages: status.pages } : p
            );
          }

          // If completed, get results
          if (status.status === 'completed' || status.status === 'done') {
            const resultResponse = await fetch(`${API_BASE}/api/papers/${paper.paperId}/result`);
            if (resultResponse.ok) {
              const result = await resultResponse.json();
              
              if (result.result) {
                // Update paper with metadata
                this.uploadedPapers = this.uploadedPapers.map(p => 
                  p.paperId === paper.paperId ? { 
                    ...p, 
                    status: 'done' as const,
                    metadata: result.result.metadata
                  } : p
                );

                // Collect topics from all papers
                if (result.result.topicCandidates && result.result.topicCandidates.length > 0) {
                  this.mergeTopics(result.result.topicCandidates);
                }
              }
            }
          }
        }
      } catch (e) {
        console.error('Polling error:', e);
      }
    }

    // Check if all papers are done
    const allDone = this.uploadedPapers.every(p => p.status === 'done');
    if (allDone && this.uploadedPapers.length > 0) {
      this.analysisComplete = true;
      this.processing = false;
      this.notifyReadyState();
      
      if (this.pollInterval) {
        clearInterval(this.pollInterval);
        this.pollInterval = null;
      }
    }
  }

  private mergeTopics(newTopics: TopicCandidate[]) {
    // Add unique topics to the list
    const existingIds = new Set(this.topics.map(t => t.id));
    const uniqueNewTopics = newTopics.filter(t => !existingIds.has(t.id));
    
    if (uniqueNewTopics.length > 0) {
      // Reindex topics
      const reindexed = uniqueNewTopics.map((t, idx) => ({
        ...t,
        id: this.topics.length + idx + 1
      }));
      this.topics = [...this.topics, ...reindexed];
    }
  }

  private selectTopic(candidate: TopicCandidate) {
    this.selectedTopicId = candidate.id;
    this.selectedTopic = {
      title: candidate.title,
      researchObjective: `针对 ${candidate.title} 的核心问题，建立理论模型并进行数值验证。`,
      expectedContribution: `提出一种可行的研究方案，产出具有创新性的学术成果。`,
      selectedCandidateId: candidate.id
    };
    this.notifyReadyState();
  }

  private async submitFeedback() {
    if (!this.currentFeedback.trim() || !this.selectedTopicId) return;

    const paper = this.uploadedPapers.find(p => p.paperId);
    if (!paper) {
      this.errorMessage = '没有已上传的论文';
      return;
    }

    this.feedbackHistory = [
      ...this.feedbackHistory,
      {
        topicId: this.selectedTopicId!,
        feedback: this.currentFeedback.trim(),
        timestamp: new Date()
      }
    ];

    try {
      const response = await fetch(`${API_BASE}/api/papers/${paper.paperId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedback: this.currentFeedback,
          currentTopics: this.topics
        })
      });

      if (response.ok) {
        // In production, would regenerate topics based on feedback
        // For now, just clear the feedback
        this.currentFeedback = '';
        
        // Show feedback received message
        this.errorMessage = '反馈已提交，AI 将根据反馈重新生成选题';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    } catch (e) {
      console.error('Feedback error:', e);
      this.errorMessage = `反馈提交失败: ${(e as Error).message}`;
    }
  }

  private regenerateTopics() {
    // Would trigger backend regeneration
    this.errorMessage = '选题重新生成中...';
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);
  }

  private updateTopicField(field: keyof SelectedTopic, value: string) {
    this.selectedTopic = { ...this.selectedTopic, [field]: value };
    this.notifyReadyState();
  }

  private confirmTopic() {
    if (!this.selectedTopic.title.trim()) {
      this.errorMessage = '请先选择一个选题或输入论文标题';
      return;
    }
    this.notifyReadyState();
    this.dispatchEvent(new CustomEvent('topic-confirmed', { 
      detail: { 
        topic: this.selectedTopic,
        papers: this.uploadedPapers 
      } 
    }));
  }

  private statusLabel(status: UploadedPaper['status']) {
    const labels: Record<string, string> = {
      'uploaded': '待上传',
      'processing': '上传中',
      'analyzing': 'AI分析中',
      'done': '已完成',
      'error': '失败'
    };
    return labels[status] || status;
  }

  private get progressPercent() {
    const done = this.uploadedPapers.filter(p => p.status === 'done').length;
    return this.uploadedPapers.length > 0 
      ? Math.round((done / this.uploadedPapers.length) * 100) 
      : 0;
  }

  render() {
    const hasPapers = this.uploadedPapers.length > 0;
    const hasTopics = this.topics.length > 0;
    const allAnalyzed = hasPapers && this.uploadedPapers.every(p => p.status === 'done');

    return html`
      <section class="layout">
        <!-- Panel 1: 参考论文上传区 -->
        <article class="panel">
          <h3>
            <span class="step">1</span>参考论文上传
            <span class="api-status ${this.apiChecking ? 'connecting' : this.apiConnected ? 'connected' : 'disconnected'}">
              ${this.apiChecking ? '检测中' : this.apiConnected ? '已连接' : '未连接'}
            </span>
          </h3>
          <p>拖拽或点击上传 PDF 论文，AI 将通过 OpenClaw 分析论文内容</p>
          
          <label
            class="dropzone ${this.dragover ? 'dragover' : ''}"
            @drop=${this.onDrop}
            @dragover=${this.onDragOver}
            @dragleave=${this.onDragLeave}
          >
            <input type="file" multiple accept=".pdf" @change=${this.onReferenceFileInput}>
            <p>📄 拖拽 PDF 到这里</p>
            <p class="subtle">支持多文件上传，可持续追加</p>
          </label>

          ${this.errorMessage ? html`
            <div style="background: #fee2e2; color: #991b1b; padding: var(--space-2); border-radius: var(--radius-md); font-size: var(--text-xs);">
              ${this.errorMessage}
            </div>
          ` : ''}

          <div class="paper-list">
            ${this.uploadedPapers.length === 0
              ? html`<div class="empty">尚未上传参考论文</div>`
              : this.uploadedPapers.map((paper) => html`
                  <div class="paper-item">
                    <div>
                      <div class="paper-name">${paper.name}</div>
                      <div class="paper-meta">${paper.pages > 0 ? `${paper.pages} 页` : '处理中...'}</div>
                      ${paper.metadata ? html`
                        <div class="metadata-preview">
                          <div class="meta-title">${paper.metadata.title}</div>
                          <div class="meta-authors">${paper.metadata.authors}</div>
                          <div class="meta-keywords">
                            ${paper.metadata.keywords.map(k => html`<span class="keyword-tag">${k}</span>`)}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                    <div class="paper-status">
                      <span class="status ${paper.status}">${this.statusLabel(paper.status)}</span>
                    </div>
                  </div>
                `)}
          </div>

          <button 
            ?disabled=${!this.apiConnected} 
            @click=${() => this.shadowRoot?.querySelector<HTMLInputElement>('label.dropzone input')?.click()}
          >
            + 继续添加论文
          </button>
        </article>

        <!-- Panel 2: 自动处理与选题推荐 -->
        <article class="panel">
          <h3><span class="step">2</span>OpenClaw AI 分析与选题推荐</h3>
          
          ${this.processing ? html`
            <div class="processing">
              <div class="processing-spinner"></div>
              <div>正在处理论文，请稍候...</div>
              <div>${this.processingCurrent} / ${this.uploadedPapers.length}</div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${this.progressPercent}%"></div>
              </div>
            </div>
          ` : hasPapers && !allAnalyzed ? html`
            <div class="processing">
              <div class="processing-spinner"></div>
              <div>AI 正在分析论文...</div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${this.progressPercent}%"></div>
              </div>
              <div style="font-size: var(--text-xs); margin-top: var(--space-2);">
                ${this.uploadedPapers.filter(p => p.status === 'done').length} / ${this.uploadedPapers.length} 篇已完成
              </div>
            </div>
            
            ${hasTopics ? html`
              <p>已发现 ${this.topics.length} 个候选选题</p>
              <div class="topics-section">
                ${this.topics.map((topic) => html`
                  <div 
                    class="candidate ${topic.id === this.selectedTopicId ? 'active' : ''}"
                    @click=${() => this.selectTopic(topic)}
                  >
                    <div class="candidate-header">
                      <span class="candidate-title">${topic.title}</span>
                      <span class="candidate-score">${topic.score}%</span>
                    </div>
                    <div class="candidate-summary">${topic.summary}</div>
                  </div>
                `)}
              </div>
            ` : ''}
          ` : hasTopics ? html`
            <p>✅ 分析完成，请从候选选题中选择。</p>
            
            <div class="topics-section">
              <strong>推荐选题（支持多轮反馈）</strong>
              ${this.topics.map((topic) => html`
                <div 
                  class="candidate ${topic.id === this.selectedTopicId ? 'active' : ''}"
                  @click=${() => this.selectTopic(topic)}
                >
                  <div class="candidate-header">
                    <span class="candidate-title">${topic.title}</span>
                    <span class="candidate-score">${topic.score}%</span>
                  </div>
                  <div class="candidate-summary">${topic.summary}</div>
                  <div class="candidate-detail">
                    <div><strong>理论依据：</strong>${topic.rationale}</div>
                    <div><strong>可行性：</strong>${topic.feasibility}</div>
                  </div>
                </div>
              `)}
              
              <div class="topic-actions">
                <button class="primary" ?disabled=${!this.selectedTopicId} @click=${() => {}}>
                  ✓ 确认选题
                </button>
                <button class="secondary" @click=${this.regenerateTopics}>
                  🔄 重新生成
                </button>
              </div>
            </div>
            
            ${this.selectedTopicId ? html`
              <div class="feedback-section">
                <h4>💬 选题反馈（支持多轮）</h4>
                
                ${this.feedbackHistory.length > 0 ? html`
                  <div class="feedback-history">
                    ${this.feedbackHistory.map((fb, idx) => html`
                      <div class="feedback-item">
                        <span class="round">第 ${idx + 1} 轮反馈：</span>
                        <span class="text">${fb.feedback}</span>
                      </div>
                    `)}
                  </div>
                ` : ''}
                
                <div class="feedback-input">
                  <textarea 
                    placeholder="输入对选题的修改意见或要求，OpenClaw AI 将根据反馈重新生成..."
                    .value=${this.currentFeedback}
                    @input=${(e: Event) => this.currentFeedback = (e.target as HTMLTextAreaElement).value}
                  ></textarea>
                  <button @click=${this.submitFeedback} ?disabled=${!this.currentFeedback.trim()}>
                    提交反馈并重新生成
                  </button>
                </div>
              </div>
            ` : ''}
          ` : html`
            <div class="empty-waiting">
              <div class="icon">📚</div>
              <p>${this.apiConnected ? '请上传参考论文' : '等待后端服务连接...'}</p>
              <p class="subtle">OpenClaw AI 将自动分析论文并推荐研究选题</p>
            </div>
          `}
        </article>

        <!-- Panel 3: 选题详情 -->
        <article class="panel">
          <h3><span class="step">3</span>选题详情与确认</h3>
          
          ${this.selectedTopicId === null ? html`
            <div class="empty">
              请先在中间区域选择一个候选选题
            </div>
          ` : html`
            <div class="topic-detail">
              <div class="field">
                <label>论文标题</label>
                <input
                  type="text"
                  placeholder="输入或修改论文标题"
                  .value=${this.selectedTopic.title}
                  @input=${(e: Event) => this.updateTopicField('title', (e.target as HTMLInputElement).value)}
                >
              </div>

              <div class="field">
                <label>研究目标</label>
                <textarea
                  placeholder="描述研究的核心目标..."
                  .value=${this.selectedTopic.researchObjective}
                  @input=${(e: Event) => this.updateTopicField('researchObjective', (e.target as HTMLTextAreaElement).value)}
                ></textarea>
              </div>

              <div class="field">
                <label>预期贡献</label>
                <textarea
                  placeholder="说明研究的创新点和贡献..."
                  .value=${this.selectedTopic.expectedContribution}
                  @input=${(e: Event) => this.updateTopicField('expectedContribution', (e.target as HTMLTextAreaElement).value)}
                ></textarea>
              </div>
            </div>

            <div class="confirm-section">
              <h4>✅ 确认选题进入下一阶段</h4>
              <p style="font-size: var(--text-xs); color: #065f46; margin-bottom: var(--space-3);">
                确认后将进入 Literature 阶段，开始文献检索与证据沉淀。
              </p>
              <button 
                class="primary" 
                style="width: 100%;"
                ?disabled=${!this.selectedTopic.title.trim()}
                @click=${this.confirmTopic}
              >
                确认选题，进入 Literature 阶段 →
              </button>
            </div>
          `}
        </article>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'config-stage': ConfigStage;
  }
}
