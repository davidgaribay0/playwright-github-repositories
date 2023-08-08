import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  outputDir: './reports',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? undefined : 4,
  reporter: [['html',], ['list', { printSteps: true }], ['./slackReporter.ts']],
  timeout: 8000,
  expect: { timeout: 4000 },
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'], viewport: { width: 1600, height: 1080 }
      },
    },
  ],
});
