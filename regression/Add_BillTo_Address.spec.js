import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Add Bill To Address in RFP @regression @set2', async ({ page }) => {
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

  const editButton = page.locator('(//div[normalize-space()="Bill To"])[1]//following-sibling::button');
  await expect(editButton).toBeEnabled();
  await editButton.click();

  const customerAddressDiv = page.locator('(//span[@x-tooltip="Choose"])[2]');
  await expect(customerAddressDiv).toBeVisible();
  await expect(customerAddressDiv).toBeEnabled();
  
  const selectAddressButton = page.getByRole('button', { name: 'Select Address', exact: true });
  const unlinkButton = page.getByRole('button', { name: 'Unlink', exact: true });

  if(!(await selectAddressButton.isVisible())) {
    await customerAddressDiv.click();
    await expect(unlinkButton).toBeEnabled();
    await unlinkButton.click();
  }
  
  await expect(selectAddressButton).toBeEnabled();
  await selectAddressButton.click();

  // New Address is no longer on RFP show page — kept for later
  // const newAddressButton = page.locator('(//button[normalize-space()="New Address"])[2]');
  // await expect(newAddressButton).toBeEnabled();
  // await newAddressButton.click();
  //
  // const addressLine1Input = page.locator('//input[@placeholder="Enter Address Line 1"]').first();
  // await expect(addressLine1Input).toBeVisible();
  // await expect(addressLine1Input).toBeEnabled();
  // await addressLine1Input.fill(testData.addressLine1);
  // const addressPincodeInput = page.locator('//input[@placeholder="Enter Postal Code"]').first();
  // await expect(addressPincodeInput).toBeVisible();
  // await expect(addressPincodeInput).toBeEnabled();
  // await addressPincodeInput.fill(testData.postalCode);
  //
  // const saveButton = page.locator('//button[@data-cy="address-drawer-save"]//span[normalize-space()="Save"]').first();
  // await expect(saveButton).toBeEnabled();
  // await saveButton.click();
  //
  // const billToAddressText = page.locator('(//div[normalize-space()="Bill To"])[1]//..//span[@class="text-right"]').first();
  // await expect(billToAddressText).toBeVisible();
  // const billToAddress = (await billToAddressText.innerText()).trim();
  // console.log('billToAddress', billToAddress);
  // await expect(billToAddressText).toContainText(testData.addressLine1);

  // selecting existing address

  const firstRadio = page.locator('input[type="radio"][name="selectedId"]').first();

  await expect(firstRadio).toBeVisible();
  await firstRadio.check();

  const continueDialogButton = page.locator('//div[@label="Choose Address"]//..//button[normalize-space()="Continue"]').first();
  await expect(continueDialogButton).toBeEnabled();
  await continueDialogButton.click();

  const saveBillToAddressButton = page.locator('(//button[@x-tooltip="Save"])[2]').first();
  await expect(saveBillToAddressButton).toBeEnabled();
  await saveBillToAddressButton.click();
});
