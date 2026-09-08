// Add OptionCharges in RFP TestCase_19
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Add Option Charges in RFP @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: false });
  Object.assign(testData, session);
  console.log(`[data] Reusing session → nameRequired: ${session.nameRequired}`);

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

  async function applying_filters() {

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
  
    //Assertion Applying Filters
    await expect(page.getByRole('button', { name: 'Filters 1', exact: true }) ).toBeVisible();
  
    
}
  await applying_filters();

  await heal(page, 'first rfp cell', 'visible', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  const rfpNumber = (await page.locator('//tbody//tr[1]//td[2]').innerText()).trim();
  await heal(page, 'first rfp cell', 'click', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  await page.waitForTimeout(2000);

  await heal(page, 'proposal title span', 'visible', null,
    () => page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first());

  await heal(page, 'link options button', 'click', null,
    () => page.getByRole('button', { name: 'Link Options', exact: true }));
 
  await heal(page, 'choose option heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Choose Option' }).first());
 
  await heal(page, 'horizontal perf checkbox', 'check', null,
    () => page.locator('//label[normalize-space()="Horizontal Perf"]/input'));
  await expect(page.locator('//label[normalize-space()="Horizontal Perf"]/input')).toBeChecked();
 
  await heal(page, 'vertical perf checkbox', 'check', null,
    () => page.locator('//label[normalize-space()="Screen Print"]/input'));
  await expect(page.locator('//label[normalize-space()="Screen Print"]/input')).toBeChecked();
 
  await heal(page, 'continue button', 'click', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));
 
  await heal(page, 'horizontal perf option row', 'click', null,
    () => page.locator('span').filter({ hasText: '19 - Horizontal Perf' }).first());
 
  await heal(page, 'vertical perf option span', 'click', null,
    () => page.locator('span').filter({ hasText: '15 - Screen Print' }).first());
 
  await heal(page, 'flat cost 19 field', 'fill', testData.editFlatCost,
    () => page.locator('input[name="editingEstimateOptions.19.flat_cost"][type="text"]'));
 
  await heal(page, 'cost per each 19 field', 'fill', testData.costPerEach,
    () => page.locator('input[name="editingEstimateOptions.19.cost_per_each"][type="text"]'));
 
  await heal(page, 'cost per unit set 19 field', 'fill', testData.costPerUnitSet,
    () => page.locator('input[name="editingEstimateOptions.19.cost_per_unit_set"][type="text"]'));
 
  await heal(page, 'flat cost 17 field', 'fill', testData.editFlatCost,
    () => page.locator('input[name="editingEstimateOptions.15.flat_cost"][type="text"]'));
 
  await heal(page, 'cost per each 17 field', 'fill', testData.costPerEach,
    () => page.locator('input[name="editingEstimateOptions.15.cost_per_each"][type="text"]'));
 
  await heal(page, 'cost per unit set 17 field', 'fill', testData.costPerUnitSet,
    () => page.locator('input[name="editingEstimateOptions.15.cost_per_unit_set"][type="text"]'));
 
  await page.locator('button[x-tooltip="Save"][wire\\:click="saveEstimateOptions"]').scrollIntoViewIfNeeded();
  await page.locator('button[x-tooltip="Save"][wire\\:click="saveEstimateOptions"]').click({ force: true });
 
  await heal(page, 'options updated msg', 'visible', null,
    () => page.locator('p').filter({ hasText: 'Options Updated Successfully' }).first());

  await heal(page, 'summary horizontal perf div', 'visible', null,
    () => page.locator('div').filter({ hasText: '19 - Horizontal Perf' }).first());

  await heal(page, 'summary vertical perf div', 'visible', null,
    () => page.locator('div').filter({ hasText: '15 - Screen Print' }).first());
 
});