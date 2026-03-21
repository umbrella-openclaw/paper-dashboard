/**
 * Paper Dashboard - Frontend E2E Workflow Tests
 * 
 * Tests the complete user workflow:
 * 1. Upload paper flow
 * 2. Topic generation and selection
 * 3. State persistence across page refresh
 */

import { test, expect, Page, Browser } from '@playwright/test';
import {
  FRONTEND_URL,
  API_BASE,
  API_KEY,
  createTask,
  uploadPaper,
  triggerProcessing,
  getTaskStatus,
  waitForStatus,
  deleteTask,
  createTestPdfSync,
} from './helpers';

const TEST_PDF = '/tmp/test-paper-e2e.pdf';

test.describe('Paper Dashboard E2E Workflow', () => {
  test.beforeAll(async () => {
    createTestPdfSync(TEST_PDF);
  });

  test.describe('Upload Flow', () => {
    test('page loads without errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await page.goto(FRONTEND_URL);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('paper-app')).toBeVisible({ timeout: 10000 });

      // No critical JS errors (WebSocket errors are expected if relay isn't connected)
      const criticalErrors = errors.filter(e =>
        !e.includes('WebSocket') &&
        !e.includes('ws://') &&
        !e.includes('fetch')
      );
      expect(criticalErrors).toHaveLength(0);
    });

    test('can create a new paper workflow', async ({ page }) => {
      await page.goto(FRONTEND_URL);
      await page.waitForLoadState('networkidle');

      const createBtn = page.locator('button', { hasText: '创建新论文' });
      await createBtn.waitFor({ timeout: 5000 });
      await createBtn.click();

      await expect(page.locator('config-stage')).toBeVisible({ timeout: 5000 });
    });

    test('dropzone is visible in intake stage', async ({ page }) => {
      await page.goto(FRONTEND_URL);
      await page.waitForLoadState('networkidle');

      await page.locator('button', { hasText: '创建新论文' }).click();
      await page.waitForTimeout(500);

      const dropzone = page.locator('label.dropzone');
      await expect(dropzone).toBeVisible({ timeout: 5000 });
    });

    test('API connection status is shown', async ({ page }) => {
      await page.goto(FRONTEND_URL);
      await page.waitForLoadState('networkidle');

      await page.locator('button', { hasText: '创建新论文' }).click();
      await page.waitForTimeout(500);

      const statusEl = page.locator('.api-status');
      await expect(statusEl).toBeVisible({ timeout: 3000 });
      const statusText = (await statusEl.textContent())?.trim();
      expect(['已连接', '检测中', '未连接']).toContain(statusText);
    });
  });

  test.describe('State Persistence (Refresh)', () => {
    test('uploaded papers count persists in status', async () => {
      const { task_id } = await createTask();
      await uploadPaper(task_id, TEST_PDF);
      await uploadPaper(task_id, TEST_PDF);

      const status = await getTaskStatus(task_id);
      expect(status.progress.papers_total).toBe(2);

      await deleteTask(task_id);
    });

    test('task state is restored after page refresh via localStorage', async ({ browser }) => {
      const { task_id } = await createTask();
      await uploadPaper(task_id, TEST_PDF);

      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto(FRONTEND_URL);
      await page.waitForLoadState('networkidle');

      // Simulate existing task via localStorage
      await page.evaluate((tid) => {
        localStorage.setItem('paper-dashboard-workflow-task-id', tid);
      }, task_id);

      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Workflow should activate - config-stage should be visible
      const configStage = page.locator('config-stage');
      await expect(configStage).toBeVisible({ timeout: 5000 });

      await context.close();
      await deleteTask(task_id);
    });
  });

  test.describe('Topic Generation UI Flow', () => {
    test('trigger button changes status to processing', async () => {
      const { task_id } = await createTask();
      await uploadPaper(task_id, TEST_PDF);

      await triggerProcessing(task_id);

      // Status should change from idle to processing (or waiting_confirm if fast)
      const status = await getTaskStatus(task_id);
      expect(['processing', 'waiting_confirm']).toContain(status.stage_status);

      await deleteTask(task_id);
    });

    test('waiting_confirm status shows topic candidates in UI', async ({ browser }) => {
      const { task_id } = await createTask();
      await uploadPaper(task_id, TEST_PDF);
      await triggerProcessing(task_id);
      await waitForStatus(task_id, 'waiting_confirm', 15000);

      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto(FRONTEND_URL);
      await page.evaluate((tid) => {
        localStorage.setItem('paper-dashboard-workflow-task-id', tid);
      }, task_id);
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Should see topic candidates
      const candidate = page.locator('.candidate').first();
      await expect(candidate).toBeVisible({ timeout: 10000 });

      await context.close();
      await deleteTask(task_id);
    });
  });
});
