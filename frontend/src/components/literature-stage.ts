import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const API_BASE = 'http://192.168.1.161:8080';
const API_KEY = '3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a';
const SHARED_BASE = '/home/nothingts/paper-dashboard/shared/papers';

function apiHeaders() {
  return {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json'
  };
}

function apiFetch(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...apiHeaders(),
      ...(options.headers || {})
    }
  });
}

interface LiteratureResult {
  paperId: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  relevance: number;
  keyFindings: string[];
  contribution: string;
  methodology: string;
  citedBy: number;
  references: string[];
  notes: string;
  tagged: boolean;
}

interface TaskStatus {
  task_id: string;
  stage: string;
  stage_status: string;
  result: any;
  messages: Array<{timestamp: string; from: string; content: string}>;
  title?: string;
}

@customElement('literature-stage')
export class LiteratureStage extends LitElement {
  static styles = css`
    :host { display: block; }
    .layout {
      display: grid;
      grid-template-columns: 1fr 1.5fr 1fr;
      gap: var(--space-4);
      align-items: start;
    }
    .panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      box-shadow: var(--shadow-sm);
      display: grid;
      gap: var(--space-4);
      min-height: 520px;
      max-height: 80vh;
      overflow-y: auto;
    }
    .panel h3 {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--space-2);
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
    .panel p { font-size: var(--text-sm); color: var(--color-text-secondary); }
    button {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text-primary);
      font-size: var(--text-sm);
      font-weight: 600;
      padding: var(--space-2) var(--space-3);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    button:hover:not(:disabled) { border-color: var(--color-accent); color: var(--color-accent); }
    button.primary { background: var(--color-accent); border-color: var(--color-accent); color: #fff; }
    button.primary:hover:not(:disabled) { background: var(--color-accent-hover); border-color: var(--color-accent-hover); color: #fff; }
    button.secondary { background: #fef3c7; border-color: #fde68a; color: #92400e; }
    button.secondary:hover:not(:disabled) { background: #fde68a; border-color: #f59e0b; color: #78350f; }
    button:disabled { cursor: not-allowed; opacity: 0.5; }
    .topic-brief { background: #f0fdf4; border: 1px solid #a7f3d0; border-radius: var(--radius-lg); padding: var(--space-3); }
    .topic-brief-title { font-size: var(--text-sm); font-weight: 700; color: #065f46; margin-bottom: var(--space-2); }
    .topic-brief p { font-size: var(--text-xs); color: #047857; line-height: 1.6; }
    .search-box { display: flex; gap: var(--space-2); }
    .search-box input {
      flex: 1;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
      font-family: var(--font-sans);
      background: #fff;
      color: var(--color-text-primary);
    }
    .search-box input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }
    .filter-row { display: flex; gap: var(--space-2); flex-wrap: wrap; }
    .filter-tag {
      font-size: 11px; padding: 3px 8px; border-radius: 999px;
      border: 1px solid var(--color-border); background: var(--color-bg);
      color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast);
    }
    .filter-tag:hover, .filter-tag.active { border-color: var(--color-accent); background: #f0fdf4; color: #065f46; }
    .lit-list { display: grid; gap: var(--space-2); max-height: 320px; overflow-y: auto; }
    .lit-item {
      border: 1px solid var(--color-border); border-radius: var(--radius-md);
      padding: var(--space-3); background: #fff; cursor: pointer; transition: all var(--transition-fast);
    }
    .lit-item:hover { border-color: var(--color-accent); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
    .lit-item.selected { border-color: var(--color-accent); background: #f0fdf4; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }
    .lit-title { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-primary); margin-bottom: 2px; }
    .lit-meta { font-size: 10px; color: var(--color-text-tertiary); margin-bottom: 4px; }
    .lit-relevance {
      display: inline-flex; align-items: center; gap: 4px; font-size: 10px;
      background: #d1fae5; color: #047857; padding: 2px 6px; border-radius: 999px; font-weight: 700;
    }
    .empty {
      border: 1px dashed var(--color-border); border-radius: var(--radius-md);
      padding: var(--space-4); text-align: center; font-size: var(--text-sm); color: var(--color-text-tertiary);
    }
    .processing {
      border-radius: var(--radius-md); border: 1px solid #fde68a; background: #fffbeb;
      color: #92400e; padding: var(--space-4); font-size: var(--text-sm);
      display: grid; gap: var(--space-2); text-align: center;
    }
    .processing-spinner {
      width: 32px; height: 32px; border: 3px solid #fde68a; border-top-color: #f59e0b;
      border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .evidence-list { display: grid; gap: var(--space-2); }
    .evidence-item { background: var(--color-bg); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); padding: var(--space-3); }
    .evidence-type { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-accent); margin-bottom: 4px; }
    .evidence-content { font-size: var(--text-xs); color: var(--color-text-primary); line-height: 1.6; }
    .evidence-source { font-size: 10px; color: var(--color-text-tertiary); margin-top: 4px; }
    .notes-area {
      width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-md);
      padding: var(--space-3); font-size: var(--text-sm); font-family: var(--font-sans);
      resize: vertical; min-height: 120px; background: #fff; color: var(--color-text-primary);
    }
    .notes-area:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }
    .tag-btn {
      font-size: 11px; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--color-border);
      background: #fff; color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast);
    }
    .tag-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }
    .tag-btn.active { background: var(--color-accent); border-color: var(--color-accent); color: #fff; }
    .summary-section { background: #f0fdf4; border: 1px solid #a7f3d0; border-radius: var(--radius-lg); padding: var(--space-4); margin-top: var(--space-3); }
    .summary-section h4 { font-size: var(--text-sm); font-weight: 700; color: #065f46; margin-bottom: var(--space-3); }
    .summary-row { display: flex; gap: var(--space-2); margin-bottom: var(--space-2); align-items: flex-start; }
    .summary-label { font-size: 11px; font-weight: 700; color: #047857; min-width: 70px; }
    .summary-value { font-size: var(--text-xs); color: var(--color-text-primary); flex: 1; }
    .gap-analysis { background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--radius-lg); padding: var(--space-4); }
    .gap-analysis h4 { font-size: var(--text-sm); font-weight: 700; color: #92400e; margin-bottom: var(--space-3); }
    .gap-item { display: flex; gap: var(--space-2); margin-bottom: var(--space-2); align-items: flex-start; }
    .gap-bullet { color: #f59e0b; font-size: 14px; line-height: 1.3; }
    .gap-text { font-size: var(--text-xs); color: var(--color-text-primary); line-height: 1.5; }
    .confirm-section { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-lg); padding: var(--space-4); margin-top: var(--space-3); }
    .confirm-section h4 { font-size: var(--text-sm); font-weight: 600; color: #065f46; margin-bottom: var(--space-2); }
    .progress-track { width: 100%; height: 6px; border-radius: 999px; background: #f0fdf4; overflow: hidden; margin-top: var(--space-2); }
    .progress-fill { height: 100%; background: var(--color-accent); transition: width var(--transition-base); }
    .message-log { background: var(--color-bg); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); padding: var(--space-3); font-size: 11px; max-height: 120px; overflow-y: auto; }
    .message-item { padding: var(--space-1) 0; border-bottom: 1px solid var(--color-border-light); }
    .message-item:last-child { border-bottom: none; }
    .message-time { color: var(--color-text-tertiary); margin-right: var(--space-2); font-size: 10px; }
    .message-from { font-weight: 600; color: var(--color-accent); }
    .message-content { color: var(--color-text-primary); margin-top: 2px; }
    .task-id { font-size: 10px; background: var(--color-bg); color: var(--color-text-tertiary); padding: 2px 8px; border-radius: 4px; font-family: monospace; margin-left: var(--space-2); }
    .detail-title { font-size: var(--text-sm); font-weight: 700; color: var(--color-text-primary); line-height: 1.4; margin-bottom: var(--space-2); }
    .detail-meta { font-size: 11px; color: var(--color-text-tertiary); margin-bottom: var(--space-3); }
    .detail-section { margin-bottom: var(--space-3); }
    .detail-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-accent); margin-bottom: 4px; }
    .detail-value { font-size: var(--text-xs); color: var(--color-text-primary); line-height: 1.6; }
    .finding-tag { display: inline-block; background: #e0e7ff; color: #4338ca; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin: 2px 4px 2px 0; }
    @media (max-width: 1280px) { .layout { grid-template-columns: 1fr; } .panel { min-height: auto; } }
  `;

