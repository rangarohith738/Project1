// Verify Product Item Index Quick Search
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Verify Product Item Index Quick Search and Show Page Navigation @regression @set2', async ({ page }) => {
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

  const productItemsLabel = page.locator('label').filter({ hasText: 'Product Items' }).first();
  await expect(productItemsLabel).toBeVisible();
  await expect(productItemsLabel).toBeEnabled();

  const activeOnlyLabel = page.locator('span').filter({ hasText: 'Active Only' }).first();
  await expect(activeOnlyLabel).toBeVisible();
  await expect(activeOnlyLabel).toBeEnabled();

  const saveSearchButton = page.getByRole('button', { name: 'Save Search', exact: true });
  await expect(saveSearchButton).toBeVisible();

  const resetButton = page.getByRole('button', { name: 'Reset', exact: true });
  await expect(resetButton).toBeVisible();

  const filtersButton = page.getByRole('button', { name: 'Filters 0', exact: true });
  await expect(filtersButton).toBeVisible();
  await expect(filtersButton).toBeEnabled();

  const sortButton = page.getByRole('button', { name: 'Sort 1', exact: true });
  await expect(sortButton).toBeVisible();
  await expect(sortButton).toBeEnabled();

  const newProductItemLink = page.getByRole('link', {
    name: 'New Product Item',
    exact: true
  });
  await expect(newProductItemLink).toBeVisible();
  await expect(newProductItemLink).toBeEnabled();

  const firstProductCell = page.locator('//tbody//tr[1]//td[2]//p[1]');
  await expect(firstProductCell).toBeVisible();
  const productItemSearch = (await firstProductCell.textContent() || '').split(/\s*\|\s*/)[0].trim().replace(/\|/g, '').trim();
  console.log(`[data] productItemSearch: ${productItemSearch}`);

  const quickSearchInput = page.locator('input[placeholder="Quick Search"][data-flux-control]');
  await expect(quickSearchInput).toBeVisible();
  await expect(quickSearchInput).toBeEnabled();
  await quickSearchInput.fill(productItemSearch);

  const productItemsRow = page.locator('//th[normalize-space()="Customer"]//following::tbody//tr//td[2]');
  await expect(productItemsRow).toHaveCount(1);

  const searchedItem = page.locator('//tbody//tr[1]//td[2]//p[1]');
  await expect(searchedItem).toBeVisible();
  await searchedItem.click();

  const productItemHeading = page.locator('div').filter({ hasText: `${productItemSearch}-Product Item` }).first();
  await expect(productItemHeading).toBeVisible();

  const productItemInfoSection = page.locator('div').filter({ hasText: 'Product Item Information' }).first();
  await expect(productItemInfoSection).toBeVisible();

  const detailsTabButton = page.locator('[data-cy="hub-tab-details"]');
  await expect(detailsTabButton).toBeVisible();

  const productRouteHeading = page.locator('h3').filter({ hasText: 'Product Route' }).first();
  await expect(productRouteHeading).toBeVisible();
});
