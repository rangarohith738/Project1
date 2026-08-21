// Verify Summary icon on RFP Show page
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Verify Summary RFP @regression @set1', async ({ page }) => {
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

  const descriptionDiv = page.locator('//div[@id="info-estimate"]//div[normalize-space()="Description"]//following-sibling::div//span').first();
  await expect(descriptionDiv).toBeVisible();
  const descriptionContent = (await descriptionDiv.innerText()).trim();

  const summaryButton = page.locator('[data-cy="summary-button"]');
  await expect(summaryButton).toBeEnabled();
  await summaryButton.click();

  await page.waitForLoadState('domcontentloaded');

  const summaryHeading = page.locator('//h1[contains(normalize-space(), "Request for Proposal")]');
  await expect(summaryHeading).toBeVisible();
  await expect(summaryHeading).toContainText(`${rfpNumber}`);

  const descriptionValueSpan = page.locator('//div[@id="info-estimate"]//div[normalize-space()="Description"]//following-sibling::div//span').first();
  await expect(descriptionValueSpan).toBeVisible();
  await expect(descriptionValueSpan).toContainText(descriptionContent);
});