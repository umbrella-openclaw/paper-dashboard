/**
 * Outline Stage - 确定论文结构
 * 
 * Agent A (学术架构师) 负责
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

interface OutlineData {
  structure: OutlineSection[];
  totalWords: number;
  notes: string;
}

interface OutlineSection {
  id: number;
  type: 'chapter' | 'section' | 'subsection';
  title: string;
  description: string;
  targetWords: number;
  keyPoints: string[];
}

@customElement('outline-stage')
export class OutlineStage extends LitElement {
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

    .structure-tree {
      display: grid;
      gap: var(--space-3);
    }

    .chapter {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .chapter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }

    .chapter-title {
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .word-count {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      background: var(--color-surface);
      padding: 2px 8px;
      border-radius: 999px;
    }

    .section {
      margin-left: var(--space-4);
      border-left: 2px solid var(--color-border-light);
      padding-left: var(--space-3);
      margin-top: var(--space-2);
    }

    .section-title {
      font-weight: 600;
      font-size: var(--text-sm);
      color: var(--color-text-primary);
    }

    .subsection {
      margin-left: var(--space-4);
      padding-left: var(--space-2);
      margin-top: var(--space-1);
    }

    .subsection-title {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .key-points {
      margin-top: var(--space-2);
      padding: var(--space-2);
      background: var(--color-surface);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
    }

    .key-points-title {
      font-weight: 600;
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-1);
    }

    .key-point {
      color: var(--color-text-secondary);
      margin-left: var(--space-2);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .stat-card {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      text-align: center;
    }

    .stat-value {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--color-accent);
    }

    .stat-label {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }

    .edit-form {
      display: grid;
      gap: var(--space-3);
    }

    .form-group {
      display: grid;
      gap: var(--space-1);
    }

    .form-group label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .form-group input,
    .form-group textarea {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
      background: var(--color-bg);
      color: var(--color-text-primary);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 80px;
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

    .empty-state {
      text-align: center;
      padding: var(--space-8);
      color: var(--color-text-tertiary);
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

    .status-message.error {
      background: #fef2f2;
      border: 1px solid #ef4444;
      color: #b91c1c;
    }
  `;

  @state() private outlineData: OutlineData | null = null;
  @state() private taskId: string | null = null;
  @state() private loading = false;
  @state() private statusMessage: { type: 'info' | 'success' | 'error'; text: string } | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadOutlineData();
  }

  private async loadOutlineData() {
    const saved = localStorage.getItem('paper-dashboard-task');
    if (saved) {
      const taskData = JSON.parse(saved);
      this.taskId = taskData.task_id;
      await this.fetchOutlineData();
    }
  }

  private async fetchOutlineData() {
    if (!this.taskId) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/outline`, {
        headers: apiHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        this.outlineData = data.outline;
      }
    } catch (e) {
      console.error('Failed to fetch outline data:', e);
    }
  }

  private async generateOutline() {
    if (!this.taskId) return;
    
    this.loading = true;
    this.statusMessage = { type: 'info', text: '正在生成论文大纲...' };

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/outline/generate`, {
        method: 'POST',
        headers: apiHeaders()
      });
      
      if (res.ok) {
        const data = await res.json();
        this.outlineData = data.outline;
        this.statusMessage = { type: 'success', text: '大纲生成成功！' };
      } else {
        this.statusMessage = { type: 'error', text: '生成失败，请重试' };
      }
    } catch (e) {
      this.statusMessage = { type: 'error', text: '网络错误' };
    } finally {
      this.loading = false;
    }
  }

  private async saveOutline() {
    if (!this.taskId || !this.outlineData) return;
    
    try {
      await fetch(`${API_BASE}/api/tasks/${this.taskId}/outline`, {
        method: 'PUT',
        headers: apiHeaders(),
        body: JSON.stringify({ outline: this.outlineData })
      });
      this.statusMessage = { type: 'success', text: '大纲已保存' };
    } catch (e) {
      this.statusMessage = { type: 'error', text: '保存失败' };
    }
  }

  private confirmOutline() {
    if (!this.outlineData) return;
    
    this.saveOutline();
    this.dispatchEvent(new CustomEvent('outline-confirmed', {
      detail: { outline: this.outlineData }
    }));
  }

  private renderDefaultOutline(): OutlineData {
    return {
      structure: [
        {
          id: 1,
          type: 'chapter',
          title: '1. 引言 (Introduction)',
          description: '介绍研究背景、动机和本文贡献',
          targetWords: 800,
          keyPoints: ['研究背景', '问题陈述', '主要贡献']
        },
        {
          id: 2,
          type: 'chapter',
          title: '2. 数学物理模型 (Mathematical Formulation)',
          description: '描述控制方程和数值方法',
          targetWords: 1500,
          keyPoints: ['N-S方程', '湍流模型', '边界条件']
        },
        {
          id: 3,
          type: 'chapter',
          title: '3. 数值方法 (Numerical Method)',
          description: '离散化方案和求解算法',
          targetWords: 1200,
          keyPoints: ['有限体积法', '压力速度耦合', '网格收敛性']
        },
        {
          id: 4,
          type: 'chapter',
          title: '4. 结果与讨论 (Results & Discussion)',
          description: '验证算例和参数研究',
          targetWords: 2500,
          keyPoints: ['验证研究', '参数敏感性', '物理分析']
        },
        {
          id: 5,
          type: 'chapter',
          title: '5. 结论 (Conclusions)',
          description: '工作总结和未来展望',
          targetWords: 500,
          keyPoints: ['主要结论', '创新点', '后续工作']
        }
      ],
      totalWords: 6500,
      notes: ''
    };
  }

  render() {
    const outline = this.outlineData || this.renderDefaultOutline();

    return html`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 论文结构</h3>
          
          ${this.statusMessage ? html`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          ` : ''}

          <div class="stats">
            <div class="stat-card">
              <div class="stat-value">${outline.structure.length}</div>
              <div class="stat-label">章节数</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${outline.totalWords}</div>
              <div class="stat-label">目标字数</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">~${Math.round(outline.totalWords / 250)}</div>
              <div class="stat-label">页数</div>
            </div>
          </div>

          <div class="structure-tree">
            ${outline.structure.map(section => this.renderSection(section))}
          </div>

          <div class="actions">
            <button @click=${this.generateOutline} ?disabled=${this.loading}>
              ${this.loading ? '生成中...' : '🔄 AI 生成大纲'}
            </button>
            <button @click=${this.confirmOutline} class="primary">
              ✅ 确认大纲
            </button>
          </div>
        </div>

        <div class="panel">
          <h3><span class="step">2</span> 大纲详情</h3>
          
          ${this.loading ? html`
            <div class="generating">
              <div class="spinner"></div>
              <p>AI 正在分析论文内容并生成结构...</p>
            </div>
          ` : html`
            <div class="edit-form">
              <div class="form-group">
                <label>备注与特殊要求</label>
                <textarea 
                  .value=${outline.notes || ''}
                  @input=${(e: any) => {
                    if (this.outlineData) {
                      this.outlineData.notes = e.target.value;
                    }
                  }}
                  placeholder="如有特殊章节要求或结构偏好，请在此说明..."
                ></textarea>
              </div>
              
              <div class="form-group">
                <label>结构说明</label>
                <p style="font-size: var(--text-sm); color: var(--color-text-secondary);">
                  论文采用标准的 IMRaD 结构（Introduction, Methods, Results, and Discussion），
                  适合工程类和物理类期刊（如 Physics of Fluids, Journal of Computational Physics）。
                </p>
              </div>

              <div class="actions">
                <button @click=${this.saveOutline}>💾 保存修改</button>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  private renderSection(section: OutlineSection) {
    if (section.type === 'chapter') {
      return html`
        <div class="chapter">
          <div class="chapter-header">
            <span class="chapter-title">${section.title}</span>
            <span class="word-count">~${section.targetWords} words</span>
          </div>
          <p style="font-size: var(--text-xs); color: var(--color-text-secondary); margin-bottom: var(--space-2);">
            ${section.description}
          </p>
          <div class="key-points">
            <div class="key-points-title">关键内容:</div>
            ${section.keyPoints.map(point => html`<div class="key-point">• ${point}</div>`)}
          </div>
        </div>
      `;
    } else if (section.type === 'section') {
      return html`
        <div class="section">
          <div class="section-title">${section.title}</div>
        </div>
      `;
    } else {
      return html`
        <div class="subsection">
          <div class="subsection-title">${section.title}</div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'outline-stage': OutlineStage;
  }
}
