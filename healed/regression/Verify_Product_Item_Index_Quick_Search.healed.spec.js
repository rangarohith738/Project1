// Verify Product Item Index Quick Search
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Product Item Index Quick Search @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

  // 1. Go to login page
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

  await heal(page, 'product items label', 'visible', null,
    () => page.locator('label').filter({ hasText: 'Product Items' }).first());

  await heal(page, 'active only label', 'visible', null,
    () => page.locator('label').filter({ hasText: 'Active Only' }).first());

  await heal(page, 'save search button', 'visible', null,
    () => page.getByRole('button', { name: 'Save Search', exact: true }));

  await heal(page, 'reset button', 'visible', null,
    () => page.getByRole('button', { name: 'Reset', exact: true }));

  await heal(page, 'filters button', 'visible', null,
    () => page.getByRole('button', { name: 'Filters 0', exact: true }));

  await heal(page, 'sort button', 'visible', null,
    () => page.getByRole('button', { name: 'Sort 1', exact: true }));

  await heal(page, 'new product item link', 'visible', null,
    () => page.getByRole('link', { name: 'New Product Item', exact: true }));

  // Capture search terms from first row (parallel-safe; no hardcoded product keys)
  await heal(page, 'first product cell', 'visible', null,
    () => page.locator('//tbody//tr[1]//td[2]//p[1]'));
  const firstCellText = (await page.locator('//tbody//tr[1]//td[2]//p[1]').textContent() || '').trim();
  const parts = firstCellText.split(/\s*\|\s*/).map((p) => p.replace(/\|/g, '').trim()).filter(Boolean);
  const productItemSearch = parts[0] || '';
  const customerPartSearch = parts[1] || parts[0] || '';
  console.log(`[data] productItemSearch: ${productItemSearch}, customerPartSearch: ${customerPartSearch}`);

  await heal(page, 'quick search field', 'visible', null,
    () => page.locator('input[placeholder="Quick Search"][data-flux-control]'));
  await heal(page, 'quick search field', 'fill', productItemSearch,
    () => page.locator('input[placeholder="Quick Search"][data-flux-control]'));

  await heal(page, 'product items div', 'visible', null,
    () => page.locator('p') .filter({ hasText: productItemSearch }) .first());

  const productItemsRow = page.locator('//th[normalize-space()="Customer"]//following::tbody//tr//td[2]');
  await expect(productItemsRow).toHaveCount(1);

  await page.locator('input[placeholder="Quick Search"][data-flux-control]').clear();
  await heal(page, 'quick search field', 'fill', customerPartSearch,
    () => page.locator('input[placeholder="Quick Search"][data-flux-control]'));

  await heal(page, 'customer part div', 'visible', null,
    () => page.locator('p') .filter({ hasText: customerPartSearch }) .first());
  await expect(productItemsRow).toHaveCount(1);
});
