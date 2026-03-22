/**
 * Data Requirements Stage - 算例需求
 * 
 * Agent B (物理-数据映射师) 负责
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

interface CaseRequirement {
  id: number;
  name: string;
  description: string;
  geometry: {
    type: string;
    dimensions: string;
  };
  physics: {
    Reynolds: number;
    Prandtl: number;
    fluidProperties: string;
  };
  boundaryConditions: string[];
  mesh: {
    type: string;
    size: string;
    elements: number;
  };
  expectedResults: string[];
  priority: 'high' | 'medium' | 'low';
}

interface DataRequirements {
  cases: CaseRequirement[];
  computationalResources: {
    cores: number;
    memory: string;
    estimatedTime: string;
  };
  notes: string;
}

@customElement('data-requirements-stage')
export class DataRequirementsStage extends LitElement {
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

    .cases-grid {
      display: grid;
      gap: var(--space-3);
    }

    .case-card {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .case-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }

    .case-name {
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .priority-badge {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
    }

    .priority-badge.high {
      background: #fef2f2;
      color: #b91c1c;
    }

    .priority-badge.medium {
      background: #fffbeb;
      color: #b45309;
    }

    .priority-badge.low {
      background: #ecfdf5;
      color: #047857;
    }

    .case-meta {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-2);
      margin-top: var(--space-2);
    }

    .meta-item {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
    }

    .meta-item strong {
      color: var(--color-text-primary);
    }

    .resources-grid {
      display: grid;
      gap: var(--space-3);
    }

    .resource-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3);
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
    }

    .resource-icon {
      font-size: var(--text-xl);
    }

    .resource-info {
      flex: 1;
    }

    .resource-label {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }

    .resource-value {
      font-weight: 600;
      color: var(--color-text-primary);
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

    .form-group textarea {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
      background: var(--color-bg);
      color: var(--color-text-primary);
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

  @state() private dataRequirements: DataRequirements | null = null;
  @state() private taskId: string | null = null;
  @state() private loading = false;
  @state() private statusMessage: { type: 'info' | 'success' | 'error'; text: string } | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadDataRequirements();
  }

  private async loadDataRequirements() {
    const saved = localStorage.getItem('paper-dashboard-task');
    if (saved) {
      const taskData = JSON.parse(saved);
      this.taskId = taskData.task_id;
      await this.fetchDataRequirements();
    }
  }

  private async fetchDataRequirements() {
    if (!this.taskId) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/data-requirements`, {
        headers: apiHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        this.dataRequirements = data.dataRequirements;
      }
    } catch (e) {
      console.error('Failed to fetch data requirements:', e);
    }
  }

  private async generateRequirements() {
    if (!this.taskId) return;
    
    this.loading = true;
    this.statusMessage = { type: 'info', text: '正在分析并生成算例需求...' };

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${this.taskId}/data-requirements/generate`, {
        method: 'POST',
        headers: apiHeaders()
      });
      
      if (res.ok) {
        const data = await res.json();
        this.dataRequirements = data.dataRequirements;
        this.statusMessage = { type: 'success', text: '算例需求生成成功！' };
      } else {
        this.statusMessage = { type: 'error', text: '生成失败，请重试' };
      }
    } catch (e) {
      this.statusMessage = { type: 'error', text: '网络错误' };
    } finally {
      this.loading = false;
    }
  }

  private async saveRequirements() {
    if (!this.taskId || !this.dataRequirements) return;
    
    try {
      await fetch(`${API_BASE}/api/tasks/${this.taskId}/data-requirements`, {
        method: 'PUT',
        headers: apiHeaders(),
        body: JSON.stringify({ dataRequirements: this.dataRequirements })
      });
      this.statusMessage = { type: 'success', text: '已保存' };
    } catch (e) {
      this.statusMessage = { type: 'error', text: '保存失败' };
    }
  }

  private confirmRequirements() {
    if (!this.dataRequirements) return;
    
    this.saveRequirements();
    this.dispatchEvent(new CustomEvent('requirements-confirmed', {
      detail: { requirements: this.dataRequirements }
    }));
  }

  private renderDefaultRequirements(): DataRequirements {
    return {
      cases: [
        {
          id: 1,
          name: 'Validation Case',
          description: '与经典实验数据对比验证方法可靠性',
          geometry: { type: '2D Channel', dimensions: '4H x 2W' },
          physics: { Reynolds: 5000, Prandtl: 0.71, fluidProperties: 'Air, Pr=0.71' },
          boundaryConditions: ['Inlet: Uniform velocity', 'Outlet: Pressure outlet', 'Walls: No-slip'],
          mesh: { type: 'Structured', size: '0.01', elements: 50000 },
          expectedResults: ['Velocity profiles', 'Pressure drop', 'Reattachment length'],
          priority: 'high'
        },
        {
          id: 2,
          name: 'Parameter Study: Re',
          description: 'Reynolds数对流动特性的影响',
          geometry: { type: '2D Channel', dimensions: '4H x 2W' },
          physics: { Reynolds: 10000, Prandtl: 0.71, fluidProperties: 'Air' },
          boundaryConditions: ['Inlet: Uniform velocity', 'Outlet: Pressure outlet', 'Walls: No-slip'],
          mesh: { type: 'Structured', size: '0.01', elements: 80000 },
          expectedResults: ['Flow pattern changes', 'Separation points', 'Nusselt number correlation'],
          priority: 'high'
        },
        {
          id: 3,
          name: '3D Effects Study',
          description: '评估三维效应的影响',
          geometry: { type: '3D Duct', dimensions: 'L=10H, W=4H, H' },
          physics: { Reynolds: 8000, Prandtl: 0.71, fluidProperties: 'Air' },
          boundaryConditions: ['Inlet: Uniform velocity', 'Outlet: Pressure outlet', 'Walls: No-slip'],
          mesh: { type: 'Hybrid', size: '0.02', elements: 500000 },
          expectedResults: ['Secondary flows', '3D separation', 'Spanwise variation'],
          priority: 'medium'
        }
      ],
      computationalResources: {
        cores: 64,
        memory: '128 GB',
        estimatedTime: '48 hours'
      },
      notes: ''
    };
  }

  render() {
    const reqs = this.dataRequirements || this.renderDefaultRequirements();

    return html`
      <div class="layout">
        <div class="panel">
          <h3><span class="step">1</span> 算例配置</h3>
          
          ${this.statusMessage ? html`
            <div class="status-message ${this.statusMessage.type}">
              ${this.statusMessage.text}
            </div>
          ` : ''}

          <div class="cases-grid">
            ${reqs.cases.map(c => html`
              <div class="case-card">
                <div class="case-header">
                  <span class="case-name">${c.name}</span>
                  <span class="priority-badge ${c.priority}">${c.priority.toUpperCase()}</span>
                </div>
                <p style="font-size: var(--text-xs); color: var(--color-text-secondary); margin-bottom: var(--space-2);">
                  ${c.description}
                </p>
                <div class="case-meta">
                  <div class="meta-item"><strong>几何:</strong> ${c.geometry.type}</div>
                  <div class="meta-item"><strong>Re:</strong> ${c.physics.Reynolds}</div>
                  <div class="meta-item"><strong>网格:</strong> ${c.mesh.elements.toLocaleString()}</div>
                  <div class="meta-item"><strong>流体:</strong> ${c.physics.fluidProperties}</div>
                </div>
              </div>
            `)}
          </div>

          <div class="actions">
            <button @click=${this.generateRequirements} ?disabled=${this.loading}>
              ${this.loading ? '生成中...' : '🔄 AI 生成算例'}
            </button>
            <button @click=${this.confirmRequirements} class="primary">
              ✅ 确认算例
            </button>
          </div>
        </div>

        <div class="panel">
          <h3><span class="step">2</span> 计算资源与备注</h3>
          
          ${this.loading ? html`
            <div class="generating">
              <div class="spinner"></div>
              <p>AI 正在分析物理模型...</p>
            </div>
          ` : html`
            <div class="resources-grid">
              <div class="resource-item">
                <span class="resource-icon">🔢</span>
                <div class="resource-info">
                  <div class="resource-label">CPU Cores</div>
                  <div class="resource-value">${reqs.computationalResources.cores}</div>
                </div>
              </div>
              <div class="resource-item">
                <span class="resource-icon">💾</span>
                <div class="resource-info">
                  <div class="resource-label">Memory</div>
                  <div class="resource-value">${reqs.computationalResources.memory}</div>
                </div>
              </div>
              <div class="resource-item">
                <span class="resource-icon">⏱️</span>
                <div class="resource-info">
                  <div class="resource-label">预计耗时</div>
                  <div class="resource-value">${reqs.computationalResources.estimatedTime}</div>
                </div>
              </div>
            </div>

            <div class="edit-form">
              <div class="form-group">
                <label>备注与特殊要求</label>
                <textarea 
                  .value=${reqs.notes || ''}
                  @input=${(e: any) => {
                    if (this.dataRequirements) {
                      this.dataRequirements.notes = e.target.value;
                    }
                  }}
                  placeholder="如有特殊硬件、边界条件或算例要求，请在此说明..."
                ></textarea>
              </div>

              <div class="actions">
                <button @click=${this.saveRequirements}>💾 保存</button>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'data-requirements-stage': DataRequirementsStage;
  }
}
