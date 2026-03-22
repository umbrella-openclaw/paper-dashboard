/**
 * Finalize Stage - 投稿封装
 * 
 * Orchestrator 负责
 */

import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const API_BASE = 'http://192.168.1.161:8080';
const API_KEY = '3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a';

function apiHeaders() {
  return {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json'
  };
}

interface JournalInfo {
  name: string;
  abbreviation: string;
  impactFactor: number;
  acceptanceRate: string;
  reviewTime: string;
  notes: string;
}

interface FinalizeData {
  targetJournal: JournalInfo;
  manuscriptInfo: {
    title: string;
    abstract: string;
    keywords: string[];
    authors: string[];
    correspondingAuthor: number;
  };
  files: {
    manuscript: string;
    supplementary: string[];
    coverLetter: string;
  };
  checklist: {
    item: string;
    checked: boolean;
  }[];
  status: 'preparing' | 'ready' | 'submitted';
  submissionDate: string | null;
}

@customElement('finalize-stage')
export class FinalizeStage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      align-items: start;
    }

    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
    }

    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
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

    .journal-card {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      background: var(--color-bg);
      margin-bottom: var(--space-4);
    }

    .journal-name {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-1);
    }

    .journal-abbr {
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-3);
    }

    .journal-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-3);
    }

    .stat-item {
      text-align: center;
      padding: var(--space-2);
      background: var(--color-surface);
      border-radius: var(--radius-md);
    }

    .stat-value {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--color-accent);
    }

    .stat-label {
      font-size: 10px;
      color: var(--color-text-tertiary);
    }

    .info-section {
      margin-bottom: var(--space-4);
    }

    .info-section h4 {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
    }

    .info-section p {
      font-size: var(--text-sm);
      color: var(--color-text-primary);
      line-height: 1.6;
    }

    .keywords {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .keyword-tag {
      background: var(--color-accent-light);
      color: var(--color-accent);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: var(--text-xs);
      font-weight: 600;
    }

    .files-list {
      display: grid;
      gap: var(--space-2);
    }

    .file-item {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-bg);
    }

    .file-icon {
      font-size: var(--text-xl);
    }

    .file-info {
      flex: 1;
    }

    .file-name {
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .file-status {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }

    .checklist {
      display: grid;
      gap: var(--space-2);
    }

    .checklist-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      cursor: pointer;
    }

    .checklist-item:hover {
      background: var(--color-bg);
    }

    .checklist-item.checked {
      background: #ecfdf5;
      color: #047857;
    }

    .checklist-item.unchecked {
      background: #fef2f2;
      color: #b91c1c;
    }

    .checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .checkbox.checked {
      background: #10b981;
      border-color: #10b981;
      color: white;
    }

    .actions {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-4);
    }

    button {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text-primary);
      font-size: var(--text-sm);
      font-weight: 600;
      padding: var(--space-2) var(--space-4);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .ready-banner {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 2px solid #10b981;
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      text-align: center;
      margin-bottom: var(--space-4);
    }

    .ready-icon {
      font-size: 48px;
      margin-bottom: var(--space-2);
    }

    .ready-title {
      font-size: var(--text-xl);
      font-weight: 700;
      color: #047857;
      margin-bottom: var(--space-1);
    }

    .ready-desc {
      font-size: var(--text-sm);
      color: #065f46;
    }

    .status-message {
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      margin-bottom: var(--space-4);
    }

    .status-message.info {
      background: #eff6ff;
      border: 1px solid #3b82f6;
      color: #1e40af;
    }

    .status-message.success {
      background: #ecfdf5;
      border: 1px solid #10b981;
      color: #047857;
    }
  `;

  @state() private finalizeData: FinalizeData | null = null;
  @state() private taskId: string | null = null;
  @state() private loading = false;
  @state() private statusMessage: { type: 'info' | 'success'; text: string } | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadFinalizeData();
  }

  private async loadFinalizeData() {
    const saved = localStorage.getItem('paper-dashboard-task');
    if (saved) {
      const taskData = JSON.parse(saved);
      this.taskId = taskData.task_id;
      await this.fetchFinalizeData();
    }
  }

  private async fetchFinalizeData() {
    if (!this.taskId) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/finalize`, {
        headers: apiHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        this.finalizeData = data.finalize;
      }
    } catch (e) {
      console.error('Failed to fetch finalize data:', e);
    }
  }

  private async generatePackage() {
    if (!this.taskId) return;
    
    this.loading = true;
    this.statusMessage = { type: 'info', text: '正在生成投稿文件包...' };

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/finalize/generate`, {
        method: 'POST',
        headers: apiHeaders()
      });
      
      if (res.ok) {
        const data = await res.json();
        this.finalizeData = data.finalize;
        this.statusMessage = { type: 'success', text: '投稿文件包生成完成！' };
      }
    } catch (e) {
      console.error('Failed to generate package:', e);
    } finally {
      this.loading = false;
    }
  }

  private toggleChecklist(index: number) {
    if (!this.finalizeData) return;
    
    this.finalizeData.checklist[index].checked = !this.finalizeData.checklist[index].checked;
    this.finalizeData = { ...this.finalizeData };
  }

  private markAsSubmitted() {
    if (!this.finalizeData) return;
    
    this.finalizeData.status = 'submitted';
    this.finalizeData.submissionDate = new Date().toISOString();
    this.finalizeData = { ...this.finalizeData };
    
    this.dispatchEvent(new CustomEvent('submission-complete', {
      detail: { data: this.finalizeData }
    }));
  }

  private renderDefaultData(): FinalizeData {
    return {
      targetJournal: {
        name: 'Physics of Fluids',
        abbreviation: 'PoF',
        impactFactor: 4.9,
        acceptanceRate: '25%',
        reviewTime: '3-4 months',
        notes: '主要发表流体力学领域的理论和数值研究'
      },
      manuscriptInfo: {
        title: '基于分块三对角矩阵求解的纤维动力学系统高效算法研究',
        abstract: '本文针对纤维动力学系统中大规模稀疏线性系统的求解问题，提出了一种基于分块三对角矩阵的高效求解算法...',
        keywords: ['Fiber Dynamics', 'Block Tridiagonal', 'CUDA', 'GPU Acceleration', 'Sparse Linear System'],
        authors: ['张三', '李四', '王五'],
        correspondingAuthor: 0
      },
      files: {
        manuscript: 'manuscript.pdf',
        supplementary: ['supplementary_data.pdf', 'source_code.zip'],
        coverLetter: 'cover_letter.pdf'
      },
      checklist: [
        { item: 'Manuscript formatted according to journal guidelines', checked: true },
        { item: 'All figures and tables are high resolution', checked: true },
        { item: 'References formatted in journal style', checked: false },
        { item: 'Cover letter prepared', checked: true },
        { item: 'Suggested reviewers list prepared', checked: false },
        { item: 'Conflict of interest statement included', checked: true },
        { item: 'All authors have approved the submission', checked: true }
      ],
      status: 'preparing',
      submissionDate: null
    };
  }

  render() {
    const data = this.finalizeData || this.renderDefaultData();
    const allChecked = data.checklist.every(c => c.checked);

    return html`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 目标期刊与稿件信息</h3>
          
          ${this.statusMessage ? html`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          ` : ''}

          <div class="journal-card">
            <div class="journal-name">${data.targetJournal.name}</div>
            <div class="journal-abbr">${data.targetJournal.abbreviation}</div>
            <div class="journal-stats">
              <div class="stat-item">
                <div class="stat-value">${data.targetJournal.impactFactor}</div>
                <div class="stat-label">IF</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${data.targetJournal.acceptanceRate}</div>
                <div class="stat-label">接收率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${data.targetJournal.reviewTime}</div>
                <div class="stat-label">审稿周期</div>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h4>稿件标题</h4>
            <p>${data.manuscriptInfo.title}</p>
          </div>

          <div class="info-section">
            <h4>关键词</h4>
            <div class="keywords">
              ${data.manuscriptInfo.keywords.map(k => html`
                <span class="keyword-tag">${k}</span>
              `)}
            </div>
          </div>

          <div class="info-section">
            <h4>作者列表</h4>
            <p>${data.manuscriptInfo.authors.map((a, i) => html`
              ${a}${i === data.manuscriptInfo.correspondingAuthor ? ' ✉️' : ''}
            `)}</p>
          </div>
        </div>

        <div class="panel">
          <h3><span class="step">2</span> 投稿文件与检查清单</h3>
          
          <div class="files-list">
            <div class="file-item">
              <span class="file-icon">📄</span>
              <div class="file-info">
                <div class="file-name">${data.files.manuscript}</div>
                <div class="file-status">主稿件</div>
              </div>
              <span style="color: #10b981;">✅</span>
            </div>
            ${data.files.coverLetter ? html`
              <div class="file-item">
                <span class="file-icon">📧</span>
                <div class="file-info">
                  <div class="file-name">${data.files.coverLetter}</div>
                  <div class="file-status">Cover Letter</div>
                </div>
                <span style="color: #10b981;">✅</span>
              </div>
            ` : ''}
            ${data.files.supplementary.map(f => html`
              <div class="file-item">
                <span class="file-icon">📎</span>
                <div class="file-info">
                  <div class="file-name">${f}</div>
                  <div class="file-status">补充材料</div>
                </div>
                <span style="color: #10b981;">✅</span>
              </div>
            `)}
          </div>

          <div class="checklist">
            ${data.checklist.map((c, i) => html`
              <div 
                class="checklist-item ${c.checked ? 'checked' : 'unchecked'}"
                @click=${() => this.toggleChecklist(i)}
              >
                <div class="checkbox ${c.checked ? 'checked' : ''}">
                  ${c.checked ? '✓' : ''}
                </div>
                <span>${c.item}</span>
              </div>
            `)}
          </div>

          ${allChecked ? html`
            <div class="ready-banner">
              <div class="ready-icon">🎉</div>
              <div class="ready-title">准备就绪！</div>
              <div class="ready-desc">所有检查项已完成，可以提交</div>
            </div>
          ` : ''}

          <div class="actions">
            <button @click=${this.generatePackage} ?disabled=${this.loading}>
              ${this.loading ? '生成中...' : '📦 生成投稿包'}
            </button>
            <button @click=${this.markAsSubmitted} class="primary" ?disabled=${!allChecked}>
              ✅ 标记为已提交
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'finalize-stage': FinalizeStage;
  }
}
