/**
 * Drafting Stage - 章节草稿撰写
 * 
 * Agent C (PoF执笔人) 负责
 */

import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const API_BASE = 'http://localhost:8080';
const API_KEY = '3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a';

function apiHeaders() {
  return {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json'
  };
}

interface DraftSection {
  id: number;
  chapterId: number;
  title: string;
  content: string;
  wordCount: number;
  status: 'pending' | 'drafting' | 'completed' | 'reviewing';
  lastModified: string;
}

interface DraftingProgress {
  sections: DraftSection[];
  totalWords: number;
  completedSections: number;
  currentSection: number;
}

@customElement('drafting-stage')
export class DraftingStage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: var(--space-4);
      align-items: start;
    }

    .sidebar {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: var(--space-4);
    }

    .sidebar h3 {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-3);
    }

    .progress-bar {
      height: 8px;
      background: var(--color-border);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: var(--space-2);
    }

    .progress-fill {
      height: 100%;
      background: var(--color-accent);
      transition: width 0.3s ease;
    }

    .progress-stats {
      display: flex;
      justify-content: space-between;
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-4);
    }

    .section-list {
      display: grid;
      gap: var(--space-2);
    }

    .section-item {
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
      font-size: var(--text-sm);
    }

    .section-item:hover {
      border-color: var(--color-accent);
      background: var(--color-bg);
    }

    .section-item.active {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
    }

    .section-item.completed {
      border-color: #34d399;
      background: #ecfdf5;
    }

    .section-item.drafting {
      border-color: #f59e0b;
      background: #fffbeb;
    }

    .section-status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--space-1);
    }

    .status-badge {
      font-size: 10px;
      padding: 1px 6px;
      border-radius: 999px;
    }

    .status-badge.pending {
      background: var(--color-border-light);
      color: var(--color-text-tertiary);
    }

    .status-badge.drafting {
      background: #fef3c7;
      color: #b45309;
    }

    .status-badge.completed {
      background: #d1fae5;
      color: #047857;
    }

    .word-count-small {
      font-size: 10px;
      color: var(--color-text-tertiary);
    }

    .editor-panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
    }

    .editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-border-light);
    }

    .editor-title {
      font-weight: 700;
      font-size: var(--text-lg);
      color: var(--color-text-primary);
    }

    .editor-actions {
      display: flex;
      gap: var(--space-2);
    }

    .editor-body {
      min-height: 400px;
    }

    .editor-body textarea {
      width: 100%;
      min-height: 400px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      font-size: var(--text-sm);
      font-family: 'Georgia', serif;
      line-height: 1.8;
      background: var(--color-bg);
      color: var(--color-text-primary);
      resize: vertical;
    }

    .editor-body textarea:focus {
      outline: none;
      border-color: var(--color-accent);
    }

    .editor-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--space-3);
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-border-light);
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
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

    .generating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-8);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-accent);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
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

  @state() private draftingProgress: DraftingProgress | null = null;
  @state() private taskId: string | null = null;
  @state() private selectedSection: number = 0;
  @state() private loading = false;
  @state() private statusMessage: { type: 'info' | 'success'; text: string } | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadDraftingProgress();
  }

  private async loadDraftingProgress() {
    const saved = localStorage.getItem('paper-dashboard-task');
    if (saved) {
      const taskData = JSON.parse(saved);
      this.taskId = taskData.task_id;
      await this.fetchDraftingProgress();
    }
  }

  private async fetchDraftingProgress() {
    if (!this.taskId) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/drafting`, {
        headers: apiHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        this.draftingProgress = data.drafting;
      }
    } catch (e) {
      console.error('Failed to fetch drafting progress:', e);
    }
  }

  private async startDrafting() {
    if (!this.taskId) return;
    
    this.loading = true;
    this.statusMessage = { type: 'info', text: '正在生成章节草稿...' };

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/drafting/generate`, {
        method: 'POST',
        headers: apiHeaders()
      });
      
      if (res.ok) {
        const data = await res.json();
        this.draftingProgress = data.drafting;
        this.statusMessage = { type: 'success', text: '草稿生成成功！' };
      }
    } catch (e) {
      console.error('Failed to generate draft:', e);
    } finally {
      this.loading = false;
    }
  }

  private async saveSection() {
    if (!this.taskId || !this.draftingProgress) return;
    
    const section = this.draftingProgress.sections[this.selectedSection];
    if (!section) return;

    try {
      await fetch(`${API_BASE}/api/tasks/${this.taskId}/drafting/section/${section.id}`, {
        method: 'PUT',
        headers: apiHeaders(),
        body: JSON.stringify({ content: section.content })
      });
      this.statusMessage = { type: 'success', text: '已保存' };
    } catch (e) {
      console.error('Failed to save section:', e);
    }
  }

  private async markSectionComplete() {
    if (!this.draftingProgress) return;
    
    const section = this.draftingProgress.sections[this.selectedSection];
    if (!section) return;

    section.status = 'completed';
    section.lastModified = new Date().toISOString();
    this.draftingProgress = { ...this.draftingProgress };
    await this.saveSection();
  }

  private confirmDrafting() {
    this.dispatchEvent(new CustomEvent('drafting-confirmed', {
      detail: { progress: this.draftingProgress }
    }));
  }

  private renderDefaultProgress(): DraftingProgress {
    return {
      sections: [
        { id: 1, chapterId: 1, title: '1.1 研究背景', content: '', wordCount: 0, status: 'pending', lastModified: '' },
        { id: 2, chapterId: 1, title: '1.2 问题陈述', content: '', wordCount: 0, status: 'pending', lastModified: '' },
        { id: 3, chapterId: 1, title: '1.3 主要贡献', content: '', wordCount: 0, status: 'pending', lastModified: '' },
        { id: 4, chapterId: 2, title: '2.1 控制方程', content: '', wordCount: 0, status: 'pending', lastModified: '' },
        { id: 5, chapterId: 2, title: '2.2 湍流模型', content: '', wordCount: 0, status: 'pending', lastModified: '' },
        { id: 6, chapterId: 3, title: '3.1 离散化方法', content: '', wordCount: 0, status: 'pending', lastModified: '' },
        { id: 7, chapterId: 3, title: '3.2 求解算法', content: '', wordCount: 0, status: 'pending', lastModified: '' },
        { id: 8, chapterId: 4, title: '4.1 验证算例', content: '', wordCount: 0, status: 'pending', lastModified: '' },
        { id: 9, chapterId: 4, title: '4.2 参数研究', content: '', wordCount: 0, status: 'pending', lastModified: '' },
        { id: 10, chapterId: 5, title: '5. 结论', content: '', wordCount: 0, status: 'pending', lastModified: '' },
      ],
      totalWords: 0,
      completedSections: 0,
      currentSection: 0
    };
  }

  render() {
    const progress = this.draftingProgress || this.renderDefaultProgress();
    const currentSection = progress.sections[this.selectedSection];
    const progressPercent = progress.sections.length > 0 
      ? Math.round((progress.completedSections / progress.sections.length) * 100) 
      : 0;

    return html`
      <div class="layout">
        <div class="sidebar">
          <h3>撰写进度</h3>
          
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
          <div class="progress-stats">
            <span>${progress.completedSections}/${progress.sections.length} 章节</span>
            <span>${progress.totalWords.toLocaleString()} 字</span>
          </div>

          ${this.statusMessage ? html`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          ` : ''}

          <div class="section-list">
            ${progress.sections.map((s, idx) => html`
              <div 
                class="section-item ${idx === this.selectedSection ? 'active' : ''} ${s.status}"
                @click=${() => this.selectedSection = idx}
              >
                <div>${s.title}</div>
                <div class="section-status">
                  <span class="status-badge ${s.status}">${s.status === 'pending' ? '待写' : s.status === 'drafting' ? '撰写中' : '已完成'}</span>
                  <span class="word-count-small">${s.wordCount} 字</span>
                </div>
              </div>
            `)}
          </div>

          <div style="margin-top: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2);">
            <button @click=${this.startDrafting} ?disabled=${this.loading}>
              ${this.loading ? '生成中...' : '🤖 AI 撰写'}
            </button>
            <button @click=${this.confirmDrafting} class="primary">
              ✅ 确认草稿
            </button>
          </div>
        </div>

        <div class="editor-panel">
          <div class="editor-header">
            <span class="editor-title">${currentSection?.title || '选择章节'}</span>
            <div class="editor-actions">
              <button @click=${this.saveSection}>💾 保存</button>
              <button @click=${this.markSectionComplete} class="primary">✅ 完成撰写</button>
            </div>
          </div>

          <div class="editor-body">
            <textarea 
              .value=${currentSection?.content || ''}
              @input=${(e: any) => {
                if (this.draftingProgress) {
                  const section = this.draftingProgress.sections[this.selectedSection];
                  section.content = e.target.value;
                  section.wordCount = e.target.value.replace(/\s/g, '').length;
                  section.status = 'drafting';
                  this.draftingProgress = { ...this.draftingProgress };
                }
              }}
              placeholder="在此输入章节内容...或点击「AI 撰写」让 AI 帮助生成"
            ></textarea>
          </div>

          <div class="editor-footer">
            <span>字数: ${currentSection?.wordCount || 0}</span>
            <span>最后修改: ${currentSection?.lastModified ? new Date(currentSection.lastModified).toLocaleString() : '未保存'}</span>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'drafting-stage': DraftingStage;
  }
}
