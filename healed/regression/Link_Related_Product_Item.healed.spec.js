// Link Related Product Item on Product Item Links tab (TC63)
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Link Related Product Item @regression @set2', async ({ page }) => {
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

  await page.waitForTimeout(2000);

  await heal(page, 'first product item', 'visible', null,
    () => page.locator('//tbody//tr[1]//td[2]//p[1]'));
  const firstProductItemText = (await page.locator('//tbody//tr[1]//td[2]//p[1]').textContent() || '').split(/\s*\|\s*/)[0].trim().replace(/\|/g, '').trim();
  console.log(`[data] hostProductItemId: ${firstProductItemText}`);

  await heal(page, 'second product item', 'visible', null,
    () => page.locator('//tbody//tr[2]//td[2]//p[1]'));
  const relatedProductItemText = (await page.locator('//tbody//tr[2]//td[2]//p[1]').textContent() || '').split(/\s*\|\s*/)[0].trim().replace(/\|/g, '').trim();
  console.log(`[data] relatedProductItemId: ${relatedProductItemText}`);

  await heal(page, 'first product item', 'click', null,
    () => page.locator('//tbody//tr[1]//td[2]//p[1]'));

  await page.waitForTimeout(2000);
  await heal(page, 'product item heading', 'visible', null,
    () => page.locator('div').filter({ hasText: `${firstProductItemText}-Product Item` }).first());

  await heal(page, 'new product item link', 'visible', null,
    () => page.getByRole('link', { name: 'New Product Item', exact: true }));

  await heal(page, 'links tab button', 'click', null,
    () => page.locator('[data-cy="hub-tab-links"]'));

  await heal(page, 'related product items heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Related Product Items' }).first());

  await heal(page, 'choose product items button', 'click', null,
    () => page.locator('//h3[normalize-space()="Related Product Items"]//following::button[1]').first());

  await heal(page, 'choose product item heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Choose Product Item' }).first());

  await heal(page, 'quick search field', 'visible', null,
    () => page.locator('//h3[normalize-space()="Choose Product Item"]//following::input[1]').first());
  await heal(page, 'quick search field', 'fill', relatedProductItemText,
    () => page.locator('//h3[normalize-space()="Choose Product Item"]//following::input[1]').first());

  await page.waitForTimeout(3000);

  await heal(page, 'product item row', 'visible', null,
    () => page.locator('td').filter({ hasText: relatedProductItemText }).first());

  const checkbox = page.locator('tbody tr').filter({ hasText: relatedProductItemText }).first().locator('input[type="checkbox"]').first();
  await expect(checkbox).toBeVisible();

  if (!(await checkbox.isChecked())) {
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  await heal(page, 'continue button', 'click', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));

  await heal(page, 'related product items heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Related Product Items' }).first());

  await heal(page, 'product text', 'visible', null,
    () => page.locator(`//div[contains(@class, "text-ellipsis") and normalize-space()="${relatedProductItemText}"]`));
  await expect(page.locator(`//div[contains(@class, "text-ellipsis") and normalize-space()="${relatedProductItemText}"]`)).toHaveCount(1);

  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  await heal(page, 'links tab button', 'click', null,
    () => page.locator('[data-cy="hub-tab-links"]'));
  await heal(page, 'related product items heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Related Product Items' }).first());
  await heal(page, 'product text', 'visible', null,
    () => page.locator(`//div[contains(@class, "text-ellipsis") and normalize-space()="${relatedProductItemText}"]`));
  await expect(page.locator(`//div[contains(@class, "text-ellipsis") and normalize-space()="${relatedProductItemText}"]`)).toHaveCount(1);
});
