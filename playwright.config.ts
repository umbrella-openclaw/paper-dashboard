import { defineConfig, devices } from '@playwright/test';

const FRONTEND_URL = 'http://192.168.1.161:3460';

/**
 * Playwright configuration for Paper Dashboard E2E tests.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'tests/reports' }],
  ],
  use: {
    baseURL: FRONTEND_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
