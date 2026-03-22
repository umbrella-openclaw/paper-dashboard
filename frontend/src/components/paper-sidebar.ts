import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const API_BASE = 'http://localhost:8080';
const API_KEY = '3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a';

function apiFetch(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      'X-Api-Key': API_KEY,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
}

interface TaskInfo {
  task_id: string;
  title: string;
  stage: string;
  stage_status: string;
  papers_total: number;
  updated_at: string;
}

@customElement('paper-sidebar')
export class PaperSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    
    .sidebar {
      padding: var(--space-4);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .create-paper {
      width: 100%;
      margin-bottom: var(--space-4);
      padding: var(--space-3) var(--space-4);
      border: 2px solid var(--color-accent);
      border-radius: var(--radius-lg);
      background: var(--color-accent);
      color: #fff;
      font-size: var(--text-sm);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .create-paper:hover {
      background: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
    }

    .create-paper:active {
      transform: scale(0.98);
    }
    
    h3 {
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-3);
      padding: 0 var(--space-2);
    }
    
    .section {
      margin-bottom: var(--space-4);
    }
    
    .task-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    
    .task-item {
      position: relative;
      padding: var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .task-item:hover {
      border-color: var(--color-accent);
      background: var(--color-bg);
    }
    
    .task-item.active {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
    }
    
    .task-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-2);
    }
    
    .task-title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
      word-break: break-word;
      flex: 1;
    }
    
    .task-delete {
      width: 20px;
      height: 20px;
      border: none;
      background: transparent;
      color: var(--color-text-tertiary);
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      opacity: 0;
      transition: all var(--transition-fast);
    }
    
    .task-item:hover .task-delete {
      opacity: 1;
    }
    
    .task-delete:hover {
      background: #fef2f2;
      color: #ef4444;
    }
    
    .task-meta {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-2);
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }
    
    .task-stage {
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 600;
    }
    
    .stage-INTAKE { background: #dbeafe; color: #1d4ed8; }
    .stage-LITERATURE { background: #ede9fe; color: #7c3aed; }
    .stage-OUTLINE { background: #fef3c7; color: #b45309; }
    .stage-DRAFTING { background: #d1fae5; color: #047857; }
    .stage-POLISHING { background: #fce7f3; color: #be185d; }
    .stage-REVIEW { background: #fee2e2; color: #b91c1c; }
    .stage-FINALIZE { background: #ecfdf5; color: #065f46; }
    
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }
    
    .status-idle { color: #9ca3af; }
    .status-processing { color: #f59e0b; }
    .status-waiting_confirm { color: #10b981; }
    .status-completed { color: #3b82f6; }
    .status-error { color: #ef4444; }
    
    .empty-state {
      text-align: center;
      padding: var(--space-6);
      color: var(--color-text-tertiary);
      font-size: var(--text-sm);
    }
    
    .empty-state .icon {
      font-size: 32px;
      margin-bottom: var(--space-2);
      opacity: 0.5;
    }
    
    .loading {
      text-align: center;
      padding: var(--space-4);
      color: var(--color-text-tertiary);
      font-size: var(--text-sm);
    }
    
    .confirm-delete {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: var(--space-3);
    }
    
    .confirm-delete span {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      text-align: center;
    }
    
    .confirm-btn {
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    
    .confirm-btn.yes {
      background: #ef4444;
      color: white;
    }
    
    .confirm-btn.no {
      background: var(--color-border);
      color: var(--color-text-primary);
    }
  `;

  @state() private tasks: TaskInfo[] = [];
  @state() private loading = false;
  @state() private confirmDeleteId: string | null = null;
  private _interval: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadTasks();
    // Refresh every 10 seconds
    this._interval = setInterval(() => this.loadTasks(), 10000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  private async loadTasks() {
    this.loading = true;
    try {
      const response = await apiFetch(`${API_BASE}/api/tasks`);
      if (response.ok) {
        const data = await response.json();
        this.tasks = data.tasks || [];
      }
    } catch (e) {
      console.error('Failed to load tasks:', e);
    } finally {
      this.loading = false;
    }
  }

  private createPaper() {
    this.dispatchEvent(new CustomEvent('create-paper'));
  }

  private selectTask(taskId: string) {
    this.dispatchEvent(new CustomEvent('task-select', { detail: { taskId } }));
  }

  private async deleteTask(e: Event, taskId: string) {
    e.stopPropagation();
    
    if (this.confirmDeleteId !== taskId) {
      this.confirmDeleteId = taskId;
      return;
    }
    
    try {
      const response = await apiFetch(`${API_BASE}/api/tasks/${taskId}`, { 
        method: 'DELETE' 
      });
      if (response.ok) {
        this.tasks = this.tasks.filter(t => t.task_id !== taskId);
        this.dispatchEvent(new CustomEvent('task-deleted', { detail: { taskId } }));
      }
    } catch (e) {
      console.error('Failed to delete task:', e);
    } finally {
      this.confirmDeleteId = null;
    }
  }

  private cancelDelete(e: Event) {
    e.stopPropagation();
    this.confirmDeleteId = null;
  }

  private getStageClass(stage: string): string {
    return `stage-${stage}`;
  }

  private getStatusClass(status: string): string {
    return `status-${status}`;
  }

  render() {
    return html`
      <div class="sidebar">
        <button class="create-paper" @click=${this.createPaper}>
          + 创建新论文
        </button>

        <div class="section">
          <h3>论文任务列表</h3>
          
          ${this.loading && this.tasks.length === 0 ? html`
            <div class="loading">加载中...</div>
          ` : this.tasks.length === 0 ? html`
            <div class="empty-state">
              <div class="icon">📄</div>
              <div>暂无论文任务</div>
              <div style="font-size: var(--text-xs); margin-top: var(--space-1);">点击上方按钮创建</div>
            </div>
          ` : html`
            <div class="task-list">
              ${this.tasks.map(task => html`
                <div 
                  class="task-item"
                  @click=${() => this.selectTask(task.task_id)}
                >
                  <div class="task-header">
                    <div class="task-title">
                      ${task.title || '未命名论文'}
                    </div>
                    <button 
                      class="task-delete" 
                      @click=${(e: Event) => this.deleteTask(e, task.task_id)}
                      title="删除任务"
                    >
                      ${this.confirmDeleteId === task.task_id ? '✓' : '×'}
                    </button>
                  </div>
                  
                  <div class="task-meta">
                    <span class="task-stage ${this.getStageClass(task.stage)}">
                      ${task.stage}
                    </span>
                    <span class="status-dot ${this.getStatusClass(task.stage_status)}"></span>
                    <span>${task.stage_status === 'idle' ? '待处理' : 
                           task.stage_status === 'processing' ? '处理中' : 
                           task.stage_status === 'waiting_confirm' ? '待确认' : 
                           task.stage_status === 'completed' ? '已完成' : 
                           task.stage_status === 'error' ? '错误' : task.stage_status}</span>
                    ${task.papers_total > 0 ? html`
                      <span>•</span>
                      <span>${task.papers_total} 篇论文</span>
                    ` : ''}
                  </div>
                  
                  ${this.confirmDeleteId === task.task_id ? html`
                    <div class="confirm-delete" @click=${(e: Event) => e.stopPropagation()}>
                      <span>确认删除此任务？</span>
                      <div style="display: flex; gap: var(--space-2);">
                        <button class="confirm-btn yes" @click=${(e: Event) => this.deleteTask(e, task.task_id)}>删除</button>
                        <button class="confirm-btn no" @click=${this.cancelDelete}>取消</button>
                      </div>
                    </div>
                  ` : ''}
                </div>
              `)}
            </div>
          `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'paper-sidebar': PaperSidebar;
  }
}
