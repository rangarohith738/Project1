// Verify Active Only toggle filters Product Items index (TC68)
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Active Only toggle filters Product Items @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  await heal(page, 'sign in with email button', 'click', null,
    () => page.locator('[data-cy="btnLoginVisible"]'));

  await heal(page, 'email field', 'visible', null,
    () => page.locator('input[name="email"][type="email"]'));
  await heal(page, 'email field', 'fill', testData.email,
    () => page.locator('input[name="email"][type="email"]'));

  await heal(page, 'password field', 'visible', null,
    () => page.locator('input[name="password"][type="password"]'));
  await heal(page, 'password field', 'fill', testData.password,
    () => page.locator('input[name="password"][type="password"]'));

  await heal(page, 'sign in confirm button', 'click', null,
    () => page.locator('[data-cy="btnLoginConfirm"]'));

  await page.waitForLoadState('domcontentloaded');

  await heal(page, 'items menu button', 'click', null,
    () => page.locator('button').filter({ hasText: 'Items' }).first());

  await heal(page, 'product items link', 'visible', null,
    () => page.getByRole('link', { name: 'Product Items', exact: true }));
  await heal(page, 'product items link', 'click', null,
    () => page.getByRole('link', { name: 'Product Items', exact: true }));

  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('main').getByText('Product Items')).toBeVisible();

  const isActiveOnlyEnabled = await page.locator('//label[normalize-space()="Active Only"]/following-sibling::button').evaluate((button) =>
    button.classList.contains('bg-denim-blue-600')
  );
  await expect(isActiveOnlyEnabled).toBe(true);

  const activeOnlyCount = Number(
    await page.locator('//div[@aria-label="Pagination"]//span[2]').innerText()
  );
  console.log(`[data] activeOnlyCount: ${activeOnlyCount}`);

  await heal(page, 'active only toggle', 'click', null,
    () => page.locator('//label[normalize-space()="Active Only"]/following-sibling::button'));
  await page.waitForTimeout(3000);

  const isActiveOnlyEnabledAfterToggleOff = await page.locator('//label[normalize-space()="Active Only"]/following-sibling::button').evaluate((button) =>
    button.classList.contains('bg-denim-blue-600')
  );
  await expect(isActiveOnlyEnabledAfterToggleOff).toBe(false);

  const allItemsCount = Number(
    await page.locator('//div[@aria-label="Pagination"]//span[2]').innerText()
  );
  console.log(`[data] allItemsCount: ${allItemsCount}`);

  await expect(allItemsCount).toBeGreaterThan(activeOnlyCount);
});
