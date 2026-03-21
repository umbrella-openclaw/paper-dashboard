import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface UploadedPaper {
  id: number;
  name: string;
  pages: number;
  status: 'uploaded' | 'processing' | 'analyzing' | 'done' | 'error';
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

  private notifyReadyState() {
    const ready = !this.processing && 
                  this.analysisComplete && 
                  this.selectedTopic.title.trim().length > 0;
    this.dispatchEvent(new CustomEvent<boolean>('config-ready-change', { detail: !!ready }));
  }

  private onReferenceFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.addReferenceFiles(Array.from(input.files));
    input.value = '';
  }

  private onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragover = false;
    const list = event.dataTransfer?.files;
    if (!list || list.length === 0) return;
    this.addReferenceFiles(Array.from(list).filter(f => f.name.endsWith('.pdf')));
  }

  private onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragover = true;
  }

  private onDragLeave() {
    this.dragover = false;
  }

  private addReferenceFiles(files: File[]) {
    if (files.length === 0) return;
    
    const startId = this.uploadedPapers.length + 1;
    const rows: UploadedPaper[] = files.map((file, idx) => ({
      id: startId + idx,
      name: file.name,
      pages: Math.floor(Math.random() * 20) + 5,
      status: 'uploaded' as const
    }));

    this.uploadedPapers = [...this.uploadedPapers, ...rows];
    this.startProcessing();
  }

  private startProcessing() {
    if (this.uploadedPapers.length === 0 || this.processing) return;

    this.processing = true;
    this.processingCurrent = 0;
    this.analysisComplete = false;
    this.topics = [];
    this.selectedTopicId = null;
    this.selectedTopic = { title: '', researchObjective: '', expectedContribution: '', selectedCandidateId: null };
    this.notifyReadyState();

    const total = this.uploadedPapers.length;
    let current = 0;

    const tick = () => {
      current += 1;
      this.processingCurrent = current;

      // Update paper statuses
      this.uploadedPapers = this.uploadedPapers.map((item, idx) => {
        if (idx + 1 < current) {
          return { ...item, status: 'done' as const };
        }
        if (idx + 1 === current) {
          return { ...item, status: current <= total * 0.6 ? 'processing' as const : 'analyzing' as const };
        }
        return { ...item, status: 'uploaded' as const };
      });

      if (current >= total) {
        // All papers processed - now analyze and generate topics
        this.uploadedPapers = this.uploadedPapers.map((item) => ({
          ...item, 
          status: 'done' as const,
          metadata: {
            title: item.name.replace(/\.pdf$/i, ''),
            authors: '待提取',
            abstract: '正在通过 AI 分析论文内容...',
            keywords: [],
            contentSummary: 'AI 正在深度阅读和分析论文...'
          }
        }));
        
        this.processing = false;
        this.analysisComplete = true;
        this.topics = this.generateRealisticTopics();
        this.requestUpdate();
        this.notifyReadyState();
        return;
      }

      window.setTimeout(tick, 800);
    };

    window.setTimeout(tick, 500);
  }

  private generateRealisticTopics(): TopicCandidate[] {
    const papers = this.uploadedPapers.map(p => p.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' '));
    
    // Generate topics based on paper names - this is a simulation
    // In production, this would call AI to analyze the actual PDF content
    const baseTopic = papers[0] || '基于输入文献的研究';
    
    return [
      {
        id: 1,
        title: `${baseTopic} 方法的改进与优化研究`,
        score: 92,
        summary: '基于现有方法提出改进方案，在保持原有优势的基础上提升性能或效率。',
        rationale: '通过分析现有文献的方法论，发现可行的改进空间和优化方向。',
        feasibility: '高 - 改进方案明确，可通过数值实验验证。'
      },
      {
        id: 2,
        title: `${baseTopic} 在新场景/条件下的应用探索`,
        score: 85,
        summary: '将现有方法应用于新的物理场景或边界条件，拓展其适用范围。',
        rationale: '现有方法在特定条件下表现良好，有潜力应用于相关新场景。',
        feasibility: '中 - 需要针对新场景进行适应性调整和验证。'
      },
      {
        id: 3,
        title: `${baseTopic} 与其他方法的对比与融合研究`,
        score: 78,
        summary: '系统对比现有方法与其他主流方法，分析各自优缺点，探索融合可能性。',
        rationale: '通过对比研究揭示不同方法的适用边界，为方法选择提供依据。',
        feasibility: '中 - 需要全面的对比分析和实验验证。'
      },
      {
        id: 4,
        title: `面向${baseTopic}的高效计算方法研究`,
        score: 88,
        summary: '针对现有方法的计算瓶颈，开发更高效的数值算法或近似方法。',
        rationale: '计算效率是实际应用的关键因素，提升效率具有重要实用价值。',
        feasibility: '高 - 优化目标明确，可通过算法改进实现。'
      }
    ];
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

  private submitFeedback() {
    if (!this.currentFeedback.trim() || !this.selectedTopicId) return;

    this.feedbackHistory = [
      ...this.feedbackHistory,
      {
        topicId: this.selectedTopicId,
        feedback: this.currentFeedback.trim(),
        timestamp: new Date()
    // Regenerate topics based on feedback
    }
    ];

    const regenerated = this.topics.map((topic, idx) => ({
      ...topic,
      id: topic.id + 10,
      score: Math.min(98, topic.score + Math.floor(Math.random() * 5)),
      title: `${topic.title}（根据反馈优化）`
    }));

    this.topics = regenerated;
    this.selectedTopicId = null;
    this.currentFeedback = '';
    this.notifyReadyState();
  }

  private regenerateTopics() {
    if (this.processing || this.uploadedPapers.length === 0) return;
    
    const newTopics = this.generateRealisticTopics().map((topic, idx) => ({
      ...topic,
      id: idx + 100,
      score: Math.min(95, topic.score - idx * 3)
    }));
    
    this.topics = newTopics;
    this.selectedTopicId = null;
    this.selectedTopic = { title: '', researchObjective: '', expectedContribution: '', selectedCandidateId: null };
    this.notifyReadyState();
  }

  private updateTopicField(field: keyof SelectedTopic, value: string) {
    this.selectedTopic = { ...this.selectedTopic, [field]: value };
    this.notifyReadyState();
  }

  private confirmTopic() {
    if (!this.selectedTopic.title.trim()) {
      alert('请先选择一个选题或输入论文标题');
      return;
    }
    this.notifyReadyState();
    // Emit confirmed event
    this.dispatchEvent(new CustomEvent('topic-confirmed', { 
      detail: { 
        topic: this.selectedTopic,
        papers: this.uploadedPapers 
      } 
    }));
  }

  private statusLabel(status: UploadedPaper['status']) {
    const labels: Record<string, string> = {
      'uploaded': '待处理',
      'processing': '解析中',
      'analyzing': 'AI分析中',
      'done': '已完成',
      'error': '失败'
    };
    return labels[status] || status;
  }

  private get progressPercent() {
    if (this.uploadedPapers.length === 0) return 0;
    return Math.min(100, Math.round((this.processingCurrent / this.uploadedPapers.length) * 100));
  }

  render() {
    const hasPapers = this.uploadedPapers.length > 0;
    const hasTopics = this.topics.length > 0;

    return html`
      <section class="layout">
        <!-- Panel 1: 参考论文上传区 -->
        <article class="panel">
          <h3><span class="step">1</span>参考论文上传</h3>
          <p>拖拽或点击上传 PDF 论文，AI 将自动分析论文内容</p>
          
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

          <div class="paper-list">
            ${this.uploadedPapers.length === 0
              ? html`<div class="empty">尚未上传参考论文</div>`
              : this.uploadedPapers.map((paper) => html`
                  <div class="paper-item">
                    <div>
                      <div class="paper-name">${paper.name}</div>
                      <div class="paper-meta">${paper.pages} 页</div>
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
            ?disabled=${this.processing} 
            @click=${() => this.shadowRoot?.querySelector<HTMLInputElement>('label.dropzone input')?.click()}
          >
            + 继续添加论文
          </button>
        </article>

        <!-- Panel 2: 自动处理与选题推荐 -->
        <article class="panel">
          <h3><span class="step">2</span>AI 分析与选题推荐</h3>
          
          ${this.processing ? html`
            <div class="processing">
              <div class="processing-spinner"></div>
              <div>正在处理论文，请稍候...</div>
              <div>${this.processingCurrent} / ${this.uploadedPapers.length}</div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${this.progressPercent}%"></div>
              </div>
            </div>
          ` : hasPapers ? html`
            <p>✅ 分析完成，请从右侧候选选题中选择或修改。</p>
            
            ${hasTopics ? html`
              <div class="topics-section">
                <strong>推荐选题（可多轮反馈）</strong>
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
              
              <!-- Feedback Section -->
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
                      placeholder="输入对选题的修改意见或要求，AI 将根据反馈重新生成..."
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
                <div class="icon">⏳</div>
                <p>等待 AI 分析完成...</p>
              </div>
            `}
          ` : html`
            <div class="empty-waiting">
              <div class="icon">📚</div>
              <p>请上传参考论文</p>
              <p class="subtle">AI 将自动分析论文并推荐研究选题</p>
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
