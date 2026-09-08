// StatusChangeFromDraft_to_Requested
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');

test('Draft to Requested @regression @set1', async ({ page}) => {
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
    () => page.locator('li[data-label="Draft"]'));

  await heal(page, 'apply button', 'click', null,
    () => page.getByRole('button', { name: 'Apply', exact: true }));

  //Assertion Applying Filters
  await expect(page.getByRole('button', { name: 'Filters 1', exact: true })).toBeVisible();
 
  await heal(page, 'draft cell', 'visible', null,
    () => page.locator('td').filter({ hasText: 'Draft' }).first());
  await heal(page, 'draft cell', 'click', null,
    () => page.locator('td').filter({ hasText: 'Draft' }).first());
 
  await heal(page, 'status draft div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Status Draft' }).first());
  await heal(page, 'status draft div', 'click', null,
    () => page.locator('div').filter({ hasText: 'Status Draft' }).first());
 
  await heal(page, 'estimate edit button', 'click', null,
    () => page.locator('[data-cy="estimateEditButton"]'));
 
  await heal(page, 'status field', 'visible', null,
    () => page.locator('input[name="status"][type="text"]'));
  await heal(page, 'status field', 'click', null,
    () => page.locator('input[name="status"][type="text"]'));
 
  await heal(page, 'requested list item', 'visible', null,
    () => page.locator('li[data-label="Requested"]'));
  await heal(page, 'requested list item', 'click', null,
    () => page.locator('li[data-label="Requested"]'));
 
  await heal(page, 'estimate save button', 'click', null,
    () => page.locator('button[x-tooltip="Save"]').first());
 
  await heal(page, 'estimate updated message', 'visible', null,
    () => page.locator('p').filter({ hasText: 'Estimate updated successfully.' }).first());
 
  await heal(page, 'estimate edit button', 'click', null,
    () => page.locator('[data-cy="estimateEditButton"]'));
 
  await heal(page, 'status field', 'visible', null,
    () => page.locator('input[name="status"][type="text"]'));

  await heal(page, 'status requested div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Status Requested' }).first());

  await heal(page, 'estimate save button 2', 'click', null,
    () => page.locator('button[x-tooltip="Save"]').first());

await expect(page.locator('//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]')).not.toBeVisible;
await expect(page.locator('//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]')).toHaveCount(0);

});