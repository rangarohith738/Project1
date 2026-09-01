// Verify Product Item Edit
import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Product Item Edit @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);
  console.log(`[data] itemDefaultCost: ${session.itemDefaultCost}, itemDefaultPrice: ${session.itemDefaultPrice}`);

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

  const editButton = page.locator('button[x-tooltip="Edit"][wire\\:click="openEdit"]');
  await expect(editButton).toBeEnabled();
  await editButton.click();

  // Edit the description textarea
  const DescriptionTextarea = page.locator('//textarea[@id="productItem.description"]');
  await expect(DescriptionTextarea).toBeVisible();
  await expect(DescriptionTextarea).toBeEditable();
  await DescriptionTextarea.fill(testData.estimate);

  // Edit Default Cost
  const defaultCostInput = page.locator('//div[normalize-space()="Default Unit Cost"]/following-sibling::div//input');
  await expect(defaultCostInput).toBeEditable();
  await defaultCostInput.fill(testData.itemDefaultCost);
  await expect(defaultCostInput).toHaveValue(testData.itemDefaultCost);

  // Edit Default Price
  const defaultPriceInput = page.locator('//div[normalize-space()="Default Unit Price"]/following-sibling::div//input');
  await expect(defaultPriceInput).toBeEditable();
  await defaultPriceInput.fill(testData.itemDefaultPrice);
  await expect(defaultPriceInput).toHaveValue(testData.itemDefaultPrice);

  const saveButton = page.locator('[data-cy="hub-save-button"]');
  await expect(saveButton).toBeEnabled();
  await saveButton.click();

  const savedDescription = page.locator('//div[normalize-space()="Description"]//following-sibling::div/span').first();
  await expect(savedDescription).toBeVisible();
  await expect(savedDescription).toBeEnabled();
  await expect(savedDescription).toHaveText(testData.estimate);

  const savedDefaultCost = page.locator('//div[normalize-space()="Default Unit Cost"]/following-sibling::div//span').first();
  await expect(savedDefaultCost).toBeVisible();
  await expect(savedDefaultCost).toBeEnabled();
  await expect(savedDefaultCost).toHaveText(`$${Number(testData.itemDefaultCost).toFixed(2)}`);

  const savedDefaultPrice = page.locator('//div[normalize-space()="Default Unit Price"]/following-sibling::div//span').first();
  await expect(savedDefaultPrice).toBeVisible();
  await expect(savedDefaultPrice).toBeEnabled();
  await expect(savedDefaultPrice).toHaveText(`$${Number(testData.itemDefaultPrice).toFixed(2)}`);
});
