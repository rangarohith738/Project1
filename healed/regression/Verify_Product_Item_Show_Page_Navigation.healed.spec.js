// Verify Product Item Show Page Navigation
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Product Item Show Page Navigation @regression @set2', async ({ page }) => {
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

  await page.waitForTimeout(2000);
  await heal(page, 'first product item', 'visible', null,
    () => page.locator('//tbody//tr[1]//td[2]//p[1]'));
  const firstProductItemText = (await page.locator('//tbody//tr[1]//td[2]//p[1]').textContent()).split('|')[0].trim();

  await heal(page, 'product items list', 'visible', null,
    () => page.locator('p').filter({ hasText: firstProductItemText }).first());
  await heal(page, 'first product item', 'click', null,
    () => page.locator('//tbody//tr[1]//td[2]//p[1]'));

  await heal(page, 'new product item link', 'visible', null,
    () => page.getByRole('link', { name: 'New Product Item', exact: true }));

  await page.waitForTimeout(2000);
  await heal(page, 'product item heading showpage', 'visible', null,
    () => page.locator('div').filter({ hasText: `${firstProductItemText}-Product Item` }).first());

  await heal(page, 'product item info section', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Product Item Information' }).first());

  await heal(page, 'details tab button', 'visible', null,
    () => page.locator('[data-cy="hub-tab-details"]'));

  await heal(page, 'product route heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Product Route' }).first());
});
