// Add Note in RFP TestCase_17
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Add Note in RFP @regression @set1', async ({ page }) => {
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

  await heal(page, 'notes heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Notes' }).first());

  await page.waitForTimeout(3000);
  await heal(page, 'new note button', 'click', null,
    () => page.locator('//span[normalize-space()="New Note"]').first());

  await heal(page, 'quill editor', 'fill', testData.description,
    () => page.locator('.ql-editor').first());

  await page.locator('button[x-tooltip="Save"][wire\\:click="create"]').scrollIntoViewIfNeeded();
  await page.locator('button[x-tooltip="Save"][wire\\:click="create"]').click({ force: true });

  // 20. Confirm "Note created successfully." message is visible
  await heal(page, 'note created div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Note created successfully.' }).first());

  // 21. Confirm alert/notes summary is visible
  await heal(page, 'alert summary div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'ALERT DATE CREATED DATE MODIFIED CREATED BY NOTES' }).first());

  await heal(page, 'rohith ranga div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Ranga Sharan Rohith' }).first());
});
