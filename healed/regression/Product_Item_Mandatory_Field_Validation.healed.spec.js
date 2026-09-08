// Product Item Mandatory Field Validation
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Product Item Mandatory Field Validation @regression @set2', async ({ page }) => {
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

  await heal(page, 'new product item link', 'visible', null,
    () => page.getByRole('link', { name: 'New Product Item', exact: true }));
  await heal(page, 'new product item link', 'click', null,
    () => page.getByRole('link', { name: 'New Product Item', exact: true }));

  await heal(page, 'create button', 'click', null,
    () => page.getByRole('button', { name: 'Create', exact: true }));

  await heal(page, 'customer required text', 'visible', null,
    () => page.locator('p').filter({ hasText: 'A customer is required to create a product item.' }).first());

  await heal(page, 'product class id required text', 'visible', null,
    () => page.locator('p').filter({ hasText: 'The product class id field is required.' }).first());

  await heal(page, 'customer part number required alert', 'visible', null,
    () => page.getByRole('alert').filter({ hasText: 'The customer part number field is required' }));

  await heal(page, 'description required text', 'visible', null,
    () => page.locator('p').filter({ hasText: 'The description field is required.' }).first());

  await heal(page, 'select customer button', 'visible', null,
    () => page.getByRole('button', { name: 'Select Customer', exact: true }));
});
