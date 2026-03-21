/**
 * Paper Dashboard - Backend API Tests
 * 
 * Tests the core backend API endpoints:
 * - Task CRUD
 * - Paper upload
 * - Topic generation (trigger + processing)
 * - Topic confirmation
 * - State persistence
 */

import { test, expect, afterEach } from '@playwright/test';
import {
  API_BASE,
  API_KEY,
  createTask,
  getTaskStatus,
  uploadPaper,
  triggerProcessing,
  getTopics,
  confirmTopic,
  sendFeedback,
  deleteTask,
  listTasks,
  waitForStatus,
  createTestPdfSync,
} from './helpers';

const TEST_PDF = '/tmp/test-paper.pdf';

test.describe('Backend API', () => {
  const createdTaskIds: string[] = [];

  afterEach(async () => {
    for (const taskId of createdTaskIds) {
      try {
        await deleteTask(taskId);
      } catch {}
    }
    createdTaskIds.length = 0;
  });

  test.beforeAll(async () => {
    createTestPdfSync(TEST_PDF);
  });

  test('health endpoint works', async ({ request }) => {
    const res = await request.get(`${API_BASE}/api/health`);
    expect(res.ok()).toBe(true);
    const data = await res.json();
    expect(data.status).toBe('ok');
  });

  test.describe('Task CRUD', () => {
    test('can create a new task', async () => {
      const { task_id, status } = await createTask();
      createdTaskIds.push(task_id);

      expect(task_id).toBeTruthy();
      expect(status.stage).toBe('INTAKE');
      expect(status.stage_status).toBe('idle');
      expect(status.progress.papers_total).toBe(0);
    });

    test('can list tasks', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      const tasks = await listTasks();
      expect(tasks.length).toBeGreaterThan(0);
      expect(tasks.some(t => t.task_id === task_id)).toBe(true);
    });

    test('can get task status', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      const status = await getTaskStatus(task_id);
      expect(status.task_id).toBe(task_id);
      expect(status.stage).toBe('INTAKE');
    });

    test('returns 404 for non-existent task', async ({ request }) => {
      const res = await request.get(`${API_BASE}/api/tasks/non-existent-task/status`);
      expect(res.status()).toBe(404);
    });

    test('can delete a task', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await deleteTask(task_id);

      const tasks = await listTasks();
      expect(tasks.some(t => t.task_id === task_id)).toBe(false);
    });
  });

  test.describe('Paper Upload', () => {
    test('can upload a PDF to a task', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await uploadPaper(task_id, TEST_PDF);

      const status = await getTaskStatus(task_id);
      expect(status.progress.papers_total).toBe(1);
    });

    test('uploaded paper appears in messages', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await uploadPaper(task_id, TEST_PDF);

      const status = await getTaskStatus(task_id);
      expect(status.messages.some((m: any) => m.content.includes('test-paper.pdf'))).toBe(true);
    });

    test('multiple uploads increment counter correctly', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await uploadPaper(task_id, TEST_PDF);
      await uploadPaper(task_id, TEST_PDF);
      await uploadPaper(task_id, TEST_PDF);

      const status = await getTaskStatus(task_id);
      expect(status.progress.papers_total).toBe(3);
    });

    test('trigger fails if no papers uploaded', async ({ request }) => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      const res = await request.post(`${API_BASE}/api/tasks/${task_id}/trigger`, {
        headers: { 'X-Api-Key': API_KEY },
      });
      expect(res.status()).toBe(400);
    });
  });

  test.describe('Topic Generation (Trigger + Processing)', () => {
    test('can trigger processing and get waiting_confirm status', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await uploadPaper(task_id, TEST_PDF);
      await triggerProcessing(task_id);

      const status = await waitForStatus(task_id, 'waiting_confirm', 15000);
      expect(status.stage_status).toBe('waiting_confirm');
    });

    test('processing generates topics', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await uploadPaper(task_id, TEST_PDF);
      await triggerProcessing(task_id);
      await waitForStatus(task_id, 'waiting_confirm', 15000);

      const topics = await getTopics(task_id);
      expect(topics.length).toBeGreaterThan(0);
    });

    test('topics have required fields', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await uploadPaper(task_id, TEST_PDF);
      await triggerProcessing(task_id);
      await waitForStatus(task_id, 'waiting_confirm', 15000);

      const topics = await getTopics(task_id);
      expect(topics[0].title).toBeTruthy();
    });
  });

  test.describe('Topic Confirmation', () => {
    test('can confirm a topic and status changes to waiting_confirm', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await uploadPaper(task_id, TEST_PDF);
      await triggerProcessing(task_id);
      await waitForStatus(task_id, 'waiting_confirm', 15000);

      const topics = await getTopics(task_id);
      const topicToConfirm = topics[0] || { title: 'Test Topic' };

      await confirmTopic(task_id, topicToConfirm);

      const status = await getTaskStatus(task_id);
      expect(status.stage_status).toBe('waiting_confirm');
    });

    test('feedback endpoint works', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await sendFeedback(task_id, 'Please refine the methodology section');

      const status = await getTaskStatus(task_id);
      expect(status.messages.some((m: any) => m.content.includes('refine the methodology'))).toBe(true);
    });
  });

  test.describe('State Persistence', () => {
    test('task status persists across API calls', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await uploadPaper(task_id, TEST_PDF);

      const status1 = await getTaskStatus(task_id);
      const status2 = await getTaskStatus(task_id);

      expect(status1.progress.papers_total).toBe(status2.progress.papers_total);
      expect(status1.updated_at).toBe(status2.updated_at);
    });

    test('status persists after topic confirmation', async () => {
      const { task_id } = await createTask();
      createdTaskIds.push(task_id);

      await uploadPaper(task_id, TEST_PDF);
      await triggerProcessing(task_id);
      await waitForStatus(task_id, 'waiting_confirm', 15000);

      const topics = await getTopics(task_id);
      await confirmTopic(task_id, topics[0] || { title: 'Test' });

      const status = await getTaskStatus(task_id);
      expect(status.result?.selected_topic).toBeTruthy();
      expect(status.stage_status).toBe('waiting_confirm');
    });
  });
});
