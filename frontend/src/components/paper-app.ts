import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { api, Paper, Folder, Tag, Stats } from '../utils/api.js';
import './paper-header.ts';
import './paper-sidebar.ts';
import './paper-grid.ts';
import './paper-uploader.ts';
import './stat-card.ts';
import './stage-navigator.ts';
import './config-stage.ts';
import './literature-stage.ts';
import './outline-stage.ts';
import './data-requirements-stage.ts';
import './drafting-stage.ts';
import './polishing-stage.ts';
import './review-stage.ts';
import './finalize-stage.ts';

export type WritingStage = 'INTAKE' | 'LITERATURE' | 'OUTLINE' | 'DATA_REQUIREMENTS' | 'DRAFTING' | 'POLISHING' | 'REVIEW' | 'FINALIZE';

const STAGES: WritingStage[] = ['INTAKE', 'LITERATURE', 'OUTLINE', 'DATA_REQUIREMENTS', 'DRAFTING', 'POLISHING', 'REVIEW', 'FINALIZE'];

@customElement('paper-app')
export class PaperApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100dvh;
      background: var(--color-bg);
    }
    
    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      grid-template-rows: 64px auto 1fr;
      min-height: 100dvh;
    }
    
    @media (max-width: 768px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
    
    header {
      grid-column: 1 / -1;
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(250, 250, 250, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-border);
    }
    
    .stage-bar {
      grid-column: 1 / -1;
      padding: var(--space-4) var(--space-6);
      background: var(--color-bg);
      border-bottom: 1px solid var(--color-border-light);
    }
    
    aside {
      grid-row: 3;
      border-right: 1px solid var(--color-border);
      overflow-y: auto;
      background: var(--color-surface);
    }
    
    main {
      padding: var(--space-6);
      overflow-y: auto;
    }
    
    .empty-state {
      text-align: center;
      padding: var(--space-12);
      color: var(--color-text-tertiary);
    }
    
    .empty-state h2 {
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
    }
    
    .workflow-active {
      padding: var(--space-6);
    }

    .preview-banner {
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: var(--radius-lg);
      padding: var(--space-3) var(--space-4);
      margin-bottom: var(--space-4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--text-sm);
      color: #92400e;
    }

    .preview-banner strong {
      color: #78350f;
    }

    .preview-banner button {
      background: #f59e0b;
      border: none;
      color: white;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
      font-weight: 600;
      cursor: pointer;
    }

    .preview-banner button:hover {
      background: #d97706;
    }
  `;

  @state() private papers: Paper[] = [];
  @state() private folders: Folder[] = [];
  @state() private tags: Tag[] = [];
  @state() private stats: Stats = { total_papers: 0, total_folders: 0, total_tags: 0, papers_this_week: 0 };
  @state() private selectedFolderId: number | null = null;
  @state() private searchQuery = '';
  @state() private loading = true;
  @state() private showUploader = false;
  
  // Paper writing workflow state
  @state() private workflowActive = false;
  @state() private currentStage: WritingStage = 'INTAKE';
  @state() private completedStages: WritingStage[] = [];
  @state() private configReady = false;
  @state() private previewMode = false;
  @state() private previewStage: WritingStage | null = null;

  async connectedCallback() {
    super.connectedCallback();
    await this.loadData();
    this.checkExistingWorkflow();
  }
  // Check for existing workflow task or show empty state for new task
  private async checkExistingWorkflow() {
    const savedTaskId = localStorage.getItem('paper-dashboard-workflow-task-id');
    // Always show the workflow UI at INTAKE stage
    // If there's a saved task, config-stage will restore it
    // If not, user can create a new task
    this.workflowActive = true;
    this.currentStage = 'INTAKE';
    this.completedStages = [];
    this.configReady = false;
  }

  private onTaskLoaded(e: CustomEvent) {
    const { taskId, status } = e.detail;
    console.log('[PaperApp] Task loaded from storage:', taskId, status);
    // Activate the workflow since a valid task was restored
    this.workflowActive = true;
    this.currentStage = 'INTAKE';
    // If the task already has a confirmed topic, mark config as ready
    if (status?.stage_status === 'waiting_confirm' || status?.stage_status === 'completed') {
      this.configReady = true;
      this.completedStages = ['INTAKE'];
    }
  }


  async loadData() {
    this.loading = true;
    try {
      const [folders, tags, stats] = await Promise.all([
        api.listFolders(),
        api.listTags(),
        api.getStats(),
      ]);
      this.folders = folders;
      this.tags = tags;
      this.stats = stats;
      await this.loadPapers();
    } catch (e) {
      console.error('Failed to load data:', e);
    } finally {
      this.loading = false;
    }
  }

  async loadPapers() {
    try {
      const res = await api.listPapers({
        folder_id: this.selectedFolderId ?? undefined,
        search: this.searchQuery || undefined,
      });
      this.papers = res.papers || [];
    } catch (e) {
      console.error('Failed to load papers:', e);
    }
  }

  private onSearch(e: CustomEvent<string>) {
    this.searchQuery = e.detail;
    this.loadPapers();
  }

  private onFolderSelect(e: CustomEvent<number | null>) {
    this.selectedFolderId = e.detail;
    this.loadPapers();
  }

  private async onUpload() {
    this.showUploader = false;
    await this.loadData();
  }

  private async onDeletePaper() {
    await this.loadPapers();
    this.stats = await api.getStats();
  }
  
  // Workflow handlers
  private onCreatePaper() {
    // Clear any saved task so config-stage creates a fresh one
    localStorage.removeItem('paper-dashboard-workflow-task-id');
    localStorage.removeItem('paper-dashboard-task-id');
    
    this.workflowActive = true;
    this.currentStage = 'INTAKE';
    this.completedStages = [];
    this.configReady = false;
    this.previewMode = false;
    this.previewStage = null;
  }
  
  private onConfigReadyChange(e: CustomEvent<boolean>) {
    this.configReady = e.detail;
  }

  private onTopicConfirmed(e: CustomEvent) {
    const { topic, taskId } = e.detail;
    console.log('[PaperApp] Topic confirmed:', topic, 'taskId:', taskId);
    // Advance to the next stage after topic confirmation
    this.advanceStage();
  }

  private onLiteratureConfirmed(e: CustomEvent) {
    console.log('[PaperApp] Literature confirmed');
    this.advanceStage();
  }

  private onOutlineConfirmed(e: CustomEvent) {
    console.log('[PaperApp] Outline confirmed');
    this.advanceStage();
  }

  private onRequirementsConfirmed(e: CustomEvent) {
    console.log('[PaperApp] Requirements confirmed');
    this.advanceStage();
  }

  private onDraftingConfirmed(e: CustomEvent) {
    console.log('[PaperApp] Drafting confirmed');
    this.advanceStage();
  }

  private onPolishingConfirmed(e: CustomEvent) {
    console.log('[PaperApp] Polishing confirmed');
    this.advanceStage();
  }

  private onReviewPassed(e: CustomEvent) {
    console.log('[PaperApp] Review passed');
    this.advanceStage();
  }

  private onReviewFailed(e: CustomEvent) {
    console.log('[PaperApp] Review failed, returning to polishing');
    // Go back to previous stage
    this.rollbackStage();
  }

  private onSubmissionComplete(e: CustomEvent) {
    console.log('[PaperApp] Submission complete:', e.detail);
    // Show completion message
    alert('🎉 论文已提交！');
  }
  
  private advanceStage() {
    if (!this.configReady && this.currentStage === 'INTAKE') {
      alert('请先完成 Intake 阶段的选题确认');
      return;
    }
    
    const currentIndex = STAGES.indexOf(this.currentStage);
    
    if (currentIndex < STAGES.length - 1) {
      if (!this.completedStages.includes(this.currentStage)) {
        this.completedStages = [...this.completedStages, this.currentStage];
      }
      this.currentStage = STAGES[currentIndex + 1];
      this.configReady = false;
      this.previewMode = false;
      this.previewStage = null;
    }
  }
  
  private rollbackStage() {
    const currentIndex = STAGES.indexOf(this.currentStage);
    
    if (currentIndex > 0) {
      this.currentStage = STAGES[currentIndex - 1];
      this.completedStages = this.completedStages.filter(s => STAGES.indexOf(s) < currentIndex - 1);
      this.configReady = true;
      this.previewMode = false;
      this.previewStage = null;
    }
  }

  private onPreviewStage() {
    this.previewMode = true;
    this.previewStage = this.currentStage;
  }

  private closePreview() {
    this.previewMode = false;
    this.previewStage = null;
  }

  private selectStage(e: CustomEvent<WritingStage>) {
    const stage = e.detail;
    if (stage === this.currentStage) {
      this.previewMode = false;
      this.previewStage = null;
    } else {
      this.previewMode = true;
      this.previewStage = stage;
    }
  }
  
  private canAdvance(): boolean {
    if (this.currentStage === 'INTAKE') {
      return this.configReady;
    }
    return true;
  }
  
  private canRollback(): boolean {
    return this.currentStage !== 'INTAKE';
  }

  private getStageDisplayName(stage: WritingStage): string {
    const names: Record<WritingStage, string> = {
      'INTAKE': 'Intake - 校验输入',
      'LITERATURE': 'Literature - 文献检索',
      'OUTLINE': 'Outline - 确定结构',
      'DATA_REQUIREMENTS': 'Data Req. - 算例需求',
      'DRAFTING': 'Drafting - 章节草稿',
      'POLISHING': 'Polishing - PoF润色',
      'REVIEW': 'Review - 质量门禁',
      'FINALIZE': 'Finalize - 投稿封装'
    };
    return names[stage] || stage;
  }

  private renderStageContent(stage: WritingStage) {
    if (stage === 'INTAKE') {
      return html`
        <config-stage
          @config-ready-change=${this.onConfigReadyChange}
          @topic-confirmed=${this.onTopicConfirmed}
          @task-loaded=${this.onTaskLoaded}
        ></config-stage>
      `;
    }
    
    if (stage === 'LITERATURE') {
      return html`
        <literature-stage
          @literature-confirmed=${this.onLiteratureConfirmed}
        ></literature-stage>
      `;
    }
    
    if (stage === 'OUTLINE') {
      return html`
        <outline-stage
          @outline-confirmed=${this.onOutlineConfirmed}
        ></outline-stage>
      `;
    }
    
    if (stage === 'DATA_REQUIREMENTS') {
      return html`
        <data-requirements-stage
          @requirements-confirmed=${this.onRequirementsConfirmed}
        ></data-requirements-stage>
      `;
    }
    
    if (stage === 'DRAFTING') {
      return html`
        <drafting-stage
          @drafting-confirmed=${this.onDraftingConfirmed}
        ></drafting-stage>
      `;
    }
    
    if (stage === 'POLISHING') {
      return html`
        <polishing-stage
          @polishing-confirmed=${this.onPolishingConfirmed}
        ></polishing-stage>
      `;
    }
    
    if (stage === 'REVIEW') {
      return html`
        <review-stage
          @review-passed=${this.onReviewPassed}
          @review-failed=${this.onReviewFailed}
        ></review-stage>
      `;
    }
    
    if (stage === 'FINALIZE') {
      return html`
        <finalize-stage
          @submission-complete=${this.onSubmissionComplete}
        ></finalize-stage>
      `;
    }
    
    return html`
      <div class="empty-state">
        <h2>${this.getStageDisplayName(stage)}</h2>
        <p>Stage not found</p>
      </div>
    `;
  }

  private getStageAgent(stage: WritingStage): string {
    const agents: Record<WritingStage, string> = {
      'INTAKE': 'Orchestrator',
      'LITERATURE': 'Agent A (学术架构师)',
      'OUTLINE': 'Agent A (学术架构师)',
      'DATA_REQUIREMENTS': 'Agent B (物理-数据映射师)',
      'DRAFTING': 'Agent C (PoF执笔人)',
      'POLISHING': 'Agent C (PoF润色人)',
      'REVIEW': 'Orchestrator',
      'FINALIZE': 'Orchestrator'
    };
    return agents[stage] || 'TBD';
  }

  render() {
    return html`
      <div class="layout">
        <header>
          <paper-header
            @search=${this.onSearch}
            @upload=${() => this.showUploader = true}
          ></paper-header>
        </header>
        
        ${this.workflowActive ? html`
          <div class="stage-bar">
            <stage-navigator
              .currentStage=${this.currentStage}
              .completedStages=${this.completedStages}
              .canAdvance=${this.canAdvance()}
              .canRollback=${this.canRollback()}
              @advance-stage=${this.advanceStage}
              @rollback-stage=${this.rollbackStage}
              @preview-stage=${this.onPreviewStage}
              @select-stage=${this.selectStage}
            ></stage-navigator>
          </div>
          
          <aside>
            <paper-sidebar
              .folders=${this.folders}
              .tags=${this.tags}
              .selectedFolderId=${this.selectedFolderId}
              @folder-select=${this.onFolderSelect}
              @create-paper=${this.onCreatePaper}
            ></paper-sidebar>
          </aside>
          
          <main class="workflow-active">
            ${this.previewMode && this.previewStage ? html`
              <div class="preview-banner">
                <span>👁 预览模式 - 正在查看：<strong>${this.getStageDisplayName(this.previewStage)}</strong></span>
                <button @click=${this.closePreview}>退出预览</button>
              </div>
              ${this.renderStageContent(this.previewStage)}
            ` : html`
              ${this.renderStageContent(this.currentStage)}
            `}
          </main>
        ` : html`
          <div class="stage-bar" style="background: var(--color-surface);">
            <span style="font-size: var(--text-sm); color: var(--color-text-tertiary);">
              当前没有进行中的论文写作任务
            </span>
          </div>
          
          <aside>
            <paper-sidebar
              .folders=${this.folders}
              .tags=${this.tags}
              .selectedFolderId=${this.selectedFolderId}
              @folder-select=${this.onFolderSelect}
              @create-paper=${this.onCreatePaper}
            ></paper-sidebar>
          </aside>
          
          <main>
            ${this.loading
              ? html`<div class="empty-state"><p>Loading...</p></div>`
              : this.papers.length === 0
                ? html`
                    <div class="empty-state">
                      <h2>No papers yet</h2>
                      <p>Upload your first paper to get started</p>
                    </div>
                  `
                : html`<paper-grid .papers=${this.papers} @delete=${this.onDeletePaper}></paper-grid>`
            }
          </main>
        `}
      </div>
      
      ${this.showUploader ? html`
        <paper-uploader
          .folders=${this.folders}
          @close=${() => this.showUploader = false}
          @upload=${this.onUpload}
        ></paper-uploader>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'paper-app': PaperApp;
  }
}
