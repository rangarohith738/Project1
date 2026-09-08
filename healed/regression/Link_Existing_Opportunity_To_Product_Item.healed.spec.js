// Link Existing Opportunity To Product Item
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Link Existing Opportunity To Product Item @regression @set2', async ({ page }) => {
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

  await heal(page, 'login confirm button', 'click', null,
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
  console.log(`[data] productItemId: ${firstProductItemText}`);

  await heal(page, 'product items list', 'visible', null,
    () => page.locator('p').filter({ hasText: firstProductItemText }).first());
  await heal(page, 'first product item', 'click', null,
    () => page.locator('//tbody//tr[1]//td[2]//p[1]'));

  await page.waitForTimeout(2000);
  await heal(page, 'product item detail heading', 'visible', null,
    () => page.locator('div').filter({ hasText: `${firstProductItemText}-Product Item` }).first());

  await heal(page, 'links tab button', 'click', null,
    () => page.locator('[data-cy="hub-tab-links"]'));
  await page.waitForTimeout(2000);

  const existingOppChip = page.locator('span[x-tooltip^="OPP"]').first();
  let opportunityId;

  if (await existingOppChip.isVisible()) {
    opportunityId = (await existingOppChip.getAttribute('x-tooltip') || '').trim();
    console.log(`[data] already linked opportunityId: ${opportunityId}`);
  } else {
    await heal(page, 'choose opportunities button', 'click', null,
      () => page.locator('//button[normalize-space()="Choose Opportunities"]').first());
    await page.waitForTimeout(2000);

    await heal(page, 'first opportunity row', 'visible', null,
      () => page.locator('(//tbody//tr[1]//td[3]//div)[2]').first());
    const opportunityName = (await page.locator('(//tbody//tr[1]//td[3]//div)[2]').first().textContent() || '').trim();
    console.log(`[data] opportunityName: ${opportunityName}`);
    await heal(page, 'first opportunity row', 'click', null,
      () => page.locator('(//tbody//tr[1]//td[3]//div)[2]').first());

    await heal(page, 'opp code cell', 'visible', null,
      () => page.locator('(//tbody//tr[1]//td[2]//div)[2]').first());
    opportunityId = (await page.locator('(//tbody//tr[1]//td[2]//div)[2]').first().textContent() || '').trim();
    console.log(`[data] opportunityId: ${opportunityId}`);
    await page.waitForTimeout(2000);

    await heal(page, 'continue button', 'click', null,
      () => page.locator('//h3[normalize-space()="Choose Opportunity"]//..//..//..//..//button[normalize-space()="Continue"]'));

    await heal(page, 'code date description heading', 'visible', null,
      () => page.locator('div').filter({ hasText: 'CODE DATE DESCRIPTION' }).first());
  }

  await heal(page, 'opportunity added', 'visible', null,
    () => page.locator('//span[@x-tooltip="' + opportunityId + '"]').first());
  await heal(page, 'opportunity added', 'click', null,
    () => page.locator('//span[@x-tooltip="' + opportunityId + '"]').first());

  await heal(page, 'open link', 'visible', null,
    () => page.locator('a[x-tooltip="Open"]').first());
});
