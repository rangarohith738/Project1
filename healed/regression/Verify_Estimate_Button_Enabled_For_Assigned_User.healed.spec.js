// Verify Estimate button enabled when user is assigned
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Estimate Button Enabled For Assigned User @regression @set1', async ({ page }) => {
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

    await heal(page, 'filters button', 'click', null,
      () => page.getByRole('button', { name: 'Filters 0', exact: true }));

    await heal(page, 'column field', 'click', null,
      () => page.locator("xpath=//option[normalize-space(.)='Column']/ancestor::select"));
    await page.locator("xpath=//option[normalize-space(.)='Column']/ancestor::select").selectOption("Requested By");

    await heal(page, 'operator field', 'click', null,
      () => page.locator("xpath=//div[normalize-space(.)='Operator is equal tocontains']//select"));
    await page.locator("xpath=//div[normalize-space(.)='Operator is equal tocontains']//select").selectOption("contains");

    await heal(page, 'value field', 'fill', 'Ranga Sharan Rohith',
      () => page.getByPlaceholder('value'));

    await heal(page, 'add a filter button', 'click', null,
      () => page.locator('p').filter({ hasText: 'Add A Filter' }));

    await heal(page, 'second column field', 'click', null,
      () => page.locator("xpath=//option[normalize-space(.)='Column']/ancestor::select").last());
    await page.locator("xpath=//option[normalize-space(.)='Column']/ancestor::select").last().selectOption("status");

    await heal(page, 'second operator field', 'click', null,
      () => page.locator("xpath=//div[normalize-space(.)='Operator is equal tocontains']//select").last());
    await page.locator("xpath=//div[normalize-space(.)='Operator is equal tocontains']//select").last().selectOption("is equal to");

    await heal(page, 'second value field', 'click', null,
      () => page.locator("xpath=//option[normalize-space(.)='Value']/ancestor::select").last());
    await page.locator("xpath=//option[normalize-space(.)='Value']/ancestor::select").last().selectOption("requested");

    await heal(page, 'apply button', 'click', null,
      () => page.getByRole('button', { name: 'Apply', exact: true }));

    await expect(page.getByRole('button', { name: 'Filters 2', exact: true })).toBeVisible();

    const unassignedToggle = page.locator('//span[normalize-space()="Unassigned"]/..//div/button').first();
    await heal(page, 'unassigned toggle', 'visible', null,
      () => unassignedToggle);
    const isOff = await unassignedToggle.evaluate(el => el.classList.contains('bg-gray-200'));
    if (isOff) {
      await heal(page, 'unassigned toggle', 'click', null,
        () => unassignedToggle);
    }
    await expect(unassignedToggle).toHaveClass(/bg-denim-blue-600/);

    const column10 = page.locator('//thead/tr/th[10]//following::tbody/tr/td[10]/div//span');
    const column10Text = await column10.allTextContents();
    for (const text of column10Text) {
      expect(text.trim()).toBe("Requested");
    }

    const column11 = page.locator('//thead/tr/th[11]//following::tbody/tr/td[11]/div');
    const column11Text = await column11.allTextContents();
    for (const text of column11Text) {
      expect(text.trim()).toBe("Ranga Sharan Rohith");
    }

  await heal(page, 'first rfp cell', 'visible', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  const rfpNumber = (await page.locator('//tbody//tr[1]//td[2]').innerText()).trim();
  await heal(page, 'first rfp cell', 'click', null,
    () => page.locator('//tbody//tr[1]//td[2]'));
  await page.waitForTimeout(2000);

  await heal(page, 'proposal title span', 'visible', null,
    () => page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first());

  await heal(page, 'status requested text', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Status Requested' }).first());

  await expect(page.locator('button').filter({ hasText: 'Convert to Estimate' })).not.toBeEnabled();

  await heal(page, 'select user button', 'click', null,
    () => page.locator('xpath=(//button[normalize-space()="Select User"])[1]') await expect(selectUserButton).toBeVisible());

  await heal(page, 'rohith ranga cell', 'visible', null,
    () => page.locator('td').filter({ hasText: 'Ranga Sharan Rohith' }).first());
  await heal(page, 'rohith ranga cell', 'click', null,
    () => page.locator('td').filter({ hasText: 'Ranga Sharan Rohith' }).first());

  await heal(page, 'rohith ranga div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Ranga Sharan Rohith' }).first());

  await heal(page, 'continue customer button', 'click', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));

  await heal(page, 'rohith ranga button', 'visible', null,
    () => page.getByRole('button', { name: 'Ranga Sharan Rohith', exact: true }));

  await heal(page, 'convert to estimate button', 'visible', null,
    () => page.locator('button').filter({ hasText: 'Convert to Estimate' }));

});
 