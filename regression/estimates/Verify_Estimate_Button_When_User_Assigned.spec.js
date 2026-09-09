// Covers both estimate-button workflows:
// 1) Convert to Estimate is disabled until a user is assigned, then enabled
// 2) Convert to Estimate creates a Draft estimate
import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../../helpers/sessionData');

test('Verify Estimate button enable and convert when user assigned @regression @set1', async ({ page }) => {
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

    const addAFilterButton = page.locator('p').filter({ hasText: 'Add A Filter' });
  await addAFilterButton.click();

  const secondColumnInput = page.locator('input[name="rows.1.column"][type="text"]');
  await expect(secondColumnInput).toBeVisible();
  await expect(secondColumnInput).toBeEnabled();
  await secondColumnInput.click();

  const assignedToListItem = page.locator('li[data-label="Assigned To"]').nth(1);
await expect(assignedToListItem).toBeVisible();
await assignedToListItem.click();

  const secondOperatorInput = page.locator('input[name="rows.1.operator"][type="text"]');
  await secondOperatorInput.click();

  const emptyListItem = page.locator('li[data-label="empty"]').nth(1);
  await emptyListItem.click();

    const applyButton = page.getByRole('button', { name: 'Apply', exact: true });
    await expect(applyButton).toBeEnabled();
    await applyButton.click();

    await expect(page.getByRole('button', { name: 'Filters 2', exact: true })).toBeVisible();
    await page.waitForTimeout(3000);

  const firstRfpCell = page.locator('//tbody//tr[1]//td[2]');
  await expect(firstRfpCell).toBeVisible();
  const rfpNumber = (await firstRfpCell.innerText()).trim();
  await firstRfpCell.click();
  await page.waitForTimeout(2000);

  const proposalTitleSpan = page.locator('span').filter({ hasText: `${rfpNumber} - Request for Proposal` }).first();
  await expect(proposalTitleSpan).toBeVisible();

  // Workflow 1: button disabled when unassigned, enabled after assign
  const convertToEstimateButton_not_visible = page.locator('button').filter({ hasText: 'Convert to Estimate' });
  await expect(convertToEstimateButton_not_visible).not.toBeEnabled();

  const selectUserButton = page.locator('xpath=(//button[normalize-space()="Select User"])[1]')
  await expect(selectUserButton).toBeVisible();
  await selectUserButton.click();

  const rohithRangaCell = page.locator('td').filter({ hasText: 'Rohith Ranga' }).first();
  await expect(rohithRangaCell).toBeVisible();
  await rohithRangaCell.click();

  const rohithRangaDiv = page.locator('div').filter({ hasText: 'Rohith Ranga' }).first();
  await expect(rohithRangaDiv).toBeVisible();

  const continueCustomerButton = page.getByRole('button', { name: 'Continue', exact: true });
  await expect(continueCustomerButton).toBeEnabled();
  await continueCustomerButton.click();

  const rohithRangaButton = page.getByRole('button', { name: 'Rohith Ranga', exact: true });
  await expect(rohithRangaButton).toBeVisible();

  const convertToEstimateButton = page.locator('button').filter({ hasText: 'Convert to Estimate' });
  await expect(convertToEstimateButton).toBeVisible();
  await expect(convertToEstimateButton).toBeEnabled();

  // Workflow 2: convert RFP to a Draft estimate
  await convertToEstimateButton.click();

  const convertToEstimateModalText = page.locator('div').filter({ hasText: 'Convert to Estimate Are you sure you want to convert this Request for Proposal to an Estimate'}).first();
  await expect(convertToEstimateModalText).toBeVisible();

  const confirmButton = page.locator('[data-cy="confirm"]');
  await expect(confirmButton).toBeEnabled();
  await confirmButton.click();
  await page.waitForTimeout(3000);

  const newEstimateLink = page.getByRole('link', { name: 'New Estimate', exact: true });
  await expect(newEstimateLink).toBeVisible();


  const detailsSection = page.locator('div').filter({ hasText: 'Details' }).first();
  await expect(detailsSection).toBeVisible();

  const statusDraftText = page.locator('div').filter({ hasText: 'Status Draft' }).first();
  await expect(statusDraftText).toBeVisible();

  const draftIcon = page.locator(
    '//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]');
  await expect(draftIcon).toBeVisible();
  await expect(draftIcon).toHaveCount(1);
 
});
 