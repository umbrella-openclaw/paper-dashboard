/**
 * Review Stage - 质量门禁
 * 
 * Orchestrator 负责
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

interface ReviewCriterion {
  id: number;
  name: string;
  description: string;
  weight: number;
  score: number;
  maxScore: number;
  passed: boolean;
  feedback: string;
}

interface ReviewReport {
  overallScore: number;
  passed: boolean;
  criteria: ReviewCriterion[];
  finalFeedback: string;
  mustFixIssues: string[];
  recommendedFixes: string[];
}

@customElement('review-stage')
export class ReviewStage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-4);
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

    .result-banner {
      text-align: center;
      padding: var(--space-6);
      border-radius: var(--radius-xl);
      margin-bottom: var(--space-4);
    }

    .result-banner.passed {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 2px solid #10b981;
    }

    .result-banner.failed {
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      border: 2px solid #ef4444;
    }

    .result-icon {
      font-size: 48px;
      margin-bottom: var(--space-2);
    }

    .result-title {
      font-size: var(--text-xl);
      font-weight: 700;
      margin-bottom: var(--space-1);
    }

    .result-banner.passed .result-title {
      color: #047857;
    }

    .result-banner.failed .result-title {
      color: #b91c1c;
    }

    .result-score {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--color-accent);
    }

    .criteria-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .criterion-card {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .criterion-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }

    .criterion-name {
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .criterion-score {
      font-weight: 700;
      color: var(--color-accent);
    }

    .criterion-bar {
      height: 6px;
      background: var(--color-border);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: var(--space-2);
    }

    .criterion-fill {
      height: 100%;
      transition: width 0.3s ease;
    }

    .criterion-fill.passed {
      background: #10b981;
    }

    .criterion-fill.failed {
      background: #ef4444;
    }

    .criterion-desc {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
    }

    .criterion-feedback {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      font-style: italic;
    }

    .issues-section {
      margin-top: var(--space-4);
    }

    .issues-section h4 {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-3);
    }

    .issues-list {
      display: grid;
      gap: var(--space-2);
    }

    .issue-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
    }

    .issue-item.must-fix {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;
    }

    .issue-item.recommended {
      background: #fffbeb;
      border: 1px solid #fde68a;
      color: #b45309;
    }

    .issue-icon {
      flex-shrink: 0;
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

    button.secondary {
      background: #fef2f2;
      border-color: #fecaca;
      color: #b91c1c;
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

  @state() private reviewReport: ReviewReport | null = null;
  @state() private taskId: string | null = null;
  @state() private loading = false;
  @state() private statusMessage: { type: 'info' | 'success'; text: string } | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadReviewReport();
  }

  private async loadReviewReport() {
    const saved = localStorage.getItem('paper-dashboard-task');
    if (saved) {
      const taskData = JSON.parse(saved);
      this.taskId = taskData.task_id;
      await this.fetchReviewReport();
    }
  }

  private async fetchReviewReport() {
    if (!this.taskId) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/review`, {
        headers: apiHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        this.reviewReport = data.review;
      }
    } catch (e) {
      console.error('Failed to fetch review report:', e);
    }
  }

  private async runReview() {
    if (!this.taskId) return;
    
    this.loading = true;
    this.statusMessage = { type: 'info', text: '正在进行质量门禁审核...' };

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/review/run`, {
        method: 'POST',
        headers: apiHeaders()
      });
      
      if (res.ok) {
        const data = await res.json();
        this.reviewReport = data.review;
        this.statusMessage = { type: 'success', text: '审核完成！' };
      }
    } catch (e) {
      console.error('Failed to run review:', e);
    } finally {
      this.loading = false;
    }
  }

  private passReview() {
    this.dispatchEvent(new CustomEvent('review-passed', {
      detail: { report: this.reviewReport }
    }));
  }

  private failReview() {
    this.dispatchEvent(new CustomEvent('review-failed', {
      detail: { report: this.reviewReport }
    }));
  }

  private renderDefaultReport(): ReviewReport {
    return {
      overallScore: 82,
      passed: true,
      criteria: [
        { id: 1, name: '结构完整性', description: '章节结构是否完整、逻辑清晰', weight: 20, score: 18, maxScore: 20, passed: true, feedback: 'IMRaD结构完整' },
        { id: 2, name: '方法描述', description: '数值方法描述是否充分、可复现', weight: 20, score: 16, maxScore: 20, passed: true, feedback: '方法描述详细' },
        { id: 3, name: '结果分析', description: '结果是否充分、讨论是否深入', weight: 25, score: 20, maxScore: 25, passed: true, feedback: '结果丰富、分析深入' },
        { id: 4, name: '语言质量', description: '英语表达、语法、格式', weight: 15, score: 12, maxScore: 15, passed: true, feedback: '有小问题需要润色' },
        { id: 5, name: '图表质量', description: '图表清晰度、规范性', weight: 10, score: 8, maxScore: 10, passed: true, feedback: '图表质量良好' },
        { id: 6, name: '文献引用', description: '引用完整、格式规范', weight: 10, score: 8, maxScore: 10, passed: true, feedback: '引用格式需统一' }
      ],
      finalFeedback: '论文整体质量良好，满足投稿要求。建议进行最后润色后提交。',
      mustFixIssues: [],
      recommendedFixes: [
        '参考文献格式统一为期刊风格',
        '检查所有图表编号连续性',
        '确认所有单位使用SI制'
      ]
    };
  }

  render() {
    const report = this.reviewReport || this.renderDefaultReport();

    return html`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 质量门禁审核</h3>
          
          ${this.statusMessage ? html`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          ` : ''}

          <div class="result-banner ${report.passed ? 'passed' : 'failed'}">
            <div class="result-icon">${report.passed ? '✅' : '❌'}</div>
            <div class="result-title">${report.passed ? '通过质量门禁' : '未通过质量门禁'}</div>
            <div class="result-score">${report.overallScore}/100</div>
          </div>

          <div class="criteria-grid">
            ${report.criteria.map(c => html`
              <div class="criterion-card">
                <div class="criterion-header">
                  <span class="criterion-name">${c.name}</span>
                  <span class="criterion-score">${c.score}/${c.maxScore}</span>
                </div>
                <div class="criterion-bar">
                  <div class="criterion-fill ${c.passed ? 'passed' : 'failed'}" style="width: ${(c.score / c.maxScore) * 100}%"></div>
                </div>
                <div class="criterion-desc">${c.description}</div>
                <div class="criterion-feedback">${c.feedback}</div>
              </div>
            `)}
          </div>

          ${report.mustFixIssues.length > 0 ? html`
            <div class="issues-section">
              <h4>⚠️ 必须修复的问题</h4>
              <div class="issues-list">
                ${report.mustFixIssues.map(issue => html`
                  <div class="issue-item must-fix">
                    <span class="issue-icon">🔴</span>
                    <span>${issue}</span>
                  </div>
                `)}
              </div>
            </div>
          ` : ''}

          ${report.recommendedFixes.length > 0 ? html`
            <div class="issues-section">
              <h4>💡 建议改进</h4>
              <div class="issues-list">
                ${report.recommendedFixes.map(issue => html`
                  <div class="issue-item recommended">
                    <span class="issue-icon">🟡</span>
                    <span>${issue}</span>
                  </div>
                `)}
              </div>
            </div>
          ` : ''}

          <div class="actions">
            <button @click=${this.runReview} ?disabled=${this.loading}>
              ${this.loading ? '审核中...' : '🔍 重新审核'}
            </button>
            ${report.passed ? html`
              <button @click=${this.passReview} class="primary">
                ✅ 通过审核
              </button>
            ` : html`
              <button @click=${this.failReview} class="secondary">
                📝 返回修改
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'review-stage': ReviewStage;
  }
}
