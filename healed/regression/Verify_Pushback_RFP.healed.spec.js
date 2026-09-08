// TestCase_30 — Pushback and Cancel Request in RFP
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Pushback RFP @regression @set2', async ({ page }) => {
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

await heal(page, 'status requested', 'visible', null,
  () => page.locator('//div[normalize-space()="Status"]/following-sibling::div//span[normalize-space()="Requested"]'));

await expect(page.locator('//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]')).not.toBeVisible;
await expect(page.locator('//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]')).toHaveCount(0);

await heal(page, 'specifications tab', 'click', null,
  () => page.locator('[data-cy="hub-tab-specifications"]'));
 
await heal(page, 'expand all button', 'visible', null,
  () => page.getByRole('button', { name: 'Expand All', exact: true }));

await heal(page, 'push back button', 'click', null,
  () => page.getByRole('button', { name: 'Push Back', exact: true }));

await heal(page, 'pushback heading', 'visible', null,
  () => page.locator('h3').filter({ hasText: 'Pushback' }).first());
 
await heal(page, 'note textarea', 'visible', null,
  () => page.locator('textarea[name="noteBody"]'));
await heal(page, 'note textarea', 'click', null,
  () => page.locator('textarea[name="noteBody"]'));
await heal(page, 'note textarea', 'fill', testData.description,
  () => page.locator('textarea[name="noteBody"]'));

await heal(page, 'push back code field', 'visible', null,
  () => page.locator('input[name="pushBackCode"][type="text"]'));
await heal(page, 'push back code field', 'click', null,
  () => page.locator('input[name="pushBackCode"][type="text"]'));

  await heal(page, 'incorrect info list item', 'visible', null,
    () => page.locator('li[data-label="Incorrect Information"]'));
  await heal(page, 'incorrect info list item', 'click', null,
    () => page.locator('li[data-label="Incorrect Information"]'));

  await heal(page, 'request info button', 'click', null,
    () => page.getByRole('button', { name: 'Request Information', exact: true }));
 
  await heal(page, 'push back submitted msg', 'visible', null,
    () => page.locator('p').filter({ hasText: 'Push back submitted successfully.' }).first());
 
await heal(page, 'status requested draft', 'visible', null,
  () => page.locator('//div[normalize-space()="Status"]/following-sibling::div//span[normalize-space()="Draft"]'));

await heal(page, 'draft icon after pushback', 'visible', null,
  () => page.locator('//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]'));
await expect(page.locator('//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]')).toHaveCount(1);
 
  await heal(page, 'cancel request button', 'click', null,
    () => page.getByRole('button', { name: 'Cancel Request', exact: true }));
 
  await heal(page, 'cancelled div', 'visible', null,
    () => page.locator('div').filter({ hasText: '01 CANCELLED' }).first());
 
  await heal(page, 'status cancelled div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Status Cancelled' }).first());
});
 