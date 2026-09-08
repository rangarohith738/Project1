// Verify Active Only toggle filters Product Items index (TC68)
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Verify Active Only toggle filters Product Items @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

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

  const activeOnlyToggle = page.locator(
    '//span[normalize-space()="Active Only"]//following::button[1]'
  );

  const isActiveOnlyEnabled = await activeOnlyToggle.evaluate((button) =>
    button.classList.contains('bg-denim-blue-600')
  );
  await expect(isActiveOnlyEnabled).toBe(true);

  const activeOnlyCount = Number(
    await page.locator('//div[@aria-label="Pagination"]//span[2]').innerText()
  );
  console.log(`[data] activeOnlyCount: ${activeOnlyCount}`);

  await activeOnlyToggle.click();
  await page.waitForTimeout(3000);

  const isActiveOnlyEnabledAfterToggleOff = await activeOnlyToggle.evaluate((button) =>
    button.classList.contains('bg-denim-blue-600')
  );
  await expect(isActiveOnlyEnabledAfterToggleOff).toBe(false);

  const allItemsCount = Number(
    await page.locator('//div[@aria-label="Pagination"]//span[2]').innerText()
  );
  console.log(`[data] allItemsCount: ${allItemsCount}`);

  await expect(allItemsCount).toBeGreaterThan(activeOnlyCount);
});
