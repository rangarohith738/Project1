// Add OptionCharges in RFP TestCase_19
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Add Option Charges in RFP @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: false });
  Object.assign(testData, session);
  console.log(`[data] Reusing session → nameRequired: ${session.nameRequired}`);

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

  async function applying_filters() {

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
  
    //Assertion Applying Filters
    await expect(page.getByRole('button', { name: 'Filters 1', exact: true }) ).toBeVisible();
  
    
}
  await applying_filters();

  const firstRfpCell = page.locator('//tbody//tr[1]//td[2]');
  await expect(firstRfpCell).toBeVisible();
  const rfpNumber = (await firstRfpCell.innerText()).trim();
  await firstRfpCell.click();
  await page.waitForTimeout(2000);

  const proposalTitleSpan = page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first();
  await expect(proposalTitleSpan).toBeVisible();

  const linkOptionsButton = page.getByRole('button', { name: 'Link Options', exact: true });
  await expect(linkOptionsButton).toBeEnabled();
  await linkOptionsButton.click();
 
  const chooseOptionHeading = page.locator('h3').filter({ hasText: 'Choose Option' }).first();
  await expect(chooseOptionHeading).toBeVisible();
 
  const horizontalPerfCheckbox = page.locator('//label[normalize-space()="Horizontal Perf"]/input');
  await horizontalPerfCheckbox.check();
  await expect(horizontalPerfCheckbox).toBeChecked();
 
  const verticalPerfCheckbox = page.locator('//label[normalize-space()="Screen Print"]/input');
  await verticalPerfCheckbox.check();
  await expect(verticalPerfCheckbox).toBeChecked();
 
  const continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();
 
  const horizontalPerfOptionRow = page.locator('span').filter({ hasText: '19 - Horizontal Perf' }).first();
  await expect(horizontalPerfOptionRow).toBeEnabled();
  await horizontalPerfOptionRow.click();
 
  const verticalPerfOptionSpan = page.locator('span').filter({ hasText: '15 - Screen Print' }).first();
  await expect(verticalPerfOptionSpan).toBeEnabled();
  await verticalPerfOptionSpan.click();
 
  const flatCost19Input = page.locator('input[name="editingEstimateOptions.19.flat_cost"][type="text"]');
  await expect(flatCost19Input).toBeEditable();
  await flatCost19Input.fill(testData.editFlatCost);
 
  const costPerEach19Input = page.locator('input[name="editingEstimateOptions.19.cost_per_each"][type="text"]');
  await expect(costPerEach19Input).toBeEditable();
  await costPerEach19Input.fill(testData.costPerEach);
 
  const costPerUnitSet19Input = page.locator('input[name="editingEstimateOptions.19.cost_per_unit_set"][type="text"]');
  await expect(costPerUnitSet19Input).toBeEditable();
  await costPerUnitSet19Input.fill(testData.costPerUnitSet);
 
  const flatCost17Input = page.locator('input[name="editingEstimateOptions.15.flat_cost"][type="text"]');
  await flatCost17Input.fill(testData.editFlatCost);
 
  const costPerEach17Input = page.locator('input[name="editingEstimateOptions.15.cost_per_each"][type="text"]');
  await expect(costPerEach17Input).toBeEditable();
  await costPerEach17Input.fill(testData.costPerEach);
 
  const costPerUnitSet17Input = page.locator('input[name="editingEstimateOptions.15.cost_per_unit_set"][type="text"]');
  await expect(costPerUnitSet17Input).toBeEditable();
  await costPerUnitSet17Input.fill(testData.costPerUnitSet);
 
  const saveEstimateOptionsButton = page.locator('button[x-tooltip="Save"][wire\\:click="saveEstimateOptions"]');
  await expect(saveEstimateOptionsButton).toBeEnabled();
  await saveEstimateOptionsButton.scrollIntoViewIfNeeded();
  await saveEstimateOptionsButton.click({ force: true });
 
  const optionsUpdatedMsg = page.locator('p').filter({ hasText: 'Options Updated Successfully' }).first();
  await expect(optionsUpdatedMsg).toBeVisible();

  const summaryHorizontalPerfDiv = page.locator('div').filter({ hasText: '19 - Horizontal Perf' }).first();
  await expect(summaryHorizontalPerfDiv).toBeVisible();
  await expect(summaryHorizontalPerfDiv).toBeEnabled();

  const summaryVerticalPerfDiv = page.locator('div').filter({ hasText: '15 - Screen Print' }).first();
  await expect(summaryVerticalPerfDiv).toBeVisible();
 
});