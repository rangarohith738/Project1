import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Link Route in RFP @regression @set1', async ({ page }) => {
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
    .filter({ hasText: /^Rohith\'s Task Dashboard$/ })
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

    const toggleMyne = page.locator('//label[normalize-space()="Mine"]//following::button[1]');
    await toggleMyne.click();
  
    const filtersButton = page.getByRole('button', { name: 'Filters 0', exact: true });
    await expect(filtersButton).toBeEnabled();
    await filtersButton.click();
   
    const columnInput = page.locator('input[name="rows.0.column"][type="text"]').first();
    await columnInput.click();
   
    const statusListItem = page.locator('li[data-label="Status"]').first();
    await statusListItem.click();
   
    const operatorInput = page.locator('input[name="rows.0.operator"][type="text"]');
    await expect(operatorInput).toBeEnabled();
    await operatorInput.click();
   
    const containsListItem = page.locator('li[data-label="is"]');
    await containsListItem.click();
   
    const valueInput = page.locator('input[name="rows.0.value"][type="text"]');
    await expect(valueInput).toBeVisible();
    await expect(valueInput).toBeEnabled();
    await valueInput.click();
    const requestedOption = page.locator('li[data-label="Requested"]');
    await requestedOption.click();
   
    const applyButton = page.getByRole('button', { name: 'Apply', exact: true });
    await expect(applyButton).toBeEnabled();
    await applyButton.click();

    await expect(page.getByRole('button', { name: 'Filters 1', exact: true })).toBeVisible();

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
 
  const linkRoutesButton = page.getByRole('button', { name: 'Link Routes', exact: true });
  await expect(linkRoutesButton).toBeEnabled();
  await linkRoutesButton.click();
 
  const chooseProductRoutesHeading = page.locator('h3').filter({ hasText: 'Choose Product Routes' }).first();
  await expect(chooseProductRoutesHeading).toBeVisible();
 
  const checkbox7 = page.locator('[id="checkbox.input.7"]');
  await expect(checkbox7).toBeVisible();
  await checkbox7.check();
  await expect(checkbox7).toBeChecked();
 
  const checkbox7Text = page.locator('//*[@id="checkbox.input.7"]//ancestor::tr/td[2]//span/span[1]');
  const expectedText_7 = await checkbox7Text.textContent();
  console.log("checkbox7Text:", expectedText_7);
 
  const checkbox11 = page.locator('[id="checkbox.input.11"]');
  await expect(checkbox11).toBeVisible();
  await checkbox11.check();
  await expect(checkbox11).toBeChecked();

  const checkbox11Text = page.locator('//*[@id="checkbox.input.11"]//ancestor::tr/td[2]//span/span[1]');
  const expectedText_11 = await checkbox11Text.textContent();
  console.log("checkbox11Text:", expectedText_11);

  const continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();
 
  const saveLinksButton = page.getByRole('button', { name: 'Save Links', exact: true });
  await expect(saveLinksButton).toBeEnabled();
  await saveLinksButton.click();
  await expect(page.locator('p').filter({ hasText: 'Linked routes updated.' }).first()).toBeVisible();
  await expect(page.locator('td').filter({ hasText: expectedText_7 }).first()).toBeVisible();
  await expect(page.locator('td').filter({ hasText: expectedText_11 }).first()).toBeVisible();
  await page.reload();
  await expect(page.locator('td').filter({ hasText: expectedText_7 }).first()).toBeVisible();
  await expect(page.locator('td').filter({ hasText: expectedText_11 }).first()).toBeVisible();

});  