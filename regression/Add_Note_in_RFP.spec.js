// Add Note in RFP TestCase_17
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Add Note in RFP @regression @set1 @demo', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

  // Initial navigation and login
  await page.goto(testData.url);

  const signInWithEmailButton = page.locator('[data-cy="btnLoginVisible"]');
  await expect(signInWithEmailButton).toBeVisible();
  await expect(signInWithEmailButton).toBeEnabled();
  await signInWithEmailButton.click();

  const emailInput = page.locator('input[name="email"][type="email"]');
  await expect(emailInput).toBeEnabled();
  await emailInput.click();
  await emailInput.fill(testData.email);

  const passwordInput = page.locator('input[name="password"][type="password"]');
  await expect(passwordInput).toBeEnabled();
  await passwordInput.click();
  await passwordInput.fill(testData.password);

  const confirmSignInButton = page.locator('[data-cy="btnLoginConfirm"]');
  await expect(confirmSignInButton).toBeEnabled();
  await confirmSignInButton.click();

  // Dashboard navigation
  const taskDashboardLabel = page
    .locator('label')
    .filter({ hasText: /^Ranga\'s Task Dashboard$/ })
    .first();

  await expect(taskDashboardLabel).toBeVisible();
  await expect(taskDashboardLabel).toBeEnabled();

  const btn = page.locator(
    '(//button[normalize-space()="Estimating & Pricing"])[1]'
  );

  await btn.click();

  // Request For Proposals navigation
  const requestForProposalsLink = page.getByRole('link', {
    name: 'Request For Proposals',
    exact: true
  });

  await expect(requestForProposalsLink).toBeVisible();
  await expect(requestForProposalsLink).toBeEnabled();
  await requestForProposalsLink.click();

  // Request for Proposals Queue
  const rfpQueueLabel = page
    .locator('label')
    .filter({ hasText: /^Request for Proposals Queue$/ })
    .first();

  await expect(rfpQueueLabel).toBeVisible();
  await expect(rfpQueueLabel).toBeEnabled();
  await rfpQueueLabel.click();

  await page.waitForLoadState('domcontentloaded');

  const mineFilter = page.locator('//span[normalize-space()="Mine"]//following::button[1]');
  await expect(mineFilter).toBeVisible();
  await mineFilter.click();
  const firstRfpCell = page.locator('//tbody//tr[1]//td[2]');
  await expect(firstRfpCell).toBeVisible();
  const rfpNumber = (await firstRfpCell.innerText()).trim();
  await firstRfpCell.click();
  await page.waitForTimeout(2000);

  const proposalTitleSpan = page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first();
  await expect(proposalTitleSpan).toBeVisible();

  const notesHeading = page.locator('h3').filter({ hasText: 'Notes' }).first();
  await expect(notesHeading).toBeVisible();

  const newNoteButton = page.locator('//span[normalize-space()="New Note"]').first();
  await expect(newNoteButton).toBeEnabled();
  await page.waitForTimeout(3000);
  await newNoteButton.click();

  const quillEditor = page.locator('.ql-editor').first();
  await quillEditor.fill(testData.description);

  const saveNoteButton = page.locator('button[x-tooltip="Save"][wire\\:click="create"]');
  await expect(saveNoteButton).toBeEnabled();
  await saveNoteButton.scrollIntoViewIfNeeded();
  await saveNoteButton.click({ force: true });

  // 20. Confirm "Note created successfully." message is visible
  const noteCreatedDiv = page.locator('div').filter({ hasText: 'Note created successfully.' }).first();
  await expect(noteCreatedDiv).toBeVisible();

  // 21. Confirm alert/notes summary is visible
  const alertSummaryDiv = page.locator('div').filter({ hasText: 'ALERT DATE CREATED DATE MODIFIED CREATED BY NOTES' }).first();
  await expect(alertSummaryDiv).toBeVisible();

  const rohithRangaDiv = page.locator('div').filter({ hasText: 'Ranga Sharan Rohith' }).first();
  await expect(rohithRangaDiv).toBeVisible();
  await expect(rohithRangaDiv).toBeEnabled();
});
