// TestCase_23 — Quick Search in RFP Product Routes
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Quick Search Product Routes @regression @set1', async ({ page }) => {
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
  await page.waitForTimeout(2000);

  console.log("Row count:",page.locator('//h3[normalize-space()="Product Routes"]//following::table//thead/following-sibling::tbody/tr').count());
  if(page.locator('//h3[normalize-space()="Product Routes"]//following::table//thead/following-sibling::tbody/tr').count() === 0) {
  await heal(page, 'link routes button', 'click', null,
    () => page.getByRole('button', { name: 'Link Routes', exact: true }));
 
  await heal(page, 'choose product routes heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Choose Product Routes' }).first());
 
  await heal(page, 'checkbox 7', 'visible', null,
    () => page.locator('[id="checkbox.input.7"]'));
  await heal(page, 'checkbox 7', 'check', null,
    () => page.locator('[id="checkbox.input.7"]'));
  await expect(page.locator('[id="checkbox.input.7"]')).toBeChecked();
 
  const expectedText_7 =(await page.locator('//*[@id="checkbox.input.7"]//ancestor::tr/td[2]//span/span[1]').textContent()).trim();
  console.log("page.locator('//*[@id="checkbox.input.7"]//ancestor::tr/td[2]//span/span[1]'):", expectedText_7);
 
  await page.waitForTimeout(2000);
  await heal(page, 'checkbox 11', 'visible', null,
    () => page.locator('[id="checkbox.input.11"]'));
  await heal(page, 'checkbox 11', 'check', null,
    () => page.locator('[id="checkbox.input.11"]'));
  await expect(page.locator('[id="checkbox.input.11"]')).toBeChecked();

  const expectedText_11 = (await page.locator('//*[@id="checkbox.input.11"]//ancestor::tr/td[2]//span/span[1]').textContent()).trim();
  console.log("page.locator('//*[@id="checkbox.input.11"]//ancestor::tr/td[2]//span/span[1]'):", expectedText_11);

  await heal(page, 'continue button', 'click', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));
 
  await heal(page, 'save links button', 'click', null,
    () => page.getByRole('button', { name: 'Save Links', exact: true }));
  await expect(page.locator('p').filter({ hasText: 'Linked routes updated.' }).first()).toBeVisible();
  await expect(page.locator('td').filter({ hasText: expectedText_7 }).first()).toBeVisible();
  await expect(page.locator('td').filter({ hasText: expectedText_11 }).first()).toBeVisible();

    await heal(page, 'quick search field', 'visible', null,
      () => page.locator('[data-cy="input"]'));
    await heal(page, 'quick search field', 'fill', expectedText_7,
      () => page.locator('[data-cy="input"]'));
    await expect(page.locator('td').filter({ hasText: expectedText_7 }).first()).toBeVisible();

    await expect(page.locator('//thead/following-sibling::tbody/tr').count()).toBe(1);
    console.log("page.locator('//thead/following-sibling::tbody/tr').count():", page.locator('//thead/following-sibling::tbody/tr').count());

    await page.locator('[data-cy="input"]').clear();
    await page.waitForTimeout(2000);

    await expect(page.locator('//thead/following-sibling::tbody/tr').count()).toBe(2);
    console.log("page.locator('//thead/following-sibling::tbody/tr').count():", page.locator('//thead/following-sibling::tbody/tr').count());
  }else
  {
      const productText = (await page.locator('//thead/following-sibling::tbody/tr/td[1]//div[contains(@class,"text-ellipsis")]').first().textContent()).trim();

      console.log("page.locator('//thead/following-sibling::tbody/tr').count():", page.locator('//thead/following-sibling::tbody/tr').count());
    
    await heal(page, 'quick search field', 'visible', null,
      () => page.locator('[data-cy="input"]'));
    await heal(page, 'quick search field', 'fill', productText,
      () => page.locator('[data-cy="input"]'));
    await expect(page.locator('td').filter({ hasText: productText }).first()).toBeVisible();
   
    await page.waitForTimeout(2000);
    await expect(page.locator('//thead/following-sibling::tbody/tr').count()).toBe(1);
    console.log("page.locator('//thead/following-sibling::tbody/tr').count():", page.locator('//thead/following-sibling::tbody/tr').count());

    await page.locator('[data-cy="input"]').clear();
    await page.waitForTimeout(2000);

    await expect(page.locator('//thead/following-sibling::tbody/tr').count()).toBe(page.locator('//thead/following-sibling::tbody/tr').count());

  }
});