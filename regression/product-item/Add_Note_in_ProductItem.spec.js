// Add Note in Product Item
import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../../helpers/sessionData');

test('Add Note in Product Item @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → description: ${session.description}`);

  // 1. Go to login page
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

  const loginConfirmButton = page.locator('[data-cy="btnLoginConfirm"]');
  await expect(loginConfirmButton).toBeEnabled();
  await loginConfirmButton.click();

  await page.waitForLoadState('domcontentloaded');


  const itemsMenuButton = page.locator('button').filter({ hasText: 'Items' }).first();
  await expect(itemsMenuButton).toBeEnabled();
  await itemsMenuButton.click();

  const productItemsLink = page.getByRole('link', { name: 'Product Items', exact: true });
  await expect(productItemsLink).toBeVisible();
  await expect(productItemsLink).toBeEnabled();
  await productItemsLink.click();

  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('main').getByText('Product Items')).toBeVisible();

  await page.waitForTimeout(2000);
  const firstProductItem = page.locator('//tbody//tr[1]//td[2]//p[1]');
  await expect(firstProductItem).toBeVisible();
  const firstProductItemText = (await firstProductItem.textContent() || '').split(/\s*\|\s*/)[0].trim().replace(/\|/g, '').trim();
  console.log(`[data] productItemId: ${firstProductItemText}`);

  const productItems_list = page.locator('p').filter({ hasText: firstProductItemText }).first();
  await expect(productItems_list).toBeVisible();
  await firstProductItem.click();

  await page.waitForTimeout(2000);
  const productItemDetailHeading = page.locator('div').filter({ hasText: `${firstProductItemText}-Product Item` }).first();
  await expect(productItemDetailHeading).toBeVisible();
  await expect(productItemDetailHeading).toBeEnabled();

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

  const rohithRangaDiv = page.locator('div').filter({ hasText: 'Rohith Ranga' }).first();
  await expect(rohithRangaDiv).toBeVisible();
  await expect(rohithRangaDiv).toBeEnabled();
});