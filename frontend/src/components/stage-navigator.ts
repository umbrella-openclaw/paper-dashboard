import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { WritingStage } from './paper-app.js';

interface StageDef {
  key: WritingStage;
  label: string;
  description: string;
  agent?: string;
}

@customElement('stage-navigator')
export class StageNavigator extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .wrap {
      display: grid;
      gap: var(--space-4);
      padding: var(--space-4);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      background: var(--color-surface);
      box-shadow: var(--shadow-sm);
    }

    .stages {
      display: grid;
      gap: var(--space-2);
      grid-template-columns: repeat(8, minmax(0, 1fr));
      overflow-x: auto;
    }

    .stage {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
      transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
      cursor: pointer;
      min-width: 100px;
    }

    .stage:hover {
      transform: translateY(-2px);
      border-color: var(--color-accent);
    }

    .stage.current {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
      transform: translateY(-2px);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    .stage.completed {
      border-color: #34d399;
      background: #ecfdf5;
    }

    .stage.previewable:hover {
      border-color: #f59e0b;
      background: #fffbeb;
    }

    .stage-name {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .stage-label {
      font-size: var(--text-xs);
    }

    .stage-meta {
      font-size: 10px;
      color: var(--color-text-tertiary);
      margin-top: 2px;
    }

    .badge {
      font-size: 9px;
      border-radius: 999px;
      padding: 2px 6px;
      background: #d1fae5;
      color: #047857;
      font-weight: 700;
      display: inline-block;
      margin-top: 4px;
    }

    .badge.current {
      background: var(--color-accent);
      color: #fff;
    }

    .badge.preview {
      background: #fef3c7;
      color: #92400e;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-4);
      flex-wrap: wrap;
    }

    .action-group {
      display: flex;
      gap: var(--space-3);
    }

    .current-stage-info {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .agent-tag {
      font-size: 10px;
      background: #e0e7ff;
      color: #4338ca;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
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
      opacity: 0.45;
    }

    .divider {
      width: 1px;
      height: 24px;
      background: var(--color-border);
    }

    @media (max-width: 1400px) {
      .stages {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (max-width: 900px) {
      .stages {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 600px) {
      .stages {
        grid-template-columns: 1fr;
      }

      .actions {
        flex-direction: column;
        align-items: stretch;
      }

      .action-group {
        justify-content: center;
      }
    }
  `;

  @property({ type: String }) currentStage!: WritingStage;
  @property({ type: Array }) completedStages: WritingStage[] = [];
  @property({ type: Boolean }) canAdvance = true;
  @property({ type: Boolean }) canRollback = true;

  private get stages(): StageDef[] {
    return [
      { key: 'INTAKE', label: 'Intake', description: '校验输入、建立上下文', agent: 'Orchestrator' },
      { key: 'LITERATURE', label: 'Literature', description: '文献检索、证据沉淀', agent: 'Agent A' },
      { key: 'OUTLINE', label: 'Outline', description: '确定结构、论证路径', agent: 'Agent A' },
      { key: 'DATA_REQUIREMENTS', label: 'Data Req.', description: '算例需求、数据映射', agent: 'Agent B' },
      { key: 'DRAFTING', label: 'Drafting', description: '章节草稿、无缺段检查', agent: 'Agent C' },
      { key: 'POLISHING', label: 'Polishing', description: 'PoF风格润色', agent: 'Agent C' },
      { key: 'REVIEW', label: 'Review', description: '质量门禁、返工决策', agent: 'Orchestrator' },
      { key: 'FINALIZE', label: 'Finalize', description: '固化产物、投稿封装', agent: 'Orchestrator' },
    ];
  }

  private isCompleted(stage: WritingStage) {
    return this.completedStages.includes(stage);
  }

  private isCurrent(stage: WritingStage) {
    return stage === this.currentStage;
  }

  private canPreviewStage(stage: WritingStage): boolean {
    const stages: WritingStage[] = ['INTAKE', 'LITERATURE', 'OUTLINE', 'DATA_REQUIREMENTS', 'DRAFTING', 'POLISHING', 'REVIEW', 'FINALIZE'];
    const currentIndex = stages.indexOf(this.currentStage);
    const stageIndex = stages.indexOf(stage);
    
    // Can preview: completed stages, current stage, or next upcoming stage
    return stageIndex <= currentIndex + 1;
  }

  private previewStage() {
    this.dispatchEvent(new CustomEvent('preview-stage'));
  }

  private advanceStage() {
    this.dispatchEvent(new CustomEvent('advance-stage'));
  }

  private rollbackStage() {
    this.dispatchEvent(new CustomEvent('rollback-stage'));
  }

  private selectStage(stage: WritingStage) {
    if (this.canPreviewStage(stage)) {
      this.dispatchEvent(new CustomEvent('select-stage', { detail: stage }));
    }
  }

  render() {
    const currentDef = this.stages.find(s => s.key === this.currentStage);
    
    return html`
      <section class="wrap">
        <div class="stages">
          ${this.stages.map((stage) => {
            const isCurrent = this.isCurrent(stage.key);
            const isCompleted = this.isCompleted(stage.key);
            const canPreview = this.canPreviewStage(stage.key);
            
            return html`
              <article 
                class="stage ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''} ${canPreview && !isCurrent ? 'previewable' : ''}"
                @click=${() => this.selectStage(stage.key)}
              >
                <div class="stage-name">
                  <span class="stage-label">${stage.label}</span>
                  ${isCurrent
                    ? html`<span class="badge current">当前</span>`
                    : isCompleted
                      ? html`<span class="badge">已完成</span>`
                      : canPreview
                        ? html`<span class="badge preview">可预览</span>`
                        : ''}
                </div>
                <div class="stage-meta">${stage.description}</div>
                ${stage.agent ? html`<span class="agent-tag">${stage.agent}</span>` : ''}
              </article>
            `;
          })}
        </div>

        <div class="actions">
          <div class="current-stage-info">
            <span>当前阶段：</span>
            <strong>${currentDef?.label || this.currentStage}</strong>
            ${currentDef?.agent ? html`<span class="agent-tag">${currentDef.agent}</span>` : ''}
          </div>
          
          <div class="action-group">
            <button 
              ?disabled=${!this.canRollback} 
              @click=${this.rollbackStage}
              title="返回上一阶段"
            >
              ← 回滚
            </button>
            
            <button 
              class="secondary"
              @click=${this.previewStage}
              title="预览当前阶段内容（不推进）"
            >
              👁 预览
            </button>
            
            <button 
              class="primary"
              ?disabled=${!this.canAdvance} 
              @click=${this.advanceStage}
              title="正式推进到下一阶段"
            >
              推进 →
            </button>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stage-navigator': StageNavigator;
  }
}
