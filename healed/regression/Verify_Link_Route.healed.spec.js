import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Link Route in RFP @regression @set1', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

  // Initial navigation and login
  await page.goto(testData.url);

  await heal(page, 'sign in with email button', 'visible', null,
    () => page.locator('[data-cy="btnLoginVisible"]'));
  await heal(page, 'sign in with email button', 'click', null,
    () => page.locator('[data-cy="btnLoginVisible"]'));

  await heal(page, 'email field', 'click', null,
    () => page.locator('input[name="email"][type="email"]'));
  await heal(page, 'email field', 'fill', testData.email,
    () => page.locator('input[name="email"][type="email"]'));

  await heal(page, 'password field', 'click', null,
    () => page.locator('input[name="password"][type="password"]'));
  await heal(page, 'password field', 'fill', testData.password,
    () => page.locator('input[name="password"][type="password"]'));

  await heal(page, 'confirm sign in button', 'click', null,
    () => page.locator('[data-cy="btnLoginConfirm"]'));

  // Dashboard navigation

  await heal(page, 'task dashboard label', 'visible', null,
    () => page.locator('label') .filter({ hasText: /^Ranga\'s Task Dashboard$/ }) .first());

  await heal(page, 'btn', 'click', null,
    () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));

  // Request For Proposals navigation

  await heal(page, 'request for proposals link', 'visible', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));
  await heal(page, 'request for proposals link', 'click', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));

  // Request for Proposals Queue

  await heal(page, 'rfp queue label', 'visible', null,
    () => page.locator('label') .filter({ hasText: /^Request for Proposals Queue$/ }) .first());
  await heal(page, 'rfp queue label', 'click', null,
    () => page.locator('label') .filter({ hasText: /^Request for Proposals Queue$/ }) .first());

  await page.waitForLoadState('domcontentloaded');

    await heal(page, 'toggle myne', 'click', null,
      () => page.locator('[wire\\:key="quick-filter-assigned-to-me"] button'));
  
    await heal(page, 'filters button', 'click', null,
      () => page.getByRole('button', { name: 'Filters 0', exact: true }));
   
    await heal(page, 'column field', 'click', null,
      () => page.locator('input[name="rows.0.column"][type="text"]').first());
   
    await heal(page, 'status list item', 'click', null,
      () => page.locator('li[data-label="Status"]').first());
   
    await heal(page, 'operator field', 'click', null,
      () => page.locator('input[name="rows.0.operator"][type="text"]'));
   
    await heal(page, 'contains list item', 'click', null,
      () => page.locator('li[data-label="is"]'));
   
    await heal(page, 'value field', 'visible', null,
      () => page.locator('input[name="rows.0.value"][type="text"]'));
    await heal(page, 'value field', 'click', null,
      () => page.locator('input[name="rows.0.value"][type="text"]'));
    await heal(page, 'requested option', 'click', null,
      () => page.locator('li[data-label="Requested"]'));
   
    await heal(page, 'apply button', 'click', null,
      () => page.getByRole('button', { name: 'Apply', exact: true }));

    await expect(page.getByRole('button', { name: 'Filters 1', exact: true })).toBeVisible();

  await heal(page, 'first rfp cell', 'visible', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  const rfpNumber = (await page.locator('//tbody//tr[1]//td[2]').innerText()).trim();
  await heal(page, 'first rfp cell', 'click', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  await page.waitForTimeout(2000);

  await heal(page, 'proposal title span', 'visible', null,
    () => page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first());

  await heal(page, 'links tab button', 'visible', null,
    () => page.locator('[data-cy="hub-tab-links"]'));
  await heal(page, 'links tab button', 'click', null,
    () => page.locator('[data-cy="hub-tab-links"]'));

  await heal(page, 'product routes heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Product Routes'}).first());
 
  await expect(page.locator('th').filter({ hasText: 'CODE | ROUTE' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'CUSTOMER PART NUMBER' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'PRODUCT CLASS'}).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'PRODUCT SUMMARY' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'DESCRIPTION' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'ART SET STATUS' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'LATEST PREPRESS REQUEST' }).first()).toBeVisible();
 
  await heal(page, 'link routes button', 'click', null,
    () => page.getByRole('button', { name: 'Link Routes', exact: true }));
 
  await heal(page, 'choose product routes heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Choose Product Routes' }).first());
 
  await heal(page, 'checkbox 7', 'visible', null,
    () => page.locator('[id="checkbox.input.7"]'));
  await heal(page, 'checkbox 7', 'check', null,
    () => page.locator('[id="checkbox.input.7"]'));
  await expect(page.locator('[id="checkbox.input.7"]')).toBeChecked();
 
  const expectedText_7 = await page.locator('//*[@id="checkbox.input.7"]//ancestor::tr/td[2]//span/span[1]').textContent();
  console.log("page.locator('//*[@id="checkbox.input.7"]//ancestor::tr/td[2]//span/span[1]'):", expectedText_7);
 
  await heal(page, 'checkbox 11', 'visible', null,
    () => page.locator('[id="checkbox.input.11"]'));
  await heal(page, 'checkbox 11', 'check', null,
    () => page.locator('[id="checkbox.input.11"]'));
  await expect(page.locator('[id="checkbox.input.11"]')).toBeChecked();

  const expectedText_11 = await page.locator('//*[@id="checkbox.input.11"]//ancestor::tr/td[2]//span/span[1]').textContent();
  console.log("page.locator('//*[@id="checkbox.input.11"]//ancestor::tr/td[2]//span/span[1]'):", expectedText_11);

  await heal(page, 'continue button', 'click', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));
 
  await heal(page, 'save links button', 'click', null,
    () => page.getByRole('button', { name: 'Save Links', exact: true }));
  await expect(page.locator('p').filter({ hasText: 'Linked routes updated.' }).first()).toBeVisible();
  await expect(page.locator('td').filter({ hasText: expectedText_7 }).first()).toBeVisible();
  await expect(page.locator('td').filter({ hasText: expectedText_11 }).first()).toBeVisible();
  await page.reload();
  await expect(page.locator('td').filter({ hasText: expectedText_7 }).first()).toBeVisible();
  await expect(page.locator('td').filter({ hasText: expectedText_11 }).first()).toBeVisible();

});  