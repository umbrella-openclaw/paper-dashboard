import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface UploadedPaper {
  id: number;
  name: string;
  pages: number;
  status: 'uploaded' | 'processing' | 'done';
}

interface ExtractedMetadata {
  title: string;
  authors: string;
  abstract: string;
  keywords: string[];
}

interface TopicCandidate {
  id: number;
  title: string;
  score: number;
  summary: string;
}

interface SelectedTopic {
  title: string;
  objective: string;
  contribution: string;
}

@customElement('config-stage')
export class ConfigStage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1.05fr 1.2fr 1fr;
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
      min-height: 480px;
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
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
      transition: border-color var(--transition-base), background var(--transition-base), transform var(--transition-base);
      cursor: pointer;
    }

    .dropzone:hover {
      border-color: var(--color-accent);
      background: #f0fdf4;
      transform: translateY(-1px);
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
      max-height: 270px;
      overflow: auto;
      border-top: 1px solid var(--color-border-light);
      padding-top: var(--space-3);
    }

    .paper-item {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--space-2);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
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
    }

    .status {
      font-size: 10px;
      border-radius: 999px;
      font-weight: 700;
      height: fit-content;
      padding: 3px 8px;
      text-align: center;
      border: 1px solid transparent;
    }

    .status.uploaded {
      background: #f4f4f5;
      color: #52525b;
      border-color: #e4e4e7;
    }

    .status.processing {
      background: #fffbeb;
      color: #92400e;
      border-color: #fde68a;
    }

    .status.done {
      background: #ecfdf5;
      color: #065f46;
      border-color: #a7f3d0;
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
      transition: transform var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
    }

    button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    button:active:not(:disabled) {
      transform: scale(0.98);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
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

    .processing {
      border-radius: var(--radius-md);
      border: 1px solid #fde68a;
      background: #fffbeb;
      color: #92400e;
      padding: var(--space-3);
      font-size: var(--text-sm);
      display: grid;
      gap: var(--space-2);
    }

    .progress-track {
      width: 100%;
      height: 8px;
      border-radius: 999px;
      background: #fef3c7;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #f59e0b;
      transition: width var(--transition-base);
      width: var(--progress, 0%);
    }

    .metadata,
    .topics,
    .topic-detail,
    .format-upload {
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      background: var(--color-bg);
      display: grid;
      gap: var(--space-2);
    }

    .meta-item {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    .meta-item strong {
      color: var(--color-text-primary);
      margin-right: 6px;
    }

    .candidate {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-2);
      background: #fff;
      cursor: pointer;
      transition: border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
    }

    .candidate:hover {
      border-color: var(--color-accent);
      transform: translateY(-1px);
    }

    .candidate.active {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 1px var(--color-accent-light) inset;
      background: #f0fdf4;
    }

    .candidate-title {
      display: flex;
      justify-content: space-between;
      gap: var(--space-2);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .candidate-summary {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      line-height: 1.45;
    }

    .candidate-score {
      font-size: 11px;
      color: #047857;
      background: #d1fae5;
      border-radius: 999px;
      padding: 2px 7px;
      font-weight: 700;
      height: fit-content;
      white-space: nowrap;
    }

    .topic-actions {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
    }

    .field {
      display: grid;
      gap: var(--space-1);
    }

    label {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    input,
    textarea {
      width: 100%;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: #fff;
      color: var(--color-text-primary);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      padding: var(--space-2) var(--space-3);
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    textarea {
      min-height: 80px;
      resize: vertical;
    }

    .empty {
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      text-align: center;
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
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
  @state() private metadata: ExtractedMetadata[] = [];
  @state() private topics: TopicCandidate[] = [];
  @state() private selectedTopicId: number | null = null;
  @state() private selectedTopic: SelectedTopic = {
    title: '',
    objective: '',
    contribution: '',
  };
  @state() private formatRequirementFile: File | null = null;
  @state() private processing = false;
  @state() private processingCurrent = 0;

  private toCandidateLabel(name: string): string {
    return name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim();
  }

  private notifyReadyState() {
    const ready = !this.processing && this.selectedTopic.title.trim().length > 0;
    this.dispatchEvent(new CustomEvent<boolean>('config-ready-change', { detail: ready }));
  }

  private onReferenceFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    this.addReferenceFiles(Array.from(input.files));
    input.value = '';
  }

  private onFormatFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    this.formatRequirementFile = input.files[0];
  }

  private onDrop(event: DragEvent) {
    event.preventDefault();
    const list = event.dataTransfer?.files;
    if (!list || list.length === 0) {
      return;
    }
    this.addReferenceFiles(Array.from(list));
  }

  private onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private addReferenceFiles(files: File[]) {
    const startId = this.uploadedPapers.length + 1;
    const rows = files.map((file, idx) => ({
      id: startId + idx,
      name: file.name,
      pages: 6 + ((file.size + idx) % 25),
      status: 'uploaded' as const,
    }));

    this.uploadedPapers = [...this.uploadedPapers, ...rows];
    this.startProcessing();
  }

  private startProcessing() {
    if (this.uploadedPapers.length === 0 || this.processing) {
      return;
    }

    this.processing = true;
    this.processingCurrent = 0;
    this.metadata = [];
    this.topics = [];
    this.selectedTopicId = null;
    this.selectedTopic = { title: '', objective: '', contribution: '' };
    this.notifyReadyState();

    const total = this.uploadedPapers.length;
    let current = 0;

    const tick = () => {
      current += 1;
      this.processingCurrent = current;

      this.uploadedPapers = this.uploadedPapers.map((item, idx) => {
        if (idx + 1 < current) {
          return { ...item, status: 'done' };
        }
        if (idx + 1 === current) {
          return { ...item, status: 'processing' };
        }
        return { ...item, status: 'uploaded' };
      });

      if (current >= total) {
        this.uploadedPapers = this.uploadedPapers.map((item) => ({ ...item, status: 'done' }));
        this.processing = false;
        this.metadata = this.generateMetadata();
        this.topics = this.generateTopics();
        this.processingCurrent = total;
        this.requestUpdate();
        this.notifyReadyState();
        return;
      }

      window.setTimeout(tick, 650);
    };

    window.setTimeout(tick, 500);
  }

  private generateMetadata(): ExtractedMetadata[] {
    return this.uploadedPapers.slice(0, 3).map((file, idx) => {
      const topic = this.toCandidateLabel(file.name) || `Reference Paper ${idx + 1}`;
      const seed = topic.split(/\s+/).slice(0, 2).join(' ');
      return {
        title: `${seed} for Knowledge-Grounded Writing`,
        authors: `Author ${idx + 1}A, Author ${idx + 1}B`,
        abstract: `This paper studies ${seed.toLowerCase()} and reports reproducible findings for academic writing workflows.`,
        keywords: [seed, 'workflow', 'benchmark', 'writing'],
      };
    });
  }

  private generateTopics(): TopicCandidate[] {
    const base = this.uploadedPapers.slice(0, 5);
    const fallback = [
      '面向论文写作的阶段化知识组织模型',
      '融合参考文献语义的研究选题推荐方法',
      '写作工作流中的方法-结果一致性评估',
      '从文献到终稿的可追溯研究流程设计',
      '学术写作系统中的结构化协同机制',
    ];

    return Array.from({ length: 5 }).map((_, idx) => {
      const fileTitle = base[idx] ? this.toCandidateLabel(base[idx].name) : '';
      const title = fileTitle
        ? `${fileTitle} 驱动的研究问题建模`
        : fallback[idx];
      return {
        id: idx + 1,
        title,
        score: 86 - idx * 4,
        summary: `结合已上传文献中的共同方法与结论结构，形成可执行的问题定义、评估路径和贡献边界。`,
      };
    });
  }

  private selectTopic(candidate: TopicCandidate) {
    this.selectedTopicId = candidate.id;
    this.selectedTopic = {
      title: candidate.title,
      objective: '构建可复用的论文写作流程，降低阶段切换成本并提升写作一致性。',
      contribution: '提出一个可推进/可回滚的写作阶段框架，并验证其在选题与草稿构建中的有效性。',
    };
    this.notifyReadyState();
  }

  private regenerateTopics() {
    if (this.processing || this.uploadedPapers.length === 0) {
      return;
    }
    const regenerated = this.generateTopics().map((topic, idx) => ({
      ...topic,
      id: idx + 1,
      score: 84 - idx * 3,
      title: `${topic.title}（候选 ${idx + 1}）`,
    }));
    this.topics = regenerated;
    this.selectedTopicId = null;
    this.selectedTopic = { title: '', objective: '', contribution: '' };
    this.notifyReadyState();
  }

  private updateTopicField(field: keyof SelectedTopic, value: string) {
    this.selectedTopic = { ...this.selectedTopic, [field]: value };
    this.notifyReadyState();
  }

  private statusLabel(status: UploadedPaper['status']) {
    if (status === 'processing') return '处理中';
    if (status === 'done') return '已完成';
    return '待处理';
  }

  private get progressPercent() {
    if (this.uploadedPapers.length === 0) {
      return 0;
    }
    return Math.min(100, Math.round((this.processingCurrent / this.uploadedPapers.length) * 100));
  }

  render() {
    const hasData = this.uploadedPapers.length > 0;

    return html`
      <section class="layout">
        <article class="panel">
          <h3>参考论文上传区</h3>
          <label
            class="dropzone"
            @drop=${this.onDrop}
            @dragover=${this.onDragOver}
          >
            <input type="file" multiple accept=".pdf" @change=${this.onReferenceFileInput}>
            <p>拖拽 PDF 到这里，或点击选择多个文件</p>
            <p class="subtle">支持多文件上传，可持续追加参考论文</p>
          </label>

          <div class="paper-list">
            ${this.uploadedPapers.length === 0
              ? html`<div class="empty">尚未上传参考论文</div>`
              : this.uploadedPapers.map((file) => html`
                  <div class="paper-item">
                    <div>
                      <div class="paper-name">${file.name}</div>
                      <div class="paper-meta">页数：${file.pages} 页</div>
                    </div>
                    <span class="status ${file.status}">${this.statusLabel(file.status)}</span>
                  </div>
                `)}
          </div>

          <button ?disabled=${this.processing} @click=${() => this.shadowRoot?.querySelector<HTMLInputElement>('label.dropzone input')?.click()}>
            继续添加更多参考论文
          </button>
        </article>

        <article class="panel">
          <h3>自动处理状态区（阻塞式）</h3>

          ${this.processing
            ? html`
                <div class="processing">
                  <div>正在分析论文，请稍候...</div>
                  <div>处理进度：${this.processingCurrent}/${this.uploadedPapers.length}</div>
                  <div class="progress-track">
                    <div class="progress-fill" style=${`--progress:${this.progressPercent}%`}></div>
                  </div>
                </div>
              `
            : hasData
              ? html`<p>处理完成：已提取元数据与候选选题。</p>`
              : html`<p>上传参考论文后将自动开始分析。</p>`}

          ${!this.processing && this.metadata.length > 0
            ? html`
                <div class="metadata">
                  <strong>提取的元数据与内容摘要</strong>
                  ${this.metadata.map((meta) => html`
                    <div class="meta-item"><strong>标题：</strong>${meta.title}</div>
                    <div class="meta-item"><strong>作者：</strong>${meta.authors}</div>
                    <div class="meta-item"><strong>摘要：</strong>${meta.abstract}</div>
                    <div class="meta-item"><strong>关键词：</strong>${meta.keywords.join(' / ')}</div>
                  `)}
                </div>

                <div class="topics">
                  <strong>推荐选题（可确认/修改/重新生成）</strong>
                  ${this.topics.map((topic) => html`
                    <div
                      class="candidate ${topic.id === this.selectedTopicId ? 'active' : ''}"
                      @click=${() => this.selectTopic(topic)}
                    >
                      <div class="candidate-title">
                        <span>${topic.title}</span>
                        <span class="candidate-score">相关度 ${topic.score}%</span>
                      </div>
                      <div class="candidate-summary">${topic.summary}</div>
                    </div>
                  `)}
                  <div class="topic-actions">
                    <button class="primary" ?disabled=${this.selectedTopicId === null}>
                      确认选题
                    </button>
                    <button ?disabled=${this.selectedTopicId === null}>修改选题</button>
                    <button @click=${this.regenerateTopics}>重新生成</button>
                  </div>
                </div>
              `
            : ''}
        </article>

        <article class="panel">
          <h3>选题详情区</h3>

          ${this.selectedTopicId === null
            ? html`<div class="empty">请先在中间区域选择一个候选选题。</div>`
            : html`
                <div class="topic-detail">
                  <div class="field">
                    <label>论文标题（可编辑）</label>
                    <input
                      .value=${this.selectedTopic.title}
                      @input=${(e: Event) => this.updateTopicField('title', (e.target as HTMLInputElement).value)}
                    >
                  </div>

                  <div class="field">
                    <label>研究目标</label>
                    <textarea
                      .value=${this.selectedTopic.objective}
                      @input=${(e: Event) => this.updateTopicField('objective', (e.target as HTMLTextAreaElement).value)}
                    ></textarea>
                  </div>

                  <div class="field">
                    <label>预期贡献</label>
                    <textarea
                      .value=${this.selectedTopic.contribution}
                      @input=${(e: Event) => this.updateTopicField('contribution', (e.target as HTMLTextAreaElement).value)}
                    ></textarea>
                  </div>
                </div>
              `}

          <div class="format-upload">
            <strong>格式要求上传（目标期刊模板）</strong>
            <label class="dropzone">
              <input type="file" @change=${this.onFormatFileInput}>
              <p>${this.formatRequirementFile ? `已选择：${this.formatRequirementFile.name}` : '上传期刊格式要求文件（可选）'}</p>
            </label>
          </div>
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
