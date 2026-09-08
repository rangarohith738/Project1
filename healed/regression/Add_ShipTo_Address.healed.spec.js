import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Add Ship To Address in RFP @regression @set2', async ({ page }) => {
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
    () => page.locator("xpath=//option[normalize-space(.)='Column']/ancestor::select"));
  await page.locator("xpath=//option[normalize-space(.)='Column']/ancestor::select").selectOption("status");

  await heal(page, 'operator field', 'click', null,
    () => page.locator("xpath=//div[normalize-space(.)='Operator is equal tocontains']//select"));
  await page.locator("xpath=//div[normalize-space(.)='Operator is equal tocontains']//select").selectOption("is equal to");

  await heal(page, 'value field', 'click', null,
    () => page.locator("xpath=//option[normalize-space(.)='Value']/ancestor::select"));
  await page.locator("xpath=//option[normalize-space(.)='Value']/ancestor::select").selectOption("requested");

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

  await heal(page, 'ship to edit button', 'click', null,
    () => page.locator('(//div[normalize-space()="Ship To"])[1]//following-sibling::button'));

  await heal(page, 'customer address div', 'visible', null,
    () => page.locator('(//span[@x-tooltip="Choose"])[3]'));

  if (!(await page.getByRole('button', { name: 'Select Address', exact: true }).isVisible())) {
    await heal(page, 'customer address div', 'click', null,
      () => page.locator('(//span[@x-tooltip="Choose"])[3]'));
    await heal(page, 'unlink button', 'click', null,
      () => page.getByRole('button', { name: 'Unlink', exact: true }));
  }

  await heal(page, 'select address button', 'click', null,
    () => page.getByRole('button', { name: 'Select Address', exact: true }));

  // New Address is no longer on RFP show page — kept for later
  // await heal(page, 'new address button', 'click', null,
  //   () => page.locator('(//button[normalize-space()="New Address"])[3]'));
  // ... address form fill commented out ...

  await heal(page, 'first radio', 'visible', null,
    () => page.locator('input[type="radio"][name="selectedId"]').first());
  await heal(page, 'first radio', 'check', null,
    () => page.locator('input[type="radio"][name="selectedId"]').first());

  await heal(page, 'continue dialog button', 'click', null,
    () => page.locator('//div[@label="Choose Address"]//..//button[normalize-space()="Continue"]').first());

  await heal(page, 'save ship to address button', 'click', null,
    () => page.locator('(//button[@x-tooltip="Save"])[2]').first());

  if (await page.locator('(//div[normalize-space()="Bill To"])[1]//..//span[@class="text-right"]').first().isVisible()) {
    const billToAddress = (await page.locator('(//div[normalize-space()="Bill To"])[1]//..//span[@class="text-right"]').first().innerText()).trim();
    console.log(`[data] billToAddress: ${billToAddress}`);

    await heal(page, 'ship to edit button', 'click', null,
      () => page.locator('(//div[normalize-space()="Ship To"])[1]//following-sibling::button'));

    await heal(page, 'same as bill to button', 'visible', null,
      () => page.locator('//label[normalize-space()="Same as Bill To"]/preceding-sibling::input'));
    await heal(page, 'same as bill to button', 'check', null,
      () => page.locator('//label[normalize-space()="Same as Bill To"]/preceding-sibling::input'));
    await heal(page, 'save ship to address button', 'click', null,
      () => page.locator('(//button[@x-tooltip="Save"])[2]').first());

    await heal(page, 'ship to address text', 'visible', null,
      () => page.locator('(//div[normalize-space()="Ship To"])[1]//..//span[@class="text-right"]').first());
    await expect(page.locator('(//div[normalize-space()="Ship To"])[1]//..//span[@class="text-right"]').first()).toContainText(billToAddress);
    console.log(`[data] shipToAddress matches billTo: ${billToAddress}`);
  } else {
    console.log('[data] Bill To address not set — skipping Same as Bill To');
  }
});
