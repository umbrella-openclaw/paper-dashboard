import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { WritingStage } from './paper-app.js';

interface StageDef {
  key: WritingStage;
  label: string;
  description: string;
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
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    .stage {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: var(--color-bg);
      transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
    }

    .stage.current {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
      transform: translateY(-1px);
    }

    .stage.completed {
      border-color: #34d399;
      background: #ecfdf5;
    }

    .stage-name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 2px;
    }

    .stage-meta {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
    }

    .badge {
      font-size: 10px;
      border-radius: 999px;
      padding: 2px 8px;
      background: #d1fae5;
      color: #047857;
      font-weight: 700;
    }

    .badge.current {
      background: var(--color-accent);
      color: #fff;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-3);
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
      transition: transform var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
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

    button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }

    @media (max-width: 1100px) {
      .stages {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 700px) {
      .stages {
        grid-template-columns: 1fr;
      }

      .actions {
        justify-content: stretch;
      }

      .actions button {
        flex: 1;
      }
    }
  `;

  @property({ type: String }) currentStage!: WritingStage;
  @property({ type: Array }) completedStages: WritingStage[] = [];
  @property({ type: Boolean }) canAdvance = true;
  @property({ type: Boolean }) canRollback = true;

  private get stages(): StageDef[] {
    return [
      { key: 'CONFIG', label: '配置阶段', description: '参考论文与选题' },
      { key: 'LITERATURE_REVIEW', label: '文献综述', description: '综述脉络与研究缺口' },
      { key: 'METHODS', label: '方法', description: '方法设计与实验方案' },
      { key: 'RESULTS', label: '结果', description: '结果整理与可视化' },
      { key: 'DISCUSSION', label: '讨论', description: '解释与局限性' },
      { key: 'COMPLETED', label: '完稿', description: '终稿检查与提交' },
    ];
  }

  private isCompleted(stage: WritingStage) {
    return this.completedStages.includes(stage);
  }

  private advance() {
    this.dispatchEvent(new CustomEvent('advance-stage'));
  }

  private rollback() {
    this.dispatchEvent(new CustomEvent('rollback-stage'));
  }

  render() {
    return html`
      <section class="wrap">
        <div class="stages">
          ${this.stages.map((stage) => {
            const isCurrent = stage.key === this.currentStage;
            const isCompleted = this.isCompleted(stage.key);
            return html`
              <article class="stage ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}">
                <div class="stage-name">
                  <span>${stage.label}</span>
                  ${isCurrent
                    ? html`<span class="badge current">当前</span>`
                    : isCompleted
                      ? html`<span class="badge">已完成</span>`
                      : ''}
                </div>
                <p class="stage-meta">${stage.description}</p>
              </article>
            `;
          })}
        </div>

        <div class="actions">
          <button ?disabled=${!this.canRollback} @click=${this.rollback}>回滚</button>
          <button class="primary" ?disabled=${!this.canAdvance} @click=${this.advance}>推进</button>
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
