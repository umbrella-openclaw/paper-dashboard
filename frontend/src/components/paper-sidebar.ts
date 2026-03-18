import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Folder, Tag } from '../utils/api.js';

@customElement('paper-sidebar')
export class PaperSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    
    .sidebar {
      padding: var(--space-4);
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
      margin-bottom: var(--space-6);
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .nav-item:hover {
      background: var(--color-bg);
      color: var(--color-text-primary);
    }
    
    .nav-item.active {
      background: var(--color-accent-light);
      color: var(--color-accent);
      font-weight: 500;
    }
    
    .nav-item .icon {
      width: 18px;
      height: 18px;
      opacity: 0.7;
    }
    
    .nav-item.active .icon {
      opacity: 1;
    }
    
    .tag {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-xl);
      font-size: var(--text-xs);
      font-weight: 500;
      margin: 0 var(--space-1) var(--space-1) 0;
    }
    
    .tag-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      padding: var(--space-2);
    }
  `;

  @property({ type: Array }) folders: Folder[] = [];
  @property({ type: Array }) tags: Tag[] = [];
  @property({ type: Number }) selectedFolderId: number | null = null;

  private selectFolder(id: number | null) {
    this.dispatchEvent(new CustomEvent('folder-select', { detail: id }));
  }

  render() {
    return html`
      <div class="sidebar">
        <div class="section">
          <h3>Folders</h3>
          <div class="nav-item ${this.selectedFolderId === null ? 'active' : ''}"
               @click=${() => this.selectFolder(null)}>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            All Papers
          </div>
          ${this.folders.map(folder => html`
            <div class="nav-item ${this.selectedFolderId === folder.id ? 'active' : ''}"
                 @click=${() => this.selectFolder(folder.id)}>
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              ${folder.name}
            </div>
          `)}
        </div>
        
        <div class="section">
          <h3>Tags</h3>
          <div class="tags-container">
            ${this.tags.map(tag => html`
              <span class="tag" style="background: ${tag.color}20;">
                <span class="tag-dot" style="background: ${tag.color};"></span>
                ${tag.name}
              </span>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
