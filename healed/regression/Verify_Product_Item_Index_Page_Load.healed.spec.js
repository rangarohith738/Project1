// Verify Product Item Index Page Load
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Product Item Index Page Load @regression @set2', async ({ page }) => {
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

  await heal(page, 'quick search field', 'visible', null,
    () => page.locator('[data-cy="input"]'));

  await heal(page, 'filters button', 'visible', null,
    () => page.getByRole('button', { name: 'Filters 0', exact: true }));

  await heal(page, 'sort button', 'visible', null,
    () => page.getByRole('button', { name: 'Sort 1', exact: true }));

  await heal(page, 'new product item link', 'visible', null,
    () => page.getByRole('link', { name: 'New Product Item', exact: true }));

  await heal(page, 'product item customer header', 'visible', null,
    () => page.locator('th') .filter({ hasText: 'PRODUCT ITEM # | CUSTOMER PART #' }) .first());

  await heal(page, 'customer header', 'visible', null,
    () => page.locator('th') .filter({ hasText: 'CUSTOMER' }) .first());

  await heal(page, 'description header', 'visible', null,
    () => page.locator('th') .filter({ hasText: 'DESCRIPTION' }) .first());

  await heal(page, 'unit template summary header', 'visible', null,
    () => page.locator('th') .filter({ hasText: 'UNIT TEMPLATE ID | SUMMARY' }) .first());

  await heal(page, 'product class text', 'visible', null,
    () => page.locator('p') .filter({ hasText: 'PRODUCT CLASS' }) .first());

  await heal(page, 'status header', 'visible', null,
    () => page.locator('th') .filter({ hasText: 'STATUS' }) .first());

  await heal(page, 'previous page span', 'visible', null,
    () => page.locator('span') .filter({ hasText: '&laquo; Previous' }) .first());

  await heal(page, 'per page div', 'visible', null,
    () => page.locator('div') .filter({ hasText: 'Per Page' }) .first());

  if (page.locator('//th[normalize-space()="Customer"]//following::tbody//tr//td[2]').count() === 0) {
    await page.waitForLoadState('domcontentloaded');
    await heal(page, 'no product items text', 'visible', null,
      () => page.locator('//div[normalize-space()="No product items created yet"]'));
  } else {
    await expect(page.locator('//th[normalize-space()="Customer"]//following::tbody//tr//td[2]').count()).toBeGreaterThan(0);
    console.log('page.locator('//th[normalize-space()="Customer"]//following::tbody//tr//td[2]').count(): ' + page.locator('//th[normalize-space()="Customer"]//following::tbody//tr//td[2]').count());
  }
});
