// Set Ancillary Charges in RFP TestCase_18
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Set Ancillary Charges in RFP @regression @set1', async ({ page }) => {
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

  await heal(page, 'mine filter', 'visible', null,
    () => page.locator('[wire\\:key="quick-filter-assigned-to-me"] button'));
  await heal(page, 'mine filter', 'click', null,
    () => page.locator('[wire\\:key="quick-filter-assigned-to-me"] button'));
  await heal(page, 'first rfp cell', 'visible', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  const rfpNumber = (await page.locator('//tbody//tr[1]//td[2]').innerText()).trim();
  await heal(page, 'first rfp cell', 'click', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  await page.waitForTimeout(2000);

  await heal(page, 'proposal title span', 'visible', null,
    () => page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first());

  await heal(page, 'link ancillary item button', 'click', null,
    () => page.getByRole('button', { name: 'Link Ancillary Item', exact: true }));

  await expect(page.getByRole('heading', { name: 'Choose Ancillary Item' })).toBeVisible();

  await heal(page, 'item change charge checkbox', 'check', null,
    () => page.locator('//label[normalize-space()="Item change charge"]/input'));
  await expect(page.locator('//label[normalize-space()="Item change charge"]/input')).toBeChecked();

  await heal(page, 'programing fee label', 'visible', null,
    () => page.locator('label').filter({ hasText: /^Programing Fee$/ }).first());

  await heal(page, 'programing fee checkbox', 'check', null,
    () => page.locator('//label[normalize-space()="Programing Fee"]/input'));
  await expect(page.locator('//label[normalize-space()="Programing Fee"]/input')).toBeChecked();

  await heal(page, 'continue button', 'visible', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));
  await heal(page, 'continue button', 'click', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));

  await heal(page, 'item change charge span', 'visible', null,
    () => page.locator('span').filter({ hasText: '16 - Item change charge' }).first());

  await heal(page, 'ancillary 16 quantity field', 'visible', null,
    () => page.locator('input[name="editingAncillaryItemsEstimate.16.quantity"][type="text"]'));
  await heal(page, 'ancillary 16 quantity field', 'fill', testData.editingAncillaryItemsQuantity,
    () => page.locator('input[name="editingAncillaryItemsEstimate.16.quantity"][type="text"]'));

  await heal(page, 'ancillary 16 price field', 'visible', null,
    () => page.locator('input[name="editingAncillaryItemsEstimate.16.price"][type="text"]'));
  await heal(page, 'ancillary 16 price field', 'fill', testData.editingAncillaryItemsEstimate16Price,
    () => page.locator('input[name="editingAncillaryItemsEstimate.16.price"][type="text"]'));

  await heal(page, 'ancillary 15 quantity field', 'visible', null,
    () => page.locator('input[name="editingAncillaryItemsEstimate.15.quantity"][type="text"]'));
  await heal(page, 'ancillary 15 quantity field', 'fill', testData.editFlatCost,
    () => page.locator('input[name="editingAncillaryItemsEstimate.15.quantity"][type="text"]'));

  await heal(page, 'ancillary 15 price field', 'visible', null,
    () => page.locator('input[name="editingAncillaryItemsEstimate.15.price"][type="text"]'));
  await heal(page, 'ancillary 15 price field', 'fill', testData.costPerEach,
    () => page.locator('input[name="editingAncillaryItemsEstimate.15.price"][type="text"]'));

  await page.locator('button[x-tooltip="Save"][wire\\:click="saveAncillaryItemEstimate"]').scrollIntoViewIfNeeded();
  await page.locator('button[x-tooltip="Save"][wire\\:click="saveAncillaryItemEstimate"]').click({ force: true });

  await heal(page, 'ancillary items updated msg', 'visible', null,
    () => page.locator('p').filter({ hasText: 'Ancillary Items Updated Successfully' }).first());

  await heal(page, 'programing fee div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Programing Fee' }).first());

  await heal(page, 'item change charge tooltip span', 'visible', null,
    () => page.locator('span').filter({ hasText: 'Item change charge' }).first());
});
