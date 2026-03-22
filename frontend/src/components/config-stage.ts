import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const API_BASE = 'http://localhost:8080'; // Use relative URL, API calls go to same host as frontend
const API_KEY = '3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a';

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

interface TaskStatus {
  task_id: string;
  stage: string;
  stage_status: 'idle' | 'processing' | 'waiting_confirm' | 'completed' | 'error';
  progress: {
    papers_processed: number;
    papers_total: number;
    topics_generated: number;
  };
  result: any;
  messages: Array<{timestamp: string; from: string; content: string}>;
  error: string | null;
  updated_at: string;
}

interface TopicCandidate {
  id?: number;
  title: string;
  score?: number;
  summary?: string;
  rationale?: string;
  feasibility?: string;
  // Additional fields from confirmed topics
  researchObjective?: string;
  expectedContribution?: string;
  selectedCandidateId?: number | null;
}

interface SelectedTopic {
  title: string;
  researchObjective: string;
  expectedContribution: string;
  selectedCandidateId: number | null;
}

@customElement('config-stage')
export class ConfigStage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1.2fr 1fr;
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

    .panel p {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .upload-panel {
      background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg) 100%);
    }

    .preview-panel {
      background: var(--color-surface);
    }

    .topics-panel {
      background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 100%);
    }

    .paper-selector {
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-border-light);
    }

    .selector-label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-2);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .paper-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .paper-tab {
      padding: var(--space-1) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-bg);
      color: var(--color-text-secondary);
      font-size: var(--text-xs);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .paper-tab:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .paper-tab.active {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    .paper-preview-mini {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .preview-header {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-2);
    }

    .preview-authors {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-2);
    }

    .preview-abstract {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      line-height: 1.5;
      max-height: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .preview-keywords {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
      margin-top: var(--space-2);
    }

    .kw {
      background: var(--color-accent-light);
      color: var(--color-accent);
      padding: 2px 6px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 600;
    }

    .empty-papers {
      text-align: center;
      padding: var(--space-4);
      color: var(--color-text-tertiary);
      font-size: var(--text-sm);
    }

    .upload-status {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-3);
      background: var(--color-bg);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-border);
    }

    .status-dot.done {
      background: #10b981;
    }

    .status-dot.processing {
      background: #f59e0b;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .processing-text {
      color: #f59e0b;
      font-weight: 600;
    }

    .paper-tabs {
      margin-bottom: var(--space-3);
    }

    .tabs-list {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: var(--space-1) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-bg);
      color: var(--color-text-secondary);
      font-size: var(--text-xs);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .tab-btn:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .tab-btn.active {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    .empty-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-8);
      text-align: center;
      color: var(--color-text-tertiary);
    }

    .empty-preview .empty-icon {
      font-size: 48px;
      margin-bottom: var(--space-3);
      opacity: 0.5;
    }

    .empty-preview p {
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
    }

    .paper-preview {
      display: grid;
      gap: var(--space-3);
    }

    .preview-section {
      display: grid;
      gap: var(--space-1);
    }

    .preview-label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .preview-value {
      font-size: var(--text-sm);
      color: var(--color-text-primary);
      line-height: 1.6;
    }

    .preview-value.title {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .preview-value.abstract {
      max-height: 150px;
      overflow-y: auto;
      background: var(--color-bg);
      padding: var(--space-2);
      border-radius: var(--radius-md);
      text-align: justify;
    }

    .preview-value.keywords {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }

    .keyword-tag {
      background: var(--color-accent-light);
      color: var(--color-accent);
      padding: 2px 8px;
      border-radius: 999px;
      font-size: var(--text-xs);
      font-weight: 600;
    }

    .analysis-records {
      background: var(--color-bg);
      padding: var(--space-2);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
    }

    .record-item {
      padding: var(--space-1) 0;
      border-bottom: 1px solid var(--color-border-light);
      color: var(--color-text-secondary);
    }

    .record-item:last-child {
      border-bottom: none;
    }

    .record-item.info {
      color: var(--color-accent);
    }

    .record-item.error {
      color: #ef4444;
    }

    .message-log {
      margin-top: var(--space-4);
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-border-light);
    }

    .message-log strong {
      display: block;
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-2);
    }

    .message-item {
      display: flex;
      gap: var(--space-2);
      font-size: var(--text-xs);
      padding: var(--space-1) 0;
    }

    .message-time {
      color: var(--color-text-tertiary);
      flex-shrink: 0;
    }

    .message-content {
      color: var(--color-text-secondary);
    }

    .dropzone {
      border: 1.5px dashed var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-bg);
      padding: var(--space-6) var(--space-4);
      text-align: center;
      transition: all var(--transition-base);
      cursor: pointer;
    }

    .dropzone:hover {
      border-color: var(--color-accent);
      background: #f0fdf4;
    }

    .dropzone.dragover {
      border-color: var(--color-accent);
      background: #d1fae5;
      transform: scale(1.02);
    }

    .dropzone input { display: none; }

    .subtle {
      color: var(--color-text-tertiary);
      font-size: var(--text-xs);
    }

    .paper-list {
      display: grid;
      gap: var(--space-2);
      max-height: 280px;
      overflow-y: auto;
      border-top: 1px solid var(--color-border-light);
      padding-top: var(--space-3);
    }

    .paper-item {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--space-2);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      background: var(--color-bg);
    }

    .paper-name {
      font-size: var(--text-sm);
      color: var(--color-text-primary);
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .paper-meta {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-top: 2px;
    }

    .paper-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .status {
      font-size: 10px;
      border-radius: 999px;
      font-weight: 700;
      padding: 3px 8px;
      text-align: center;
    }

    .status.uploaded { background: #f4f4f5; color: #52525b; }
    .status.processing { background: #dbeafe; color: #1e40af; }
    .status.analyzing { background: #fef3c7; color: #92400e; }
    .status.done { background: #d1fae5; color: #065f46; }
    .status.waiting { background: #e0e7ff; color: #4338ca; }
    .status.error { background: #fee2e2; color: #991b1b; }

    .metadata-preview {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      font-size: var(--text-xs);
      margin-top: var(--space-2);
    }

    .metadata-preview .meta-title {
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    .keyword-tag {
      background: #e0e7ff;
      color: #4338ca;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      margin-right: 4px;
      margin-bottom: 4px;
      display: inline-block;
    }

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

    button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
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

    button:disabled { cursor: not-allowed; opacity: 0.5; }

    .processing {
      border-radius: var(--radius-md);
      border: 1px solid #fde68a;
      background: #fffbeb;
      color: #92400e;
      padding: var(--space-4);
      font-size: var(--text-sm);
      display: grid;
      gap: var(--space-2);
      text-align: center;
    }

    .processing-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #fde68a;
      border-top-color: #f59e0b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .progress-track {
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: #fef3c7;
      overflow: hidden;
      margin-top: var(--space-2);
    }

    .progress-fill {
      height: 100%;
      background: #f59e0b;
      transition: width var(--transition-base);
    }

    .topics-section { display: grid; gap: var(--space-3); }

    .candidate {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: #fff;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .candidate:hover {
      border-color: var(--color-accent);
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }

    .candidate.active {
      border-color: var(--color-accent);
      background: #f0fdf4;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    .candidate-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-2);
      margin-bottom: var(--space-2);
    }

    .candidate-title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
      flex: 1;
    }

    .candidate-score {
      font-size: 11px;
      background: #d1fae5;
      color: #047857;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 700;
    }

    .candidate-summary {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin-bottom: var(--space-2);
    }

    .candidate-detail {
      font-size: 10px;
      color: var(--color-text-tertiary);
      background: var(--color-bg);
      padding: var(--space-2);
      border-radius: var(--radius-sm);
      margin-top: var(--space-2);
    }

    .candidate-detail strong { color: var(--color-text-secondary); }

    .topic-actions {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
      margin-top: var(--space-3);
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-border-light);
    }

    .feedback-section {
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      margin-top: var(--space-3);
    }

    .feedback-section h4 {
      font-size: var(--text-sm);
      font-weight: 600;
      color: #92400e;
      margin-bottom: var(--space-2);
    }

    .feedback-history { display: grid; gap: var(--space-2); margin-bottom: var(--space-3); }

    .feedback-item {
      background: #fff;
      border-radius: var(--radius-md);
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-xs);
    }

    .feedback-item .round { font-weight: 600; color: #92400e; }
    .feedback-item .text { color: var(--color-text-primary); margin-top: 2px; }

    .feedback-input { display: grid; gap: var(--space-2); }

    .feedback-input textarea {
      width: 100%;
      border: 1px solid #fde68a;
      border-radius: var(--radius-md);
      padding: var(--space-2);
      font-size: var(--text-sm);
      font-family: var(--font-sans);
      resize: vertical;
      min-height: 60px;
    }

    .feedback-input textarea:focus { outline: none; border-color: #f59e0b; }

    .topic-detail { display: grid; gap: var(--space-3); }

    .field { display: grid; gap: var(--space-1); }

    .field label {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    .field input,
    .field textarea {
      width: 100%;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: #fff;
      color: var(--color-text-primary);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      padding: var(--space-2) var(--space-3);
    }

    .field input:focus,
    .field textarea:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    .field textarea { min-height: 80px; resize: vertical; }

    .confirm-section {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      margin-top: var(--space-3);
    }

    .confirm-section h4 {
      font-size: var(--text-sm);
      font-weight: 600;
      color: #065f46;
      margin-bottom: var(--space-2);
    }

    .empty {
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      text-align: center;
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
    }

    .empty-waiting {
      background: var(--color-bg);
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-6);
      text-align: center;
    }

    .empty-waiting .icon { font-size: 32px; margin-bottom: var(--space-2); }

    .api-status {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }

    .api-status.connected { background: #d1fae5; color: #065f46; }
    .api-status.disconnected { background: #fee2e2; color: #991b1b; }
    .api-status.connecting { background: #fef3c7; color: #92400e; }

    .task-id {
      font-size: 10px;
      background: var(--color-bg);
      color: var(--color-text-tertiary);
      padding: 2px 8px;
      border-radius: 4px;
      font-family: monospace;
      margin-left: var(--space-2);
    }

    .message-log {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      font-size: 11px;
      max-height: 200px;
      overflow-y: auto;
      margin-top: var(--space-3);
    }

    .message-item {
      padding: var(--space-1) 0;
      border-bottom: 1px solid var(--color-border-light);
    }

    .message-item:last-child { border-bottom: none; }

    .message-time { color: var(--color-text-tertiary); margin-right: var(--space-2); }
    .message-from { font-weight: 600; color: var(--color-accent); }
    .message-from.user { color: #4338ca; }
    .message-content { color: var(--color-text-primary); margin-top: 2px; }

    .paper-preview {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      margin-top: var(--space-3);
      max-height: 400px;
      overflow-y: auto;
    }

    .paper-preview h4 {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-3);
      padding-bottom: var(--space-2);
      border-bottom: 1px solid var(--color-border-light);
    }

    .preview-section {
      margin-bottom: var(--space-3);
    }

    .preview-label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-tertiary);
      margin-bottom: 2px;
    }

    .preview-value {
      font-size: var(--text-sm);
      color: var(--color-text-primary);
      line-height: 1.5;
    }

    .preview-value.title {
      font-weight: 700;
      font-size: var(--text-base);
    }

    .preview-value.abstract {
      max-height: 150px;
      overflow-y: auto;
      background: var(--color-surface);
      padding: var(--space-2);
      border-radius: var(--radius-md);
      text-align: justify;
    }

    .preview-value .keyword-tag {
      display: inline-block;
      background: var(--color-accent-light);
      color: var(--color-accent);
      padding: 2px 8px;
      border-radius: 999px;
      font-size: var(--text-xs);
      margin: 2px 4px 2px 0;
      font-weight: 600;
    }

    .analysis-records {
      background: var(--color-surface);
      padding: var(--space-2);
      border-radius: var(--radius-md);
    }

    .record-item {
      font-size: var(--text-xs);
      padding: 4px 0;
      border-bottom: 1px solid var(--color-border-light);
    }

    .record-item:last-child {
      border-bottom: none;
    }

    .record-item.info {
      color: var(--color-accent);
    }

    .record-item.error {
      color: #ef4444;
    }

    @media (max-width: 1280px) {
      .layout { grid-template-columns: 1fr; }
      .panel { min-height: auto; }
    }
  `;

  @state() private taskId: string | null = null;
  @state() private paperMetadata: any = null;
  @state() private paperTabIndex: number = 0;
  @state() private paperList: {filename: string, pageCount?: number}[] = [];
  @state() private selectedPaperIndex: number = 0;
  @state() private taskStatus: TaskStatus | null = null;
  @state() private topics: TopicCandidate[] = [];
  @state() private selectedTopicId: number | null = null;
  @state() private selectedTopic: SelectedTopic = {
    title: '',
    researchObjective: '',
    expectedContribution: '',
    selectedCandidateId: null
  };
  @state() private feedbackHistory: Array<{feedback: string; timestamp: Date}> = [];
  @state() private currentFeedback = '';
  @state() private dragover = false;

  // Debug mode
  @state() private debugMode = false;
  @state() private debugLogs: Array<{timestamp: number; level: string; action: string; data: any}> = [];

  @state() private apiConnected = false;
  @state() private apiChecking = true;
  @state() private errorMessage = '';

  private pollInterval: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    // Initialize in order
    this.checkApiConnection();
    // Delay loadExistingTask to ensure API connection is ready
    setTimeout(() => this.loadExistingTask(), 100);
  }
  // LocalStorage helpers
  private saveTaskId(taskId: string | null) {
    if (taskId) {
      // Use same key as paper-app.ts for consistency
      localStorage.setItem('paper-dashboard-workflow-task-id', taskId);
    } else {
      localStorage.removeItem('paper-dashboard-workflow-task-id');
    }
  }

  private loadTaskId(): string | null {
    // Check both keys for compatibility
    return localStorage.getItem('paper-dashboard-workflow-task-id')
        || localStorage.getItem('paper-dashboard-task-id');
  }

  private async loadExistingTask() {
    // Wait for API to be connected first
    let retries = 0;
    while (!this.apiConnected && retries < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries++;
    }
    
    if (!this.apiConnected) {
      this.debug('warn', 'loadExistingTask_apiNotConnected');
      return;
    }
    
    this.debug('log', 'loadExistingTask_start');
    
    // IMPORTANT: Only restore explicitly saved task
    // Never auto-load old tasks with papers - that causes垃圾数据 issues
    const savedTaskId = this.loadTaskId();
    
    if (savedTaskId) {
      // Try to restore the explicitly saved task
      try {
        const statusResponse = await apiFetch(`${API_BASE}/api/tasks/${savedTaskId}/status`);
        if (statusResponse.ok) {
          const status = await statusResponse.json();
          this.taskId = savedTaskId;
          this.taskStatus = status;
          // Load topics if already analyzed
          if (status.stage_status === 'waiting_confirm') {
            await this.loadTopics();
        await this.loadPaperMetadata();
          }
          this.startPolling(); // Start polling to monitor status changes
          this.debug('log', 'loadExistingTask_restored', { taskId: savedTaskId, status });
          this.dispatchEvent(new CustomEvent('task-loaded', {
            detail: { taskId: savedTaskId, status },
            bubbles: true,
            composed: true
          }));
          return;
        }
      } catch (e) {
        console.error('[ConfigStage] Failed to restore saved task:', e);
        // Saved task no longer exists, clear it
        this.saveTaskId(null);
      }
    }
    
    // No saved task - initialize empty state for new task creation
    this.debug('log', 'loadExistingTask_noTask', { message: 'No saved task found, starting fresh' });
    this.taskId = null;
    this.taskStatus = null;
    // Papers are tracked via taskStatus, no local state needed
    this.topics = [];
    this.selectedTopicId = null;
    this.selectedTopic = { title: '', researchObjective: '', expectedContribution: '', selectedCandidateId: null };
  }



  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  private async checkApiConnection() {
    this.apiChecking = true;
    try {
      const response = await fetch(`${API_BASE}/api/health`);
      if (response.ok) {
        this.apiConnected = true;
      this.debug('log', 'apiConnected');
      } else {
        this.apiConnected = false;
      this.debug('warn', 'apiDisconnected');
      }
    } catch {
      this.apiConnected = false;
      this.debug('warn', 'apiDisconnected');
    }
    this.apiChecking = false;
  }

  private async createTask() {
    console.log('[ConfigStage] createTask called');
    this.errorMessage = '';
    
    // Wait for API connection if not already connected
    if (!this.apiConnected) {
      console.log('[ConfigStage] Waiting for API connection...');
      let retries = 0;
      while (!this.apiConnected && retries < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
      }
      if (!this.apiConnected) {
        this.errorMessage = '后端服务未连接，请检查网络后重试';
        console.error('[ConfigStage] API not connected after waiting');
        return;
      }
    }
    
    console.log('[ConfigStage] API connected, creating task');

    // Clear old task data first - this is intentional for new paper workflow
    this.taskId = null;
    this.taskStatus = null;
    this.paperMetadata = null;
    this.topics = [];
    this.selectedTopicId = null;
    this.selectedTopic = { title: '', researchObjective: '', expectedContribution: '', selectedCandidateId: null };
    this.saveTaskId(null);

    try {
      console.log('[ConfigStage] Calling POST /api/tasks');
      const response = await apiFetch(`${API_BASE}/api/tasks`, { method: 'POST' });
      
      if (response.ok) {
        const data = await response.json();
        console.log('[ConfigStage] Task created:', data.task_id);
        this.taskId = data.task_id;
        this.saveTaskId(data.task_id);
        this.taskStatus = data.status;
        this.startPolling();
        this.notifyReadyState();
      } else {
        const errorText = await response.text();
        console.error('[ConfigStage] Create task failed:', response.status, errorText);
        this.errorMessage = `创建任务失败: HTTP ${response.status}`;
      }
    } catch (e) {
      console.error('[ConfigStage] Create task exception:', e);
      this.errorMessage = `创建任务失败: ${(e as Error).message}`;
    }
  }

  private startPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
    
    this.pollInterval = window.setInterval(() => {
      this.checkStatus();
    }, 2000);
  }

  private async checkStatus() {
    if (!this.taskId) return;

    try {
      const response = await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/status`);
      if (response.ok) {
        this.taskStatus = await response.json();

        // Check if topics are available
        if (this.taskStatus?.stage_status === 'waiting_confirm') {
          await this.loadTopics();
        await this.loadPaperMetadata();
        }

        // Notify ready state
        this.notifyReadyState();
      }
    } catch (e) {
      console.error('Status check failed:', e);
    }
  }

  private async loadTopics() {
    if (!this.taskId) return;

    try {
      const response = await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/topics`);
      if (response.ok) {
        const data = await response.json();
        // Handle both generated topics (array) and confirmed topic (object with topic field)
        if (Array.isArray(data.topics)) {
          this.topics = data.topics;
        } else if (data.topics && typeof data.topics === 'object') {
          // Confirmed topic - wrap in array so it can be displayed
          this.topics = [data.topics as TopicCandidate];
        } else {
          this.topics = [];
        }
      }
    } catch (e) {
      console.error('Failed to load topics:', e);
    }
  }

  private async loadPaperMetadata() {
    if (!this.taskId) return;

    try {
      const response = await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/metadata`);
      if (response.ok) {
        const data = await response.json();
        if (data.papers && data.papers.length > 0) {
          // Load paper list for tabs
          this.paperList = data.papers.map((p: any) => ({
            filename: p.filename,
            pageCount: p.metadata?.pageCount
          }));
          
          // Use the selected paper's metadata
          const idx = Math.min(this.selectedPaperIndex, data.papers.length - 1);
          this.paperMetadata = data.papers[idx]?.metadata || null;
        } else {
          this.paperList = [];
          this.paperMetadata = null;
        }
      }
    } catch (e) {
      console.error('Failed to load paper metadata:', e);
    }
  }

  private selectPaper(index: number) {
    this.selectedPaperIndex = index;
    this.loadPaperMetadata();
  }


  // Debug logging
  private debug(level: 'log' | 'warn' | 'error', action: string, data?: any) {
    const log = {
      timestamp: Date.now(),
      level,
      action,
      data
    };
    console[level]('[ConfigStage]', action, data);
    if (this.debugMode) {
      this.debugLogs = [...this.debugLogs.slice(-99), log];
      this.requestUpdate();
    }
    this.dispatchEvent(new CustomEvent('debug-log', { detail: log, bubbles: true, composed: true }));
  }
  
  private toggleDebug() {
    this.debugMode = !this.debugMode;
    this.debugLogs = [];
  }
  
  private clearDebugLogs() {
    this.debugLogs = [];
  }

  private notifyReadyState() {
    const ready = this.taskStatus?.stage_status === 'waiting_confirm' && 
                  this.selectedTopic.title.trim().length > 0;
    this.dispatchEvent(new CustomEvent<boolean>('config-ready-change', { detail: !!ready }));
  }

  private onReferenceFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.uploadPapers(Array.from(input.files));
    input.value = '';
  }

  private onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragover = false;
    const list = event.dataTransfer?.files;
    if (!list || list.length === 0) return;
    this.uploadPapers(Array.from(list).filter(f => f.name.endsWith('.pdf')));
  }

  private onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragover = true;
  }

  private onDragLeave() {
    this.dragover = false;
  }

  private async uploadPapers(files: File[]) {
    console.log('[ConfigStage] uploadPapers called with', files.length, 'files');
    if (files.length === 0) return;

    if (!this.taskId) {
      console.log('[ConfigStage] No taskId, creating task first...');
      try {
        await this.createTask();
        console.log('[ConfigStage] Task created, taskId:', this.taskId);
        if (this.taskId) {
          await this.doUpload(files);
        }
      } catch (e) {
        console.error('[ConfigStage] createTask failed:', e);
      }
      return;
    }
    this.doUpload(files);
  }

  private async doUpload(files: File[]) {
    console.log('[ConfigStage] doUpload called with', files.length, 'files, taskId:', this.taskId);

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('paper', file);

        const response = await fetch(`${API_BASE}/api/tasks/${this.taskId}/papers`, {
          headers: { 'X-Api-Key': API_KEY },
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }
      } catch (e) {
        this.errorMessage = `上传失败: ${(e as Error).message}`;
      }
    }

    // Trigger OpenClaw session
    await this.triggerOpenClawSession();
  }

  private async triggerOpenClawSession() {
    if (!this.taskId) return;

    this.errorMessage = '';

    try {
      // Update local status to show processing
      if (this.taskStatus) {
        this.taskStatus = {
          ...this.taskStatus,
          stage_status: 'processing',
          messages: [...this.taskStatus.messages, {
            timestamp: new Date().toISOString(),
            from: 'system',
            content: '正在启动 OpenClaw Session 进行论文分析...'
          }]
        };
      }

      // Note: The actual sessions_spawn should be called from here
      // For now, we just trigger the backend which will handle it
      const response = await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/trigger`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Trigger failed');
      }

      // Start polling for status updates
      this.startPolling();

    } catch (e) {
      this.errorMessage = `触发失败: ${(e as Error).message}`;
    }
  }

  private selectTopic(candidate: TopicCandidate) {
    this.selectedTopicId = candidate.id ?? null;
    this.selectedTopic = {
      title: candidate.title,
      researchObjective: `针对 "${candidate.title}" 的核心问题，建立理论模型并进行数值验证。`,
      expectedContribution: '提出一种可行的研究方案，产出具有创新性的学术成果。',
      selectedCandidateId: candidate.id ?? null
    };
    this.notifyReadyState();
  }

  private async submitFeedback() {
    if (!this.currentFeedback.trim() || !this.selectedTopicId) return;

    this.feedbackHistory = [
      ...this.feedbackHistory,
      { feedback: this.currentFeedback.trim(), timestamp: new Date() }
    ];

    // Send feedback to backend
    if (this.taskId) {
      await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'feedback',
          data: { feedback: this.currentFeedback, topicId: this.selectedTopicId }
        })
      });
    }

    this.currentFeedback = '';
    this.errorMessage = '反馈已提交，OpenClaw 正在处理...';
  }

  private regenerateTopics() {
    this.errorMessage = '正在重新生成选题...';
    // Would trigger OpenClaw to regenerate
  }

  private updateTopicField(field: keyof SelectedTopic, value: string) {
    this.selectedTopic = { ...this.selectedTopic, [field]: value };
    this.notifyReadyState();
  }

  private async confirmTopic() {
    if (!this.selectedTopic.title.trim()) {
      this.errorMessage = '请先选择一个选题或输入论文标题';
      return;
    }

    // Save selected topic
    if (this.taskId) {
      await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: this.selectedTopic })
      });
    }

    this.notifyReadyState();
    this.dispatchEvent(new CustomEvent('topic-confirmed', { 
      detail: { topic: this.selectedTopic, taskId: this.taskId }
    }));
  }

  private get progressPercent() {
    if (!this.taskStatus?.progress) return 0;
    const { papers_processed, papers_total } = this.taskStatus.progress;
    return papers_total > 0 ? Math.round((papers_processed / papers_total) * 100) : 0;
  }

  private get uploadedPapersCount() {
    return this.taskStatus?.progress?.papers_total || 0;
  }

  render() {
    const hasTask = !!this.taskId;
    const hasTopics = this.topics.length > 0;
    const isProcessing = this.taskStatus?.stage_status === 'processing';
    const isWaitingConfirm = this.taskStatus?.stage_status === 'waiting_confirm';
    const isError = this.taskStatus?.stage_status === 'error';

    return html`
      <section class="layout">
        <!-- Panel 1: 参考论文上传区 -->
        <article class="panel">
          <h3>
            <span class="step">1</span>参考论文上传
            <span class="api-status ${this.apiChecking ? 'connecting' : this.apiConnected ? 'connected' : 'disconnected'}">
              ${this.apiChecking ? '检测中' : this.apiConnected ? '已连接' : '未连接'}
            </span>
            ${this.taskId ? html`<span class="task-id">${this.taskId.substring(0, 8)}...</span>` : ''}
          </h3>
          <p>拖拽或点击上传 PDF 论文，OpenClaw 将自动分析论文内容</p>
          
          <label class="dropzone ${this.dragover ? 'dragover' : ''}"
            @drop=${this.onDrop}
            @dragover=${this.onDragOver}
            @dragleave=${this.onDragLeave}
          >
            <input type="file" multiple accept=".pdf" @change=${this.onReferenceFileInput}>
            <p>📄 拖拽 PDF 到这里</p>
            <p class="subtle">支持多文件上传，可持续追加</p>
          </label>

          ${this.errorMessage ? html`
            <div style="background: #fee2e2; color: #991b1b; padding: var(--space-2); border-radius: var(--radius-md); font-size: var(--text-xs);">
              ${this.errorMessage}
            </div>
          ` : ''}

          <div class="paper-list">
            ${!hasTask ? html`
              <div class="empty">尚未创建任务</div>
            ` : this.uploadedPapersCount === 0 ? html`
              <div class="empty">尚未上传参考论文</div>
            ` : html`
              <div class="paper-item">
                <div>
                  <div class="paper-name">已上传 ${this.uploadedPapersCount} 篇论文</div>
                  <div class="paper-meta">等待 OpenClaw 分析...</div>
                </div>
                <div class="paper-status">
                  <span class="status ${isProcessing ? 'processing' : 'uploaded'}">
                    ${isProcessing ? '分析中' : '待处理'}
                  </span>
                </div>
              </div>
            `}
          </div>

          ${this.paperMetadata ? html`
            <div class="paper-preview">
              <h4>📄 论文预览</h4>
              <div class="preview-section">
                <div class="preview-label">标题</div>
                <div class="preview-value title">${this.paperMetadata.title || '未知'}</div>
              </div>
              ${this.paperMetadata.authors ? html`
                <div class="preview-section">
                  <div class="preview-label">作者</div>
                  <div class="preview-value">${this.paperMetadata.authors}</div>
                </div>
              ` : ''}
              ${this.paperMetadata.abstract ? html`
                <div class="preview-section">
                  <div class="preview-label">摘要</div>
                  <div class="preview-value abstract">${this.paperMetadata.abstract}</div>
                </div>
              ` : ''}
              ${this.paperMetadata.keywords?.length ? html`
                <div class="preview-section">
                  <div class="preview-label">关键词</div>
                  <div class="preview-value">
                    ${this.paperMetadata.keywords.map((k: string) => html`<span class="keyword-tag">${k}</span>`)}
                  </div>
                </div>
              ` : ''}
              ${this.paperMetadata.analysisRecords?.length ? html`
                <div class="preview-section">
                  <div class="preview-label">分析记录</div>
                  <div class="preview-value analysis-records">
                    ${this.paperMetadata.analysisRecords.map((r: any) => html`
                      <div class="record-item ${r.type}">${r.content}</div>
                    `)}
                  </div>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <button @click=${() => this.shadowRoot?.querySelector<HTMLInputElement>('label.dropzone input')?.click()}>
            + 继续添加论文
          </button>

          ${hasTask && this.taskStatus ? html`
            <div class="message-log">
              <strong style="font-size: 10px; color: var(--color-text-tertiary);">处理日志</strong>
              ${this.taskStatus.messages.slice(-5).map(msg => html`
                <div class="message-item">
                  <span class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</span>
                  <span class="message-from ${msg.from}">${msg.from === 'system' ? '系统' : msg.from === 'agent' ? 'Agent' : msg.from}</span>
                  <div class="message-content">${msg.content}</div>
                </div>
              `)}
            </div>
          ` : ''}
        </article>

        <!-- Panel 2: OpenClaw AI 分析 -->
        <article class="panel">
          <h3><span class="step">2</span>OpenClaw AI 分析与选题推荐</h3>
          
          ${isProcessing ? html`
            <div class="processing">
              <div class="processing-spinner"></div>
              <div>OpenClaw 正在分析论文...</div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${this.progressPercent}%"></div>
              </div>
              <div style="font-size: var(--text-xs); margin-top: var(--space-2);">
                ${this.uploadedPapersCount} 篇论文已上传
              </div>
            </div>
          ` : isWaitingConfirm && hasTopics ? html`
            <p>✅ 分析完成，请在右侧选择研究选题。</p>
            
            <div class="topics-section">
              <strong>推荐选题（支持多轮反馈）</strong>
              ${this.topics.map((topic) => html`
                <div 
                  class="candidate ${topic.id === this.selectedTopicId ? 'active' : ''}"
                  @click=${() => this.selectTopic(topic)}
                >
                  <div class="candidate-header">
                    <span class="candidate-title">${topic.title}</span>
                    <span class="candidate-score">${topic.score}%</span>
                  </div>
                  <div class="candidate-summary">${topic.summary}</div>
                  <div class="candidate-detail">
                    <div><strong>理论依据：</strong>${topic.rationale}</div>
                    <div><strong>可行性：</strong>${topic.feasibility}</div>
                  </div>
                </div>
              `)}
              
              <div class="topic-actions">
                <button class="primary" ?disabled=${!this.selectedTopicId} @click=${() => {}}>
                  ✓ 确认选题
                </button>
                <button class="secondary" @click=${this.regenerateTopics}>
                  🔄 重新生成
                </button>
              </div>
            </div>
            
            ${this.selectedTopicId ? html`
              <div class="feedback-section">
                <h4>💬 选题反馈（支持多轮）</h4>
                
                ${this.feedbackHistory.length > 0 ? html`
                  <div class="feedback-history">
                    ${this.feedbackHistory.map((fb, idx) => html`
                      <div class="feedback-item">
                        <span class="round">第 ${idx + 1} 轮反馈：</span>
                        <span class="text">${fb.feedback}</span>
                      </div>
                    `)}
                  </div>
                ` : ''}
                
                <div class="feedback-input">
                  <textarea 
                    placeholder="输入对选题的修改意见或要求，OpenClaw 将根据反馈重新生成..."
                    .value=${this.currentFeedback}
                    @input=${(e: Event) => this.currentFeedback = (e.target as HTMLTextAreaElement).value}
                  ></textarea>
                  <button @click=${this.submitFeedback} ?disabled=${!this.currentFeedback.trim()}>
                    提交反馈并重新生成
                  </button>
                </div>
              </div>
            ` : ''}
          ` : isError ? html`
            <div class="empty" style="border-color: #fee2e2; color: #991b1b;">
              处理出错：${this.taskStatus?.error || '未知错误'}
            </div>
          ` : html`
            <div class="empty-waiting">
              <div class="icon">📚</div>
              <p>${this.apiConnected ? '请上传参考论文' : '等待后端服务连接...'}</p>
              <p class="subtle">OpenClaw AI 将自动分析论文并推荐研究选题</p>
            </div>
          `}
        </article>

        <!-- Panel 3: 选题详情 -->
        <article class="panel">
          <h3><span class="step">3</span>选题详情与确认</h3>
          
          ${this.selectedTopicId === null ? html`
            <div class="empty">
              请先在中间区域选择一个候选选题
            </div>
          ` : html`
            <div class="topic-detail">
              <div class="field">
                <label>论文标题</label>
                <input
                  type="text"
                  placeholder="输入或修改论文标题"
                  .value=${this.selectedTopic.title}
                  @input=${(e: Event) => this.updateTopicField('title', (e.target as HTMLInputElement).value)}
                >
              </div>

              <div class="field">
                <label>研究目标</label>
                <textarea
                  placeholder="描述研究的核心目标..."
                  .value=${this.selectedTopic.researchObjective}
                  @input=${(e: Event) => this.updateTopicField('researchObjective', (e.target as HTMLTextAreaElement).value)}
                ></textarea>
              </div>

              <div class="field">
                <label>预期贡献</label>
                <textarea
                  placeholder="说明研究的创新点和贡献..."
                  .value=${this.selectedTopic.expectedContribution}
                  @input=${(e: Event) => this.updateTopicField('expectedContribution', (e.target as HTMLTextAreaElement).value)}
                ></textarea>
              </div>
            </div>

            <div class="confirm-section">
              <h4>✅ 确认选题进入下一阶段</h4>
              <p style="font-size: var(--text-xs); color: #065f46; margin-bottom: var(--space-3);">
                确认后将进入 Literature 阶段，OpenClaw 开始文献检索与证据沉淀。
              </p>
              <button 
                class="primary" 
                style="width: 100%;"
                ?disabled=${!this.selectedTopic.title.trim()}
                @click=${this.confirmTopic}
              >
                确认选题，进入 Literature 阶段 →
              </button>
            </div>
          `}
        </article>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'config-stage': ConfigStage;
  }
}
