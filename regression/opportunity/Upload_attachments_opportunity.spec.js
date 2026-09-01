import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';

test('Upload attachments in opportunity @regression', async ({ page }) => {
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  const signInWithEmailButton = page.locator('[data-cy="btnLoginVisible"]');
  await expect(signInWithEmailButton).toBeEnabled();
  await signInWithEmailButton.click();

  const emailInput = page.locator('input[name="email"][type="email"]');
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toBeEditable();
  await emailInput.fill(testData.email);

  const passwordInput = page.locator('input[name="password"][type="password"]');
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toBeEditable();
  await passwordInput.fill(testData.password);

  const confirmSignInButton = page.locator('[data-cy="btnLoginConfirm"]');
  await expect(confirmSignInButton).toBeEnabled();
  await confirmSignInButton.click();

  const btn=page.locator('(//button[normalize-space()="Customer"])[1]')
  await btn.click();
 
  const opportunitiesLink = page.getByRole('link', { name: 'Opportunities', exact: true });
  await expect(opportunitiesLink).toBeVisible();
  await expect(opportunitiesLink).toBeEnabled();
  await opportunitiesLink.click();

  const charles12Div = page.locator('div').filter({ hasText: /^charles 12$/ }).first();
  await expect(charles12Div).toBeVisible();
  await expect(charles12Div).toBeEnabled();
  await charles12Div.click();

  // The next click is on a span with the same text, treat as confirmation of page state
  await expect(page.locator('span').filter({ hasText: /^charles 12$/ }).first()).toBeVisible();

  const attachmentsTab = page.locator('div').filter({ hasText: /^Attachments$/ }).first();
  await expect(attachmentsTab).toBeVisible();
  await expect(attachmentsTab).toBeEnabled();
  await attachmentsTab.click();

  const attachFileButton = page.getByRole('button', { name: 'Attach File', exact: true });
  await expect(attachFileButton).toBeVisible();
  await expect(attachFileButton).toBeEnabled();
  await attachFileButton.click();

  const fileInput = page.locator('[data-cy="file"]');
  await expect(fileInput).toBeVisible();
  await fileInput.setInputFiles(testData.file);

  await expect(
    page.locator('div').filter({ hasText: /^Screenshot / }).first().filter({ hasText: '.png' }).first()
  ).toBeVisible();

  await expect(
    page.locator('li').filter({ hasText: /^Screenshot / }).first().filter({ hasText: '.png' }).first()
  ).toBeVisible();

  // Preview the uploaded file
  const previewButton = page.locator('[data-cy="preview-Screenshot ' + testData.otp + '"]');
  await expect(previewButton).toBeVisible();
  await expect(previewButton).toBeEnabled();
  await previewButton.click();

  const detailsPanel = page.locator('#details');
  await expect(detailsPanel).toBeVisible();

  // Back from preview
  const previewBackButton = page.locator('[data-cy="preview-back"]');
  await expect(previewBackButton).toBeVisible();
  await expect(previewBackButton).toBeEnabled();
  await previewBackButton.click();
});