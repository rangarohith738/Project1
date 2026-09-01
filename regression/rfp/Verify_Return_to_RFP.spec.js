import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Return to RFP @regression @set1', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

  // 1. Go to login page
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  const signInWithEmailButton = page.locator('[data-cy="btnLoginVisible"]');
  await expect(signInWithEmailButton).toBeEnabled();
  await signInWithEmailButton.click();

  const emailInput = page.locator('input[name="email"][type="email"]');
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toBeEditable();
  await emailInput.fill(testData.email);

  const passwordInput = page.locator('input[name="password"][type="password"]');
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toBeEditable();
  await passwordInput.fill(testData.password);

  const loginConfirmButton = page.locator('[data-cy="btnLoginConfirm"]');
  await expect(loginConfirmButton).toBeEnabled();
  await loginConfirmButton.click();

  const estimateMenuLink = page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]');
  await expect(estimateMenuLink).toBeVisible();
  await estimateMenuLink.click();

  const rfpMenuLink = page.getByRole('link', { name: 'Request For Proposals', exact: true });
  await expect(rfpMenuLink).toBeVisible();
  await expect(rfpMenuLink).toBeEnabled();
  await rfpMenuLink.click();

  const mineFilter = page.locator('//label[normalize-space()="Mine"]');
  await expect(mineFilter).toBeVisible();
  await mineFilter.click();

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

  //Assertion Applying Filters
  await expect(page.getByRole('button', { name: 'Filters 1', exact: true })).toBeVisible();

  const firstRfpCell = page.locator('//tbody//tr[1]//td[2]');
  await expect(firstRfpCell).toBeVisible();
  const rfpNumber = (await firstRfpCell.innerText()).trim();
  await firstRfpCell.click();
  await page.waitForTimeout(2000);

  const proposalTitleSpan = page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first();
  await expect(proposalTitleSpan).toBeVisible();

  const specificationsTab = page.locator('//button[normalize-space()="Specifications"]');
  await expect(specificationsTab).toBeVisible();
  await expect(specificationsTab).toBeEnabled();
  await specificationsTab.click();

  const editButton = page.locator('//button[@data-cy="edit-button"]');
  await expect(editButton).toBeVisible();
  await expect(editButton).toBeEnabled();
  await editButton.click();

  const editPage =await page.locator('//label[contains(normalize-space(), "Edit Request for Proposal")]');
  await expect(editPage).toBeVisible();
  const rfpid=rfpNumber.split('RFP')[1];
  await expect(editPage).toContainText(rfpid);

  const returnToRfpButton = page.getByRole('link', { name: 'Return to Request for Proposal', exact: true }).first();
  await expect(returnToRfpButton).toBeVisible();
  await expect(returnToRfpButton).toBeEnabled();
  await returnToRfpButton.click();

  await expect(proposalTitleSpan).toBeVisible();
  const proposalTitle = page.locator(`//span[@x-tooltip="${rfpNumber}-Request for Proposal"]/p`);
  await expect(proposalTitle).toBeVisible();

});