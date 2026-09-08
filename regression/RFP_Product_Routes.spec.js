// TestCase_20 — RFP Product Routes section is displayed
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Verify RFP Product Routes @regression @set1', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

  // Initial navigation and login
  await page.goto(testData.url);

  const signInWithEmailButton = page.locator('[data-cy="btnLoginVisible"]');
  await expect(signInWithEmailButton).toBeVisible();
  await expect(signInWithEmailButton).toBeEnabled();
  await signInWithEmailButton.click();

  const emailInput = page.locator('input[name="email"][type="email"]');
  await expect(emailInput).toBeEnabled();
  await emailInput.click();
  await emailInput.fill(testData.email);

  const passwordInput = page.locator('input[name="password"][type="password"]');
  await expect(passwordInput).toBeEnabled();
  await passwordInput.click();
  await passwordInput.fill(testData.password);

  const confirmSignInButton = page.locator('[data-cy="btnLoginConfirm"]');
  await expect(confirmSignInButton).toBeEnabled();
  await confirmSignInButton.click();

  // Dashboard navigation
  const taskDashboardLabel = page
    .locator('label')
    .filter({ hasText: /^Ranga\'s Task Dashboard$/ })
    .first();

  await expect(taskDashboardLabel).toBeVisible();
  await expect(taskDashboardLabel).toBeEnabled();

  const btn = page.locator(
    '(//button[normalize-space()="Estimating & Pricing"])[1]'
  );

  await btn.click();

  // Request For Proposals navigation
  const requestForProposalsLink = page.getByRole('link', {
    name: 'Request For Proposals',
    exact: true
  });

  await expect(requestForProposalsLink).toBeVisible();
  await expect(requestForProposalsLink).toBeEnabled();
  await requestForProposalsLink.click();

  // Request for Proposals Queue
  const rfpQueueLabel = page
    .locator('label')
    .filter({ hasText: /^Request for Proposals Queue$/ })
    .first();

  await expect(rfpQueueLabel).toBeVisible();
  await expect(rfpQueueLabel).toBeEnabled();
  await rfpQueueLabel.click();

  await page.waitForLoadState('domcontentloaded');

  async function applying_filters() {

    const toggleMyne = page.locator('//span[normalize-space()="Mine"]//following::button[1]');
    await toggleMyne.click();
  
    const filtersButton = page.getByRole('button', { name: 'Filters 0', exact: true });
    await expect(filtersButton).toBeEnabled();
    await filtersButton.click();
   
    const columnSelect = page.locator('select[data-flux-select-native][x-model="selection.column"]').first();
    await columnSelect.selectOption("status");

    const operatorSelect = page.locator("xpath=//div[normalize-space(.)='Operator is equal tocontains']//select");
    await operatorSelect.selectOption("is equal to");

    const valueSelect = page.locator("xpath=//option[normalize-space(.)='Value']/ancestor::select");
    await valueSelect.selectOption("requested");
   
    const applyButton = page.getByRole('button', { name: 'Apply', exact: true });
    await expect(applyButton).toBeEnabled();
    await applyButton.click();

    await expect(page.getByRole('button', { name: 'Filters 1', exact: true })).toBeVisible();
}
  await applying_filters();
  const firstRfpCell = page.locator('//tbody//tr[1]//td[2]');
  await expect(firstRfpCell).toBeVisible();
  const rfpNumber = (await firstRfpCell.innerText()).trim();
  await firstRfpCell.click();
  await page.waitForTimeout(2000);

  const proposalTitleSpan = page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first();
  await expect(proposalTitleSpan).toBeVisible();

  const linksTabButton = page.locator('[data-cy="hub-tab-links"]');
  await expect(linksTabButton).toBeVisible();
  await expect(linksTabButton).toBeEnabled();
  await linksTabButton.click();

  const productRoutesHeading = page.locator('h3').filter({ hasText: 'Product Routes'}).first();
  await expect(productRoutesHeading).toBeVisible();
 
  await expect(page.locator('th').filter({ hasText: 'CODE | ROUTE' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'CUSTOMER PART NUMBER' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'PRODUCT CLASS'}).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'PRODUCT SUMMARY' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'DESCRIPTION' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'ART SET STATUS' }).first()).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'LATEST PREPRESS REQUEST' }).first()).toBeVisible();
 
});