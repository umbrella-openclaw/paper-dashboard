import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { api, Paper, Folder, Tag, Stats } from '../utils/api.js';
import './paper-header.ts';
import './paper-sidebar.ts';
import './paper-grid.ts';
import './paper-uploader.ts';
import './stat-card.ts';
import './search-bar.ts';

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
      grid-template-rows: 64px 1fr;
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
    
    .stats-bar {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);
      padding: var(--space-4) var(--space-6);
      background: var(--color-bg);
      border-bottom: 1px solid var(--color-border-light);
    }
    
    @media (max-width: 1024px) {
      .stats-bar {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 640px) {
      .stats-bar {
        grid-template-columns: 1fr;
      }
    }
    
    aside {
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
  `;

  @state() private papers: Paper[] = [];
  @state() private folders: Folder[] = [];
  @state() private tags: Tag[] = [];
  @state() private stats: Stats = { total_papers: 0, total_folders: 0, total_tags: 0, papers_this_week: 0 };
  @state() private selectedFolderId: number | null = null;
  @state() private searchQuery = '';
  @state() private loading = true;
  @state() private showUploader = false;

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

  render() {
    return html`
      <div class="layout">
        <header>
          <paper-header
            @search=${this.onSearch}
            @upload=${() => this.showUploader = true}
          ></paper-header>
        </header>
        
        <div class="stats-bar">
          <stat-card label="Total Papers" .value=${this.stats.total_papers} icon="file-text"></stat-card>
          <stat-card label="This Week" .value=${this.stats.papers_this_week} icon="calendar"></stat-card>
          <stat-card label="Folders" .value=${this.stats.total_folders} icon="folder"></stat-card>
          <stat-card label="Tags" .value=${this.stats.total_tags} icon="tag"></stat-card>
        </div>
        
        <aside>
          <paper-sidebar
            .folders=${this.folders}
            .tags=${this.tags}
            .selectedFolderId=${this.selectedFolderId}
            @folder-select=${this.onFolderSelect}
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
