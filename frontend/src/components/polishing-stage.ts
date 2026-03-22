/**
 * Polishing Stage - PoF 润色
 * 
 * Agent C (PoF润色人) 负责
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

interface PolishingIssue {
  id: number;
  type: 'grammar' | 'style' | 'clarity' | 'technical' | 'format';
  severity: 'low' | 'medium' | 'high';
  location: string;
  original: string;
  suggestion: string;
  explanation: string;
  fixed: boolean;
}

interface PolishingReport {
  overallScore: number;
  issues: PolishingIssue[];
  summary: string;
  suggestions: string[];
}

@customElement('polishing-stage')
export class PolishingStage extends LitElement {
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

    .score-display {
      text-align: center;
      padding: var(--space-6);
      background: var(--color-bg);
      border-radius: var(--radius-xl);
      margin-bottom: var(--space-4);
    }

    .score-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: conic-gradient(
        var(--color-accent) calc(var(--score) * 1%),
        var(--color-border) calc(var(--score) * 1%)
      );
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-3);
    }

    .score-inner {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: var(--color-bg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .score-value {
      font-size: var(--text-3xl);
      font-weight: 700;
      color: var(--color-accent);
    }

    .score-label {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .issues-list {
      display: grid;
      gap: var(--space-3);
      max-height: 400px;
      overflow-y: auto;
    }

    .issue-card {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .issue-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }

    .issue-type {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
    }

    .issue-type.grammar { background: #eff6ff; color: #1e40af; }
    .issue-type.style { background: #fdf4ff; color: #7e22ce; }
    .issue-type.clarity { background: #fef9c3; color: #a16207; }
    .issue-type.technical { background: #fce7f3; color: #be185d; }
    .issue-type.format { background: #f0fdf4; color: #15803d; }

    .severity-badge {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 999px;
    }

    .severity-badge.high { background: #fef2f2; color: #b91c1c; }
    .severity-badge.medium { background: #fffbeb; color: #b45309; }
    .severity-badge.low { background: #ecfdf5; color: #047857; }

    .issue-location {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-2);
    }

    .issue-content {
      display: grid;
      gap: var(--space-2);
    }

    .original-text {
      font-size: var(--text-sm);
      color: #b91c1c;
      text-decoration: line-through;
      background: #fef2f2;
      padding: var(--space-2);
      border-radius: var(--radius-md);
    }

    .suggested-text {
      font-size: var(--text-sm);
      color: #047857;
      background: #ecfdf5;
      padding: var(--space-2);
      border-radius: var(--radius-md);
    }

    .issue-explanation {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      font-style: italic;
    }

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-2);
    }

    .checkbox-row input {
      width: 16px;
      height: 16px;
    }

    .checkbox-row label {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .suggestions-list {
      display: grid;
      gap: var(--space-2);
    }

    .suggestion-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      padding: var(--space-3);
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
    }

    .suggestion-icon {
      color: var(--color-accent);
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

  @state() private polishingReport: PolishingReport | null = null;
  @state() private taskId: string | null = null;
  @state() private loading = false;
  @state() private statusMessage: { type: 'info' | 'success'; text: string } | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadPolishingReport();
  }

  private async loadPolishingReport() {
    const saved = localStorage.getItem('paper-dashboard-task');
    if (saved) {
      const taskData = JSON.parse(saved);
      this.taskId = taskData.task_id;
      await this.fetchPolishingReport();
    }
  }

  private async fetchPolishingReport() {
    if (!this.taskId) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/polishing`, {
        headers: apiHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        this.polishingReport = data.polishing;
      }
    } catch (e) {
      console.error('Failed to fetch polishing report:', e);
    }
  }

  private async runPolishing() {
    if (!this.taskId) return;
    
    this.loading = true;
    this.statusMessage = { type: 'info', text: '正在分析论文并进行润色...' };

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/polishing/run`, {
        method: 'POST',
        headers: apiHeaders()
      });
      
      if (res.ok) {
        const data = await res.json();
        this.polishingReport = data.polishing;
        this.statusMessage = { type: 'success', text: '润色分析完成！' };
      }
    } catch (e) {
      console.error('Failed to run polishing:', e);
    } finally {
      this.loading = false;
    }
  }

  private toggleIssue(id: number) {
    if (!this.polishingReport) return;
    
    const issue = this.polishingReport.issues.find(i => i.id === id);
    if (issue) {
      issue.fixed = !issue.fixed;
      this.polishingReport = { ...this.polishingReport };
    }
  }

  private confirmPolishing() {
    this.dispatchEvent(new CustomEvent('polishing-confirmed', {
      detail: { report: this.polishingReport }
    }));
  }

  private renderDefaultReport(): PolishingReport {
    return {
      overallScore: 78,
      issues: [
        {
          id: 1,
          type: 'style',
          severity: 'medium',
          location: 'Section 1.1, Line 15',
          original: 'The results shows that...',
          suggestion: 'The results show that...',
          explanation: 'Subject-verb agreement: "results" is plural',
          fixed: false
        },
        {
          id: 2,
          type: 'clarity',
          severity: 'high',
          location: 'Section 2.2, Line 8',
          original: 'The mesh independence study was performed.',
          suggestion: 'We performed a mesh independence study to ensure numerical accuracy.',
          explanation: 'Add context for clarity',
          fixed: false
        },
        {
          id: 3,
          type: 'grammar',
          severity: 'low',
          location: 'Section 3.1, Line 22',
          original: 'Figure 1 shows the velocity profile.',
          suggestion: 'Figure 1 shows the velocity profile. The profile exhibits a parabolic shape characteristic of laminar flow.',
          explanation: 'Consider adding a brief interpretation',
          fixed: false
        },
        {
          id: 4,
          type: 'technical',
          severity: 'high',
          location: 'Section 4.2, Line 5',
          original: 'The friction factor was calculated using the Blasius correlation.',
          suggestion: 'The friction factor was calculated using the modified Blasius correlation for rough walls (Eq. 7).',
          explanation: 'Specify which correlation and reference equation',
          fixed: false
        },
        {
          id: 5,
          type: 'format',
          severity: 'low',
          location: 'References',
          original: '[1] J. Smith, 2020',
          suggestion: '[1] Smith, J., "Title of Paper", Journal Name, Vol. XX, No. XX, pp. XX-XX, 2020.',
          explanation: 'Use consistent citation format',
          fixed: false
        }
      ],
      summary: '论文整体质量良好，主要问题集中在表达的清晰度和专业术语的规范性上。',
      suggestions: [
        '建议在每个结果章节添加更详细的物理分析',
        '图表引用需要增加简要说明',
        '参考文献格式需要统一'
      ]
    };
  }

  render() {
    const report = this.polishingReport || this.renderDefaultReport();
    const fixedCount = report.issues.filter(i => i.fixed).length;

    return html`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 润色评分</h3>
          
          ${this.statusMessage ? html`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          ` : ''}

          <div class="score-display" style="--score: ${report.overallScore}">
            <div class="score-circle">
              <div class="score-inner">
                <span class="score-value">${report.overallScore}</span>
              </div>
            </div>
            <div class="score-label">论文质量评分</div>
          </div>

          <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: var(--space-4);">
            ${report.summary}
          </p>

          <div style="display: flex; gap: var(--space-2);">
            <button @click=${this.runPolishing} ?disabled=${this.loading} style="flex: 1;">
              ${this.loading ? '分析中...' : '🔍 重新分析'}
            </button>
            <button @click=${this.confirmPolishing} class="primary" style="flex: 1;">
              ✅ 确认润色 (${fixedCount}/${report.issues.length})
            </button>
          </div>
        </div>

        <div class="panel">
          <h3><span class="step">2</span> 问题与建议</h3>
          
          ${this.loading ? html`
            <div class="generating">
              <div class="spinner"></div>
              <p>AI 正在检查论文...</p>
            </div>
          ` : html`
            <div class="issues-list">
              ${report.issues.map(issue => html`
                <div class="issue-card">
                  <div class="issue-header">
                    <span class="issue-type ${issue.type}">${issue.type.toUpperCase()}</span>
                    <span class="severity-badge ${issue.severity}">${issue.severity === 'high' ? '重要' : issue.severity === 'medium' ? '中等' : '轻微'}</span>
                  </div>
                  <div class="issue-location">📍 ${issue.location}</div>
                  <div class="issue-content">
                    <div class="original-text">❌ ${issue.original}</div>
                    <div class="suggested-text">✅ ${issue.suggestion}</div>
                    <div class="issue-explanation">💡 ${issue.explanation}</div>
                  </div>
                  <div class="checkbox-row">
                    <input 
                      type="checkbox" 
                      .checked=${issue.fixed}
                      @change=${() => this.toggleIssue(issue.id)}
                      id="issue-${issue.id}"
                    />
                    <label for="issue-${issue.id}">已修复</label>
                  </div>
                </div>
              `)}
            </div>

            ${report.suggestions.length > 0 ? html`
              <div style="margin-top: var(--space-4);">
                <h4 style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--space-2);">整体建议:</h4>
                <div class="suggestions-list">
                  ${report.suggestions.map(s => html`
                    <div class="suggestion-item">
                      <span class="suggestion-icon">💡</span>
                      <span>${s}</span>
                    </div>
                  `)}
                </div>
              </div>
            ` : ''}
          `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'polishing-stage': PolishingStage;
  }
}