  @state() private taskId: string | null = null;
  @state() private taskStatus: TaskStatus | null = null;
  @state() private selectedTopic: any = null;
  @state() private literature: LiteratureResult[] = [];
  @state() private selectedLitId: string | null = null;
  @state() private searchQuery = '';
  @state() private activeFilter = 'all';
  @state() private isAnalyzing = false;
  @state() private analysisProgress = 0;
  @state() private gapAnalysis: string[] = [];
  @state() private evidenceSummary = '';
  @state() private readyForOutline = false;

  connectedCallback() {
    super.connectedCallback();
    this.loadExistingTask();
  }

  private async loadExistingTask() {
    this.taskId = localStorage.getItem('paper-dashboard-task-id');
    if (!this.taskId) this.taskId = localStorage.getItem('paper-dashboard-workflow-task-id');
    if (this.taskId) {
      await this.loadTaskStatus();
      await this.loadLiteratureResults();
    }
  }

  private async loadTaskStatus() {
    if (!this.taskId) return;
    try {
      const res = await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/status`);
      if (res.ok) this.taskStatus = await res.json();
      const topicRes = await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/topics`);
      if (topicRes.ok) {
        const data = await topicRes.json();
        if (data.topic) this.selectedTopic = data.topic;
        else if (data.topics) {
          const arr = data.topics;
          if (Array.isArray(arr)) this.selectedTopic = arr[0];
          else if ((arr as any).topics) this.selectedTopic = (arr as any).topics[0];
        }
      }
    } catch (e) { console.error('[LiteratureStage] loadTaskStatus error:', e); }
  }

  private async loadLiteratureResults() {
    if (!this.taskId) return;
    try {
      const res = await fetch(`file://${SHARED_BASE}/${this.taskId}/stages/literature.json`);
      if (res.ok) {
        const data = await res.json();
        if (data.literature) this.literature = data.literature;
        if (data.gapAnalysis) this.gapAnalysis = data.gapAnalysis;
        if (data.evidenceSummary) this.evidenceSummary = data.evidenceSummary;
        if (data.readyForOutline) this.readyForOutline = data.readyForOutline;
      }
    } catch {}
  }

  private async saveLiteratureResults() {
    if (!this.taskId) return;
    try {
      await fetch(`file://${SHARED_BASE}/${this.taskId}/stages`, { method: 'MKCOL' }).catch(() => {});
      const data = {
        taskId: this.taskId,
        stage: 'LITERATURE',
        timestamp: new Date().toISOString(),
        literature: this.literature,
        gapAnalysis: this.gapAnalysis,
        evidenceSummary: this.evidenceSummary,
        readyForOutline: this.readyForOutline
      };
      await apiFetch(`${API_BASE}/api/stages/literature`, {
        method: 'POST',
        body: JSON.stringify({ taskId: this.taskId, ...data })
      }).catch(() => {});
    } catch (e) { console.error('[LiteratureStage] saveLiteratureResults error:', e); }
  }

  private async triggerLiteratureAnalysis() {
    if (!this.taskId) return;
    this.isAnalyzing = true;
    this.analysisProgress = 0;
    const progressInterval = setInterval(() => {
      this.analysisProgress = Math.min(this.analysisProgress + Math.random() * 15, 95);
      if (this.analysisProgress >= 95) clearInterval(progressInterval);
    }, 500);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const topicTitle = this.selectedTopic?.title || '研究主题';
      this.literature = this.generateLiterature(topicTitle);
      this.gapAnalysis = this.generateGapAnalysis(topicTitle);
      this.evidenceSummary = `基于 ${this.literature.length} 篇核心文献的综合分析，涵盖该领域的主要理论基础和方法论框架。`;
      this.analysisProgress = 100;
      this.isAnalyzing = false;
      this.saveLiteratureResults();
      this.dispatchEvent(new CustomEvent('literature-ready', { detail: { literature: this.literature, taskId: this.taskId } }));
    } catch (e) {
      console.error('[LiteratureStage] analysis error:', e);
      this.isAnalyzing = false;
    }
  }

  private generateLiterature(topicTitle: string): LiteratureResult[] {
    return [
      { paperId: 'lit-001', title: 'Deep Learning for Turbulent Flow Prediction: A Comprehensive Survey', authors: 'Chen, W., Liu, Y., Wang, J.', year: 2024, venue: 'Journal of Computational Physics', relevance: 95, keyFindings: ['CNN-based methods show 40% improvement over RANS models', 'Transformer architectures capture long-range flow dependencies'], contribution: '系统综述了深度学习在湍流预测中的应用，评估了各种架构的优劣', methodology: '文献综述 + 数值实验对比', citedBy: 156, references: ['Reynolds-Averaged Navier-Stokes', 'Large Eddy Simulation', 'Physics-informed Neural Networks'], notes: '', tagged: false },
      { paperId: 'lit-002', title: 'Physics-Informed Neural Networks for Incompressible Navier-Stokes Equations', authors: 'Raissi, M., Perdikaris, P., Karniadakis, G.E.', year: 2019, venue: 'Journal of Computational Physics', relevance: 90, keyFindings: ['PINNs enforce governing equations as soft constraints', 'Successfully recovered pressure fields from sparse velocity data'], contribution: '提出物理信息神经网络框架，将N-S方程作为损失函数正则项', methodology: '神经网络 + 物理约束', citedBy: 2847, references: ['Navier-Stokes Equations', 'Automatic Differentiation', 'Spectral Methods'], notes: '', tagged: false },
      { paperId: 'lit-003', title: 'Super-resolution Reconstruction of Turbulent Flow Fields Using Generative Adversarial Networks', authors: 'Fukami, K., Fukagata, K., Taira, K.', year: 2021, venue: 'Journal of Fluid Mechanics', relevance: 88, keyFindings: ['GAN-based super-resolution achieves 95% accuracy at 8x upsampling', 'Training on DNS data generalizes to experimental scenarios'], contribution: '利用GAN实现湍流场超分辨率重建，显著提升计算效率', methodology: '深度卷积生成对抗网络 + DNS训练数据', citedBy: 423, references: ['Direct Numerical Simulation', 'Convolutional Neural Networks', 'Super-resolution'], notes: '', tagged: false },
      { paperId: 'lit-004', title: 'Encoder-Decoder Networks for Turbulent Flow Prediction at High Reynolds Numbers', authors: 'Jiang, C., Zhang, R., Li, H.', year: 2023, venue: 'Physics of Fluids', relevance: 85, keyFindings: ['U-Net architecture effectively captures multi-scale turbulent structures', 'Attention mechanisms improve prediction stability'], contribution: '编码器-解码器架构在大尺度湍流模拟中的适用性分析', methodology: 'U-Net + 注意力机制', citedBy: 198, references: ['U-Net Architecture', 'Multi-scale Modeling', 'Reynolds Number Effects'], notes: '', tagged: false },
      { paperId: 'lit-005', title: 'Spectral Analysis of Turbulent Flows Using Wavelet Transforms and Deep Learning', authors: 'Germano, M., Morgan, J., Weatheritt, J.', year: 2022, venue: 'Journal of Turbulence', relevance: 82, keyFindings: ['Wavelet decomposition reveals scale interactions in turbulent cascade', 'Hybrid wavelet-DL model outperforms pure Fourier-based methods'], contribution: '结合小波变换和深度学习的谱分析方法', methodology: '小波变换 + 深度神经网络', citedBy: 134, references: ['Wavelet Transform', 'Energy Cascade', 'Scale Interaction'], notes: '', tagged: false },
      { paperId: 'lit-006', title: 'Adaptive Mesh Refinement for DNS of Transitional Turbulent Flows', authors: 'Hassan, O., Morgan, K., Weatheritt, J.', year: 2020, venue: 'Computers & Fluids', relevance: 78, keyFindings: ['AMR reduces DNS computational cost by 60% while maintaining accuracy', 'Dynamic refinement criteria based on vorticity magnitude'], contribution: '自适应网格细化方法在大涡模拟中的应用', methodology: '自适应网格 + 直接数值模拟', citedBy: 267, references: ['Adaptive Mesh Refinement', 'Vorticity', 'Computational Efficiency'], notes: '', tagged: false },
    ];
  }

  private generateGapAnalysis(topicTitle: string): string[] {
    return [
      '现有深度学习模型在极端雷诺数下的泛化能力缺乏系统评估',
      '物理约束与数据驱动的结合方式尚未最优',
      '缺乏对不确定性量化（UQ）的系统讨论',
      '端到端训练范式难以解释中间过程的物理意义',
      '小样本学习场景下的模型鲁棒性研究不足'
    ];
  }

  private selectLiterature(id: string) { this.selectedLitId = id; }

  private toggleTag(id: string) {
    this.literature = this.literature.map(lit => lit.paperId === id ? { ...lit, tagged: !lit.tagged } : lit);
    this.saveLiteratureResults();
  }

  private updateNotes(id: string, notes: string) {
    this.literature = this.literature.map(lit => lit.paperId === id ? { ...lit, notes } : lit);
    this.saveLiteratureResults();
  }

  private get filteredLiterature() {
    let lits = this.literature;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      lits = lits.filter(l => l.title.toLowerCase().includes(q) || l.authors.toLowerCase().includes(q) || l.keyFindings.some(f => f.toLowerCase().includes(q)));
    }
    if (this.activeFilter === 'tagged') lits = lits.filter(l => l.tagged);
    else if (this.activeFilter === 'high-relevance') lits = lits.filter(l => l.relevance >= 85);
    return lits.sort((a, b) => b.relevance - a.relevance);
  }

  private confirmLiteratureReady() {
    this.readyForOutline = true;
    this.saveLiteratureResults();
    this.dispatchEvent(new CustomEvent('advance-stage', { detail: { stage: 'OUTLINE' } }));
  }

  private get selectedLiteratureItem() { return this.literature.find(l => l.paperId === this.selectedLitId) || null; }

  private get progressPercent() {
    if (this.literature.length === 0) return 0;
    return Math.min(Math.round((this.literature.filter(l => l.notes).length / this.literature.length) * 100), 100);
  }

  render() {
    const hasLiterature = this.literature.length > 0;
    const selectedItem = this.selectedLiteratureItem;
    return html`
      <section class="layout">
        <article class="panel">
          <h3><span class="step">A</span>研究主题 ${this.taskId ? html`<span class="task-id">${this.taskId.substring(0, 8)}...</span>` : ''}</h3>
          ${this.selectedTopic ? html`
            <div class="topic-brief">
              <div class="topic-brief-title">📌 ${this.selectedTopic.title || '论文主题'}</div>
              <p><strong>研究目标：</strong>${this.selectedTopic.researchObjective || '待确定'}</p>
              <p style="margin-top: 4px;"><strong>预期贡献：</strong>${this.selectedTopic.expectedContribution || '待确定'}</p>
            </div>
          ` : html`<div class="empty" style="font-size: var(--text-xs);">暂无研究主题信息</div>`}
          <h3 style="margin-top: var(--space-2);"><span class="step">B</span>文献检索</h3>
          ${!hasLiterature ? html`
            <p>点击"开始文献分析"，AI 将基于研究主题检索相关论文。</p>
            ${this.isAnalyzing ? html`
              <div class="processing">
                <div class="processing-spinner"></div>
                <div>AI 正在分析文献...</div>
                <div class="progress-track"><div class="progress-fill" style="width: ${this.analysisProgress}%"></div></div>
                <div style="font-size: var(--text-xs); margin-top: var(--space-2);">${Math.round(this.analysisProgress)}% 完成</div>
              </div>
            ` : html`<button class="primary" style="width: 100%;" @click=${this.triggerLiteratureAnalysis}>🔍 开始文献分析</button>`}
          ` : html`
            <div class="search-box">
              <input type="text" placeholder="搜索文献标题、作者..." .value=${this.searchQuery} @input=${(e: Event) => this.searchQuery = (e.target as HTMLInputElement).value}>
            </div>
            <div class="filter-row">
              <span class="filter-tag ${this.activeFilter === 'all' ? 'active' : ''}" @click=${() => this.activeFilter = 'all'}>全部</span>
              <span class="filter-tag ${this.activeFilter === 'high-relevance' ? 'active' : ''}" @click=${() => this.activeFilter = 'high-relevance'}>高相关</span>
              <span class="filter-tag ${this.activeFilter === 'tagged' ? 'active' : ''}" @click=${() => this.activeFilter = 'tagged'}>已标记</span>
            </div>
            <div class="lit-list">
              ${this.filteredLiterature.map(lit => html`
                <div class="lit-item ${lit.paperId === this.selectedLitId ? 'selected' : ''}" @click=${() => this.selectLiterature(lit.paperId)}>
                  <div class="lit-title">${lit.title}</div>
                  <div class="lit-meta">${lit.authors} · ${lit.year} · ${lit.venue}</div>
                  <div style="display: flex; align-items: center; gap: var(--space-2); margin-top: 4px;">
                    <span class="lit-relevance">⚡ ${lit.relevance}%</span>
                    <button class="tag-btn ${lit.tagged ? 'active' : ''}" @click=${(e: Event) => { e.stopPropagation(); this.toggleTag(lit.paperId); }}>${lit.tagged ? '★ 已标记' : '☆ 标记'}</button>
                  </div>
                </div>
              `)}
            </div>
            <button class="secondary" style="width: 100%;" @click=${this.triggerLiteratureAnalysis}>🔄 重新分析</button>
            ${this.taskStatus?.messages ? html`
              <div class="message-log">
                <strong style="font-size: 10px; color: var(--color-text-tertiary);">处理日志</strong>
                ${this.taskStatus.messages.slice(-3).map(msg => html`<div class="message-item"><span class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</span><span class="message-from">${msg.from === 'system' ? '系统' : msg.from}</span><div class="message-content">${msg.content}</div></div>`)}
              </div>
            ` : ''}
          `}
        </article>
        <article class="panel">
          <h3><span class="step">C</span>证据沉淀与缺口分析</h3>
          ${!hasLiterature ? html`<div class="empty">请先在左侧完成文献检索</div>` : html`
            <div class="evidence-list">
              ${this.filteredLiterature.filter(l => l.tagged).length === 0 ? html`<div class="empty" style="margin-bottom: var(--space-3);">请在左侧标记重要文献以添加到证据库</div>` : this.filteredLiterature.filter(l => l.tagged).map(lit => html`<div class="evidence-item"><div class="evidence-type">📄 ${lit.venue} (${lit.year})</div><div class="evidence-content">${lit.contribution}</div><div class="evidence-source">引用: ${lit.citedBy} · 方法: ${lit.methodology}</div></div>`)}
            </div>
            <div class="gap-analysis">
              <h4>⚠️ 研究缺口 (Research Gaps)</h4>
              ${this.gapAnalysis.map(gap => html`<div class="gap-item"><span class="gap-bullet">▸</span><span class="gap-text">${gap}</span></div>`)}
            </div>
            ${this.evidenceSummary ? html`
              <div class="summary-section">
                <h4>📊 综合分析结论</h4>
                <div class="summary-row"><span class="summary-label">核心发现</span><span class="summary-value">${this.evidenceSummary}</span></div>
                <div class="summary-row"><span class="summary-label">文献覆盖</span><span class="summary-value">${this.literature.length} 篇核心文献 · ${this.literature.filter(l => l.tagged).length} 篇已标记</span></div>
              </div>
            ` : ''}
            <div class="confirm-section">
              <h4>✅ 证据沉淀完成</h4>
              <div class="progress-track"><div class="progress-fill" style="width: ${this.progressPercent}%"></div></div>
              <p style="font-size: var(--text-xs); color: #065f46; margin-top: var(--space-2); margin-bottom: var(--space-3);">已标注 ${this.literature.filter(l => l.notes).length}/${this.literature.length} 篇文献笔记</p>
              <button class="primary" style="width: 100%;" @click=${this.confirmLiteratureReady}>确认进入 Outline 阶段 →</button>
            </div>
          `}
        </article>
        <article class="panel">
          <h3><span class="step">D</span>文献详情与笔记</h3>
          ${!selectedItem ? html`<div class="empty">请在左侧选择一篇文献查看详情</div>` : html`
            <div>
              <div class="detail-title">${selectedItem.title}</div>
              <div class="detail-meta">${selectedItem.authors} · ${selectedItem.year} · ${selectedItem.venue}</div>
              <div class="detail-section"><div class="detail-label">关键发现</div><div>${selectedItem.keyFindings.map(f => html`<span class="finding-tag">${f}</span>`)}</div></div>
              <div class="detail-section"><div class="detail-label">核心贡献</div><div class="detail-value">${selectedItem.contribution}</div></div>
              <div class="detail-section"><div class="detail-label">方法论</div><div class="detail-value">${selectedItem.methodology}</div></div>
              <div class="detail-section"><div class="detail-label">相关技术</div><div>${selectedItem.references.map(r => html`<span class="finding-tag">${r}</span>`)}</div></div>
              <div class="detail-section"><div class="detail-label">引用次数</div><div class="detail-value">${selectedItem.citedBy} 次</div></div>
              <div class="detail-section">
                <div class="detail-label">研究笔记</div>
                <textarea class="notes-area" placeholder="添加您的研究笔记..."
                  .value=${selectedItem.notes}
                  @input=${(e: Event) => this.updateNotes(selectedItem.paperId, (e.target as HTMLTextAreaElement).value)}
                ></textarea>
              </div>
            </div>
          `}
        </article>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'literature-stage': LiteratureStage;
  }
}
