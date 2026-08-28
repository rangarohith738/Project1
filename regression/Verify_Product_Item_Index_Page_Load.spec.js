// Verify Product Item Index Page Load
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Verify Product Item Index Page Load @regression @set2', async ({ page }) => {
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

  const activeOnlyLabel = page.locator('label').filter({ hasText: 'Active Only' }).first();
  await expect(activeOnlyLabel).toBeVisible();
  await expect(activeOnlyLabel).toBeEnabled();

  const saveSearchButton = page.getByRole('button', { name: 'Save Search', exact: true });
  await expect(saveSearchButton).toBeVisible();

  const resetButton = page.getByRole('button', { name: 'Reset', exact: true });
  await expect(resetButton).toBeVisible();

  const quickSearchInput = page.locator('[data-cy="input"]');
  await expect(quickSearchInput).toBeVisible();
  await expect(quickSearchInput).toBeEnabled();

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

  const productItemCustomerHeader = page
    .locator('th')
    .filter({ hasText: 'PRODUCT ITEM # | CUSTOMER PART #' })
    .first();
  await expect(productItemCustomerHeader).toBeVisible();

  const customerHeader = page
    .locator('th')
    .filter({ hasText: 'CUSTOMER' })
    .first();
  await expect(customerHeader).toBeVisible();

  const descriptionHeader = page
    .locator('th')
    .filter({ hasText: 'DESCRIPTION' })
    .first();
  await expect(descriptionHeader).toBeVisible();

  const unitTemplateSummaryHeader = page
    .locator('th')
    .filter({ hasText: 'UNIT TEMPLATE ID | SUMMARY' })
    .first();
  await expect(unitTemplateSummaryHeader).toBeVisible();

  const productClassText = page
    .locator('p')
    .filter({ hasText: 'PRODUCT CLASS' })
    .first();
  await expect(productClassText).toBeVisible();

  const statusHeader = page
    .locator('th')
    .filter({ hasText: 'STATUS' })
    .first();
  await expect(statusHeader).toBeVisible();

  const previousPageSpan = page
    .locator('span')
    .filter({ hasText: '&laquo; Previous' })
    .first();
  await expect(previousPageSpan).toBeVisible();

  const perPageDiv = page
    .locator('div')
    .filter({ hasText: 'Per Page' })
    .first();
  await expect(perPageDiv).toBeVisible();

  const productItemsRowCount = await page.locator('//th[normalize-space()="Customer"]//following::tbody//tr//td[2]').count();
  if (productItemsRowCount === 0) {
    await page.waitForLoadState('domcontentloaded');
    const noProductItemsText = page.locator('//div[normalize-space()="No product items created yet"]');
    await expect(noProductItemsText).toBeVisible();
  } else {
    await expect(productItemsRowCount).toBeGreaterThan(0);
    console.log('productItemsRowCount: ' + productItemsRowCount);
  }
});
