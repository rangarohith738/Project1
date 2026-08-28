// Product Item Mandatory Field Validation
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Product Item Mandatory Field Validation @regression @set2', async ({ page }) => {
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

  const newProductItemLink = page.getByRole('link', {
    name: 'New Product Item',
    exact: true
  });
  await expect(newProductItemLink).toBeVisible();
  await expect(newProductItemLink).toBeEnabled();
  await newProductItemLink.click();

  const createButton = page.getByRole('button', { name: 'Create', exact: true });
  await expect(createButton).toBeEnabled();
  await createButton.click();

  const customerRequiredText = page.locator('p').filter({ hasText: 'A customer is required to create a product item.' }).first();
  await expect(customerRequiredText).toBeVisible();

  const productClassIdRequiredText = page.locator('p').filter({ hasText: 'The product class id field is required.' }).first();
  await expect(productClassIdRequiredText).toBeVisible();

  const customerPartNumberRequiredAlert = page.getByRole('alert').filter({ hasText: 'The customer part number field is required' });
  await expect(customerPartNumberRequiredAlert).toBeVisible();

  const descriptionRequiredText = page.locator('p').filter({ hasText: 'The description field is required.' }).first();
  await expect(descriptionRequiredText).toBeVisible();

  const selectCustomerButton = page.getByRole('button', { name: 'Select Customer', exact: true });
  await expect(selectCustomerButton).toBeVisible();
});
