const { defineConfig } = require('@playwright/test');

 module.exports = defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.js',
  testIgnore: ['**/helpers/**', '**/fixtures/**'],
  globalSetup: require.resolve('./global-setup.js'),
  globalTeardown: require.resolve('./global-teardown.js'),
  timeout: 120000,           
  expect: {
    timeout: 1200000         
  },
  reporter: [
    ['line'],
    ['json', { outputFile: 'test-results/report.json' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    actionTimeout: 60000,     
    navigationTimeout: 60000,
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    trace: 'on',
    launchOptions: {
      slowMo: 30000,
    },
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', channel: 'chrome' } },
    { name: 'msedge', use: { browserName: 'chromium', channel: 'msedge' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
