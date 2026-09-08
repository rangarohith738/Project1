import testData from '../test-data.json';
import { test, expect } from '@playwright/test';

test('Verify General Information fields can be edited after RFP creation @regression @set2', async ({ page }) => {
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

  const mineFilter = page.locator('//span[normalize-space()="Mine"]//following::button[1]');
  await expect(mineFilter).toBeVisible();
  await mineFilter.click();

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

  const editButton = page.locator('//button[@data-cy="estimateEditButton"]');
  await expect(editButton).toBeEnabled();
  await editButton.click();

  // 22. Edit Description textarea
  const estimateDescriptionTextarea = page.locator('//textarea[@name="deliverableItem.description"]');
  await expect(estimateDescriptionTextarea).toBeVisible();
  await expect(estimateDescriptionTextarea).toBeEnabled();
  await estimateDescriptionTextarea.fill(testData.estimate);
  await expect(estimateDescriptionTextarea).toHaveValue(testData.estimate);

  const printMethodInput = page.locator('//div[normalize-space()="Print Method"]/following-sibling::div//input');
  await expect(printMethodInput).toBeVisible();
  await expect(printMethodInput).toBeEnabled();
  await printMethodInput.click();
  await page.waitForTimeout(2000);
  const combinationListItem = page.locator('li[data-label="Combination"]');
  await expect(combinationListItem).toBeVisible();
  await page.waitForTimeout(2000);
  await combinationListItem.click();
  await page.waitForTimeout(2000);

  const saveButton = page.locator('button[x-tooltip="Save"]').first();
  await expect(saveButton).toBeVisible();
  await expect(saveButton).toBeEnabled();
  
  const cancelEditButton = page.locator('button[x-tooltip="Cancel"]').first();
  await expect(cancelEditButton).toBeVisible();
  
  await saveButton.click();

  const printMethodDiv = page.locator('//div[@id="info-estimate"]//div[normalize-space()="Print Method"]//following-sibling::div//span').first();
  await expect(printMethodDiv).toBeVisible();
  await page.waitForTimeout(5000);
  await expect(printMethodDiv).toHaveText('Combination');

  await expect(descriptionDiv).toContainText(testData.estimate);
});