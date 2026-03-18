import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Paper } from '../utils/api.js';
import './paper-card.ts';

@customElement('paper-grid')
export class PaperGrid extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--space-6);
    }
    
    /* Anti-3-column-bias: asymmetric sizing */
    .grid > :nth-child(3n+1) {
      grid-column: span 1;
    }
  `;

  @property({ type: Array }) papers: Paper[] = [];

  render() {
    return html`
      <div class="grid">
        ${this.papers.map(paper => html`
          <paper-card .paper=${paper} @delete=${() => this.dispatchEvent(new CustomEvent('delete'))}></paper-card>
        `)}
      </div>
    `;
  }
}
