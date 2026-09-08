import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Return to RFP @regression @set1', async ({ page }) => {
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

  await heal(page, 'estimate menu link', 'visible', null,
    () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));
  await heal(page, 'estimate menu link', 'click', null,
    () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));

  await heal(page, 'rfp menu link', 'visible', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));
  await heal(page, 'rfp menu link', 'click', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));

  await heal(page, 'mine filter', 'visible', null,
    () => page.locator('[wire\\:key="quick-filter-assigned-to-me"] button'));
  await heal(page, 'mine filter', 'click', null,
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
  await expect(page.getByRole('button', { name: 'Filters 1', exact: true })).toBeVisible();

  await heal(page, 'first rfp cell', 'visible', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  const rfpNumber = (await page.locator('//tbody//tr[1]//td[2]').innerText()).trim();
  await heal(page, 'first rfp cell', 'click', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  await page.waitForTimeout(2000);

  await heal(page, 'proposal title span', 'visible', null,
    () => page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first());

  await heal(page, 'specifications tab', 'visible', null,
    () => page.locator('//button[normalize-space()="Specifications"]'));
  await heal(page, 'specifications tab', 'click', null,
    () => page.locator('//button[normalize-space()="Specifications"]'));

  await heal(page, 'edit button', 'visible', null,
    () => page.locator('//button[@data-cy="edit-button"]'));
  await heal(page, 'edit button', 'click', null,
    () => page.locator('//button[@data-cy="edit-button"]'));

  await heal(page, 'edit page', 'visible', null,
    () => page.locator('//label[contains(normalize-space(), "Edit Request for Proposal")]'));
  const rfpid=rfpNumber.split('RFP')[1];
  await expect(page.locator('//label[contains(normalize-space(), "Edit Request for Proposal")]')).toContainText(rfpid);

  await heal(page, 'return to rfp button', 'visible', null,
    () => page.getByRole('link', { name: 'Return to Request for Proposal', exact: true }).first());
  await heal(page, 'return to rfp button', 'click', null,
    () => page.getByRole('link', { name: 'Return to Request for Proposal', exact: true }).first());

  await heal(page, 'proposal title span', 'visible', null,
    () => page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first());
  await heal(page, 'proposal title', 'visible', null,
    () => page.locator(`//span[@x-tooltip="${rfpNumber}-Request for Proposal"]/p`));

});