// Verify Product Item Show Page Navigation
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Verify Product Item Show Page Navigation @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

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

  const signInConfirmButton = page.locator('[data-cy="btnLoginConfirm"]');
  await expect(signInConfirmButton).toBeEnabled();
  await signInConfirmButton.click();

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
  const firstProductItemText = (await firstProductItem.textContent()).split('|')[0].trim();

  const productItems_list = page.locator('p').filter({ hasText: firstProductItemText }).first();
  await expect(productItems_list).toBeVisible();
  await firstProductItem.click();

  const newProductItemLink = page.getByRole('link', { name: 'New Product Item', exact: true });
  await expect(newProductItemLink).toBeVisible();

  await page.waitForTimeout(2000);
  const ProductItemHeading_showpage = page.locator('div').filter({ hasText: `${firstProductItemText}-Product Item` }).first();
  await expect(ProductItemHeading_showpage).toBeVisible();

  const productItemInfoSection = page.locator('div').filter({ hasText: 'Product Item Information' }).first();
  await expect(productItemInfoSection).toBeVisible();

  const detailsTabButton = page.locator('[data-cy="hub-tab-details"]');
  await expect(detailsTabButton).toBeVisible();

  const productRouteHeading = page.locator('h3').filter({ hasText: 'Product Route' }).first();
  await expect(productRouteHeading).toBeVisible();
});
