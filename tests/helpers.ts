/**
 * Test helpers for Paper Dashboard E2E tests.
 */

import * as fs from 'fs';
import * as path from 'path';

export const API_BASE = 'http://192.168.1.161:8080';
export const API_KEY = '3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a';
export const FRONTEND_URL = 'http://192.168.1.161:3460';

export interface TaskStatus {
  task_id: string;
  stage: string;
  stage_status: string;
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

export interface Topic {
  id?: number;
  title: string;
  score?: number;
  summary?: string;
  rationale?: string;
  feasibility?: string;
  researchObjective?: string;
  expectedContribution?: string;
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    'X-Api-Key': API_KEY,
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  
  return fetch(url, { ...options, headers });
}

export async function createTask(): Promise<{ task_id: string; status: TaskStatus }> {
  const res = await apiFetch('/api/tasks', { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to create task: ${await res.text()}`);
  return res.json();
}

export async function getTaskStatus(taskId: string): Promise<TaskStatus> {
  const res = await apiFetch(`/api/tasks/${taskId}/status`);
  if (!res.ok) throw new Error(`Failed to get task status: ${await res.text()}`);
  return res.json();
}

export async function uploadPaper(taskId: string, pdfPath: string): Promise<void> {
  const formData = new FormData();
  const fileName = path.basename(pdfPath);
  const fileBuffer = fs.readFileSync(pdfPath);
  const blob = new Blob([fileBuffer], { type: 'application/pdf' });
  formData.append('paper', blob, fileName);
  
  const res = await apiFetch(`/api/tasks/${taskId}/papers`, {
    method: 'POST',
    body: formData,
    headers: { 'X-Api-Key': API_KEY },
  });
  if (!res.ok) throw new Error(`Failed to upload paper: ${await res.text()}`);
}

export async function triggerProcessing(taskId: string): Promise<void> {
  const res = await apiFetch(`/api/tasks/${taskId}/trigger`, { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to trigger processing: ${await res.text()}`);
}

export async function getTopics(taskId: string): Promise<Topic[]> {
  const res = await apiFetch(`/api/tasks/${taskId}/topics`);
  if (!res.ok) throw new Error(`Failed to get topics: ${await res.text()}`);
  const data = await res.json();
  if (Array.isArray(data.topics)) return data.topics;
  if (data.topics && typeof data.topics === 'object') return [data.topics as Topic];
  return [];
}

export async function confirmTopic(taskId: string, topic: Topic): Promise<void> {
  const res = await apiFetch(`/api/tasks/${taskId}/topics`, {
    method: 'POST',
    body: JSON.stringify({ topic }),
  });
  if (!res.ok) throw new Error(`Failed to confirm topic: ${await res.text()}`);
}

export async function sendFeedback(taskId: string, feedback: string): Promise<void> {
  const res = await apiFetch(`/api/tasks/${taskId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ action: 'feedback', data: { feedback } }),
  });
  if (!res.ok) throw new Error(`Failed to send feedback: ${await res.text()}`);
}

export async function deleteTask(taskId: string): Promise<void> {
  const res = await apiFetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete task: ${await res.text()}`);
}

export async function listTasks(): Promise<Array<{task_id: string; stage: string; stage_status: string}>> {
  const res = await apiFetch('/api/tasks');
  if (!res.ok) throw new Error(`Failed to list tasks: ${await res.text()}`);
  const data = await res.json();
  return data.tasks || [];
}

export async function waitForStatus(
  taskId: string,
  expectedStatus: string,
  timeoutMs = 30000
): Promise<TaskStatus> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const status = await getTaskStatus(taskId);
    if (status.stage_status === expectedStatus) return status;
    if (status.stage_status === 'error') {
      throw new Error(`Task reached error state: ${status.error}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  const finalStatus = await getTaskStatus(taskId);
  throw new Error(`Timeout waiting for ${expectedStatus}, got ${finalStatus.stage_status}`);
}

export function createTestPdfSync(pdfPath: string): void {
  const pdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >> endobj
xref
0 4
0000000000 65535 f 
0000000009 00000 n 
0000000052 00000 n 
0000000101 00000 n 
trailer << /Size 4 /Root 1 0 R >>
startxref
177
%%EOF`;
  fs.writeFileSync(pdfPath, pdfContent);
}
