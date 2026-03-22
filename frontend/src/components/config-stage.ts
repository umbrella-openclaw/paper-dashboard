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
  static styles = css`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
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
      margin-bottom: var(--space-3);
    }

    .step {
      background: var(--color-accent);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-xs);
      flex-shrink: 0;
    }

    .api-status {
      font-size: var(--text-xs);
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
      margin-left: auto;
    }

    .api-status.connected {
      background: #d1fae5;
      color: #047857;
    }

    .api-status.disconnected {
      background: #fee2e2;
      color: #b91c1c;
    }

    .dropzone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-6);
      border: 2px dashed var(--color-border);
      border-radius: var(--radius-xl);
      cursor: pointer;
      transition: all var(--transition-fast);
      background: var(--color-bg);
    }

    .dropzone:hover, .dropzone.dragover {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
    }

    .dropzone input {
      display: none;
    }

    .dropzone p {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      margin: 0;
    }

    .subtle {
      font-size: var(--text-xs) !important;
      color: var(--color-text-tertiary) !important;
      margin-top: var(--space-1) !important;
    }

    .error-msg {
      background: #fee2e2;
      color: #991b1b;
      padding: var(--space-2);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
      margin: var(--space-2) 0;
    }

    .panel-upload button,
    .panel-library button,
    .panel-topics button,
    .panel-detail button {
      margin-top: var(--space-3);
      width: 100%;
      padding: var(--space-2);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text-primary);
      font-size: var(--text-sm);
      cursor: pointer;
    }

    .panel-upload button:hover,
    .panel-library button:hover,
    .panel-topics button:hover,
    .panel-detail button:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    /* Panel Library */
    .panel-library {
      min-height: 200px;
    }

    .empty-state {
      text-align: center;
      padding: var(--space-4);
      color: var(--color-text-tertiary);
    }

    .hint {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-top: var(--space-1);
    }

    .paper-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }

    .paper-tab {
      padding: var(--space-1) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-bg);
      color: var(--color-text-secondary);
      font-size: var(--text-xs);
      cursor: pointer;
    }

    .paper-tab.active {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: white;
    }

    .paper-preview {
      background: var(--color-bg);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
    }

    .preview-title {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--space-2);
    }

    .preview-authors {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-1);
    }

    .preview-meta {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-2);
    }

    .preview-abstract {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      line-height: 1.5;
      max-height: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: var(--space-2);
    }

    .preview-keywords {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
      margin-bottom: var(--space-2);
    }

    .kw {
      background: var(--color-accent-light);
      color: var(--color-accent);
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 600;
    }

    .preview-records {
      background: var(--color-surface);
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

    .loading-state {
      text-align: center;
      padding: var(--space-4);
      color: var(--color-text-tertiary);
    }

    /* Panel Topics */
    .processing {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-4);
    }

    .spinner {
      width: 24px;
      height: 24px;
      border: 2px solid var(--color-border);
      border-top-color: var(--color-accent);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: var(--color-border);
      border-radius: 999px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--color-accent);
      transition: width 0.3s ease;
    }

    .topics-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .topic-card {
      padding: var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      cursor: pointer;
    }

    .topic-card:hover {
      border-color: var(--color-accent);
    }

    .topic-card.selected {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
    }

    .topic-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-1);
    }

    .topic-title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .topic-score {
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--color-accent);
    }

    .topic-summary {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
    }

    /* Panel Detail */
    .panel-detail {
      min-height: 300px;
    }

    .message-log-top {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .log-header {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-tertiary);
      margin-bottom: var(--space-2);
      padding-bottom: var(--space-2);
      border-bottom: 1px solid var(--color-border-light);
    }

    .log-entry {
      display: flex;
      gap: var(--space-2);
      font-size: var(--text-xs);
      padding: var(--space-1) 0;
    }

    .log-time {
      color: var(--color-text-tertiary);
      flex-shrink: 0;
    }

    .log-content {
      color: var(--color-text-secondary);
    }

    .topic-detail {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .field label {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .field input,
    .field textarea {
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-bg);
      color: var(--color-text-primary);
      font-size: var(--text-sm);
    }

    .field input:focus,
    .field textarea:focus {
      outline: none;
      border-color: var(--color-accent);
    }

    .field textarea {
      min-height: 80px;
      resize: vertical;
    }

    .confirm-btn {
      width: 100%;
      padding: var(--space-3);
      border: none;
      border-radius: var(--radius-lg);
      background: var(--color-accent);
      color: white;
      font-size: var(--text-sm);
      font-weight: 600;
      cursor: pointer;
    }

    .confirm-btn:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }

    .confirm-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 1280px) {
      .layout {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  `;
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

  private togglePaperViewer() {
    this.paperViewerOpen = !this.paperViewerOpen;
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

    const feedback = this.currentFeedback.trim();
    this.currentFeedback = '';
    this.feedbackSubmitting = true;
    this.errorMessage = '反馈已提交，OpenClaw 正在处理...';

    try {
      if (this.taskId) {
        const response = await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/messages`, {
          method: 'POST',
          body: JSON.stringify({
            action: 'feedback',
            data: { feedback, topicId: this.selectedTopicId }
          })
        });

        if (response.ok) {
          this.feedbackHistory = [
            ...this.feedbackHistory,
            { feedback, timestamp: new Date() }
          ];
          this.errorMessage = '✓ 反馈已提交成功';
          // 3秒后清除消息
          setTimeout(() => {
            if (this.errorMessage === '✓ 反馈已提交成功') {
              this.errorMessage = '';
            }
          }, 3000);
        } else {
          this.errorMessage = '提交失败，请重试';
        }
      }
    } catch (e) {
      this.errorMessage = '提交失败: ' + (e as Error).message;
    } finally {
      this.feedbackSubmitting = false;
    }
  }

  private async regenerateTopics() {
    if (!this.taskId) {
      this.errorMessage = '没有正在进行的任务';
      return;
    }
    
    this.errorMessage = '正在重新生成选题...';
    
    try {
      const response = await apiFetch(`${API_BASE}/api/tasks/${this.taskId}/topics/regenerate`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.topics) {
          this.topics = data.topics;
          this.selectedTopicId = null;
          this.selectedTopic = { title: '', researchObjective: '', expectedContribution: '', selectedCandidateId: null };
          this.errorMessage = '选题已重新生成';
        }
      } else {
        this.errorMessage = '重新生成失败';
      }
    } catch (e) {
      this.errorMessage = '重新生成失败: ' + (e as Error).message;
    }
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

        <!-- Panel 3: 选题详情与确认 -->
        <article class="panel">
          <h3><span class="step">3</span>选题详情与确认</h3>
          
          ${this.uploadedPapersCount > 0 ? html`
            <div class="paper-reference-viewer">
              <div class="viewer-header" @click=${() => this.togglePaperViewer()}>
                <span class="viewer-title">📚 参考论文 (${this.uploadedPapersCount} 篇)</span>
                <span class="viewer-toggle">${this.paperViewerOpen ? '▲' : '▼'}</span>
              </div>
              
              ${this.paperViewerOpen ? html`
                <div class="viewer-content">
                  ${this.paperList.length > 1 ? html`
                    <div class="paper-tabs-compact">
                      ${this.paperList.map((paper: any, idx: number) => html`
                        <button 
                          class="paper-tab-compact ${idx === this.selectedPaperIndex ? 'active' : ''}"
                          @click=${() => this.selectPaper(idx)}
                        >
                          📄 ${idx + 1}
                        </button>
                      `)}
                    </div>
                  ` : ''}
                  
                  ${this.paperMetadata ? html`
                    <div class="current-paper-preview">
                      <div class="paper-title-preview">${this.paperMetadata.title || '未知标题'}</div>
                      ${this.paperMetadata.authors ? html`
                        <div class="paper-authors-preview">👥 ${this.paperMetadata.authors}</div>
                      ` : ''}
                      ${this.paperMetadata.pageCount ? html`
                        <div class="paper-meta-preview">📄 ${this.paperMetadata.pageCount} 页</div>
                      ` : ''}
                      ${this.paperMetadata.abstract ? html`
                        <div class="paper-abstract-preview">
                          <strong>摘要：</strong>${this.paperMetadata.abstract.substring(0, 300)}...
                        </div>
                      ` : ''}
                      ${this.paperMetadata.keywords?.length ? html`
                        <div class="paper-keywords-preview">
                          ${this.paperMetadata.keywords.slice(0, 6).map((k: string) => html`<span class="kw-tag">${k}</span>`)}
                        </div>
                      ` : ''}
                    </div>
                  ` : html`
                    <div class="loading-paper">正在加载论文内容...</div>
                  `}
                </div>
              ` : ''}
            </div>
          ` : html`
            <div class="empty-papers-hint">
              请在左侧上传参考论文
            </div>
          `}
          
          \${hasTask && this.taskStatus?.messages?.length ? html\`
            <div class="message-log-panel">
              <div class="log-header">📋 处理状态</div>
              <div class="log-entries">
                \${this.taskStatus.messages.slice(-5).map(msg => html\`
                  <div class="log-entry">
                    <span class="log-time">\${new Date(msg.timestamp).toLocaleTimeString()}</span>
                    <span class="log-content">\${msg.content}</span>
                  </div>
                \`)}
              </div>
            </div>
          \` : ''}
          
          <div class="topic-detail">
            <div class="field">
              <label>论文标题</label>
              <input
                type="text"
                placeholder="选择或输入论文标题"
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
            <button 
              class="primary" 
              style="width: 100%;"
              ?disabled=${!this.selectedTopic.title?.trim()}
              @click=${this.confirmTopic}
            >
              ✓ 确认选题，进入 Literature 阶段 →
            </button>
          </div>
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
    'config-stage': ConfigStage;
  }
}

  render() {
    const hasTask = !!this.taskId;
    const hasTopics = this.topics.length > 0;
    const isProcessing = this.taskStatus?.stage_status === 'processing';

    return html`
      <section class="layout">
        <!-- Panel 1: 参考论文上传 -->
        <article class="panel panel-upload">
          <h3>
            <span class="step">1</span>参考论文上传
            <span class="api-status ${this.apiConnected ? 'connected' : 'disconnected'}">
              ${this.apiConnected ? '已连接' : '未连接'}
            </span>
          </h3>
          <p>拖拽或点击上传 PDF 论文</p>
          
          <label class="dropzone ${this.dragover ? 'dragover' : ''}"
            @drop=${this.onDrop}
            @dragover=${this.onDragOver}
            @dragleave=${this.onDragLeave}
          >
            <input type="file" multiple accept=".pdf" @change=${this.onReferenceFileInput}>
            <p>📄 拖拽 PDF 到这里</p>
            <p class="subtle">支持多文件上传</p>
          </label>

          ${this.errorMessage ? html`
            <div class="error-msg">${this.errorMessage}</div>
          ` : ''}

          <button @click=${() => this.shadowRoot?.querySelector('label.dropzone input')?.click()}>
            + 继续添加论文
          </button>
        </article>

        <!-- Panel 2: 参考论文库（独立区域，直接在上传下方） -->
        <article class="panel panel-library">
          <h3><span class="step">2</span>参考论文库</h3>
          
          ${this.uploadedPapersCount === 0 ? html`
            <div class="empty-state">
              <p>📂 尚未上传参考论文</p>
              <p class="hint">请在上方区域上传 PDF 论文</p>
            </div>
          ` : html`
            ${this.paperList.length > 1 ? html`
              <div class="paper-tabs">
                ${this.paperList.map((paper: any, idx: number) => html`
                  <button 
                    class="paper-tab ${idx === this.selectedPaperIndex ? 'active' : ''}"
                    @click=${() => this.selectPaper(idx)}
                  >
                    📄 ${idx + 1}
                  </button>
                `)}
              </div>
            ` : ''}
            
            ${this.paperMetadata ? html`
              <div class="paper-preview">
                <div class="preview-title">${this.paperMetadata.title || '未知标题'}</div>
                ${this.paperMetadata.authors ? html`
                  <div class="preview-authors">👥 ${this.paperMetadata.authors}</div>
                ` : ''}
                ${this.paperMetadata.pageCount ? html`
                  <div class="preview-meta">📄 ${this.paperMetadata.pageCount} 页</div>
                ` : ''}
                ${this.paperMetadata.abstract ? html`
                  <div class="preview-abstract">
                    <strong>摘要：</strong>${this.paperMetadata.abstract.substring(0, 300)}...
                  </div>
                ` : ''}
                ${this.paperMetadata.keywords?.length ? html`
                  <div class="preview-keywords">
                    ${this.paperMetadata.keywords.slice(0, 6).map((k: string) => html`<span class="kw">${k}</span>`)}
                  </div>
                ` : ''}
              </div>
            ` : html`
              <div class="loading-state">正在加载论文内容...</div>
            `}
          `}
        </article>

        <!-- Panel 3: 分析与选题推荐 -->
        <article class="panel panel-topics">
          <h3><span class="step">3</span>分析与选题推荐</h3>
          
          ${isProcessing ? html`
            <div class="processing">
              <div class="spinner"></div>
              <p>正在分析论文内容...</p>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${this.progressPercent}%"></div>
              </div>
            </div>
          ` : ''}
          
          ${hasTopics ? html`
            <div class="topics-list">
              ${this.topics.map(topic => html`
                <div 
                  class="topic-card ${this.selectedTopicId === topic.id ? 'selected' : ''}"
                  @click=${() => this.selectTopic(topic)}
                >
                  <div class="topic-header">
                    <span class="topic-title">${topic.title}</span>
                    <span class="topic-score">${topic.score}</span>
                  </div>
                  <div class="topic-summary">${topic.summary || ''}</div>
                </div>
              `)}
            </div>
          ` : html`
            <div class="empty-state">
              <p>${this.uploadedPapersCount > 0 ? '分析中...' : '上传论文后自动生成选题'}</p>
            </div>
          `}
        </article>

        <!-- Panel 4: 选题详情与确认（处理日志在顶部） -->
        <article class="panel panel-detail">
          <h3><span class="step">4</span>选题详情与确认</h3>
          
          ${hasTask && this.taskStatus?.messages?.length ? html`
            <div class="message-log-top">
              <div class="log-header">📋 处理日志</div>
              ${this.taskStatus.messages.slice(-4).map(msg => html`
                <div class="log-entry">
                  <span class="log-time">${new Date(msg.timestamp).toLocaleTimeString()}</span>
                  <span class="log-content">${msg.content}</span>
                </div>
              `)}
            </div>
          ` : ''}
          
          <div class="topic-detail">
            <div class="field">
              <label>论文标题</label>
              <input
                type="text"
                placeholder="选择或输入论文标题"
                .value=${this.selectedTopic.title || ''}
                @input=${(e: Event) => this.updateTopicField('title', (e.target as HTMLInputElement).value)}
              >
            </div>

            <div class="field">
              <label>研究目标</label>
              <textarea
                placeholder="描述研究的核心目标..."
                .value=${this.selectedTopic.researchObjective || ''}
                @input=${(e: Event) => this.updateTopicField('researchObjective', (e.target as HTMLTextAreaElement).value)}
              ></textarea>
            </div>

            <div class="field">
              <label>预期贡献</label>
              <textarea
                placeholder="说明研究的创新点和贡献..."
                .value=${this.selectedTopic.expectedContribution || ''}
                @input=${(e: Event) => this.updateTopicField('expectedContribution', (e.target as HTMLTextAreaElement).value)}
              ></textarea>
            </div>
          </div>

          <button 
            class="confirm-btn" 
            ?disabled=${!this.selectedTopic.title?.trim()}
            @click=${this.confirmTopic}
          >
            ✓ 确认选题，进入 Literature 阶段 →
          </button>
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
