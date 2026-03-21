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

export type WritingStage = 'CONFIG' | 'LITERATURE_REVIEW' | 'METHODS' | 'RESULTS' | 'DISCUSSION' | 'COMPLETED';

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
  `;

  @state() private papers: Paper[] = [];
  @state() private folders: Folder[] = [];
  @state() private tags: Tag[] = [];
  @state() private stats: Stats = { total_papers: 0, total_folders: 0, total_tags: 0, papers_this_week: 0 };
  @state() private selectedFolderId: number | null = null;
  @state() private searchQuery = '';
  @state() private loading = true;
  @state() private showUploader = false;
  
  @state() private workflowActive = false;
  @state() private currentStage: WritingStage = 'CONFIG';
  @state() private completedStages: WritingStage[] = [];
  @state() private configReady = false;

  async connectedCallback() {
    super.connectedCallback();
    await this.loadData();
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
  
  private onCreatePaper() {
    this.workflowActive = true;
    this.currentStage = 'CONFIG';
    this.completedStages = [];
    this.configReady = false;
  }
  
  private onConfigReadyChange(e: CustomEvent<boolean>) {
    this.configReady = e.detail;
  }
  
  private advanceStage() {
    if (!this.configReady && this.currentStage === 'CONFIG') {
      alert('请先完成配置阶段的选题确认');
      return;
    }
    
    const stages: WritingStage[] = ['CONFIG', 'LITERATURE_REVIEW', 'METHODS', 'RESULTS', 'DISCUSSION', 'COMPLETED'];
    const currentIndex = stages.indexOf(this.currentStage);
    
    if (currentIndex < stages.length - 1) {
      if (!this.completedStages.includes(this.currentStage)) {
        this.completedStages = [...this.completedStages, this.currentStage];
      }
      this.currentStage = stages[currentIndex + 1];
      this.configReady = false;
    }
  }
  
  private rollbackStage() {
    const stages: WritingStage[] = ['CONFIG', 'LITERATURE_REVIEW', 'METHODS', 'RESULTS', 'DISCUSSION', 'COMPLETED'];
    const currentIndex = stages.indexOf(this.currentStage);
    
    if (currentIndex > 0) {
      this.currentStage = stages[currentIndex - 1];
      this.completedStages = this.completedStages.filter(s => stages.indexOf(s) < currentIndex - 1);
      this.configReady = true;
    }
  }
  
  private canAdvance(): boolean {
    if (this.currentStage === 'CONFIG') {
      return this.configReady;
    }
    return true;
  }
  
  private canRollback(): boolean {
    return this.currentStage !== 'CONFIG';
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
            ${this.currentStage === 'CONFIG' ? html`
              <config-stage
                @config-ready-change=${this.onConfigReadyChange}
              ></config-stage>
            ` : html`
              <div class="empty-state">
                <h2>${this.currentStage} 阶段</h2>
                <p>该阶段开发中...</p>
              </div>
            `}
          </main>
        ` : html`
          <div class="stage-bar" style="background: var(--color-surface);">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: var(--text-sm); color: var(--color-text-tertiary);">
                当前没有进行中的论文写作任务
              </span>
              <button 
                @click=${this.onCreatePaper}
                style="padding: var(--space-2) var(--space-4); background: var(--color-accent); border: none; border-radius: var(--radius-md); color: white; font-size: var(--text-sm); font-weight: 600; cursor: pointer;"
              >
                创建新论文
              </button>
            </div>
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
