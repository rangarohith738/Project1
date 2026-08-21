// StatusChangeFromDraft_to_Requested
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';

test('Draft to Requested @regression @set1', async ({ page}) => {
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
  const requestedOption = page.locator('li[data-label="Draft"]');
  await requestedOption.click();

  const applyButton = page.getByRole('button', { name: 'Apply', exact: true });
  await expect(applyButton).toBeEnabled();
  await applyButton.click();

  //Assertion Applying Filters
  await expect(page.getByRole('button', { name: 'Filters 1', exact: true })).toBeVisible();
 
  const draftCell = page.locator('td').filter({ hasText: 'Draft' }).first();
  await expect(draftCell).toBeVisible();
  await draftCell.click();
 
  const statusDraftDiv = page.locator('div').filter({ hasText: 'Status Draft' }).first();
  await expect(statusDraftDiv).toBeVisible();
  await expect(statusDraftDiv).toBeEnabled();
  await statusDraftDiv.click();
 
  const estimateEditButton = page.locator('[data-cy="estimateEditButton"]');
  await expect(estimateEditButton).toBeEnabled();
  await estimateEditButton.click();
 
  const statusInput = page.locator('input[name="status"][type="text"]');
  await expect(statusInput).toBeVisible();
  await statusInput.click();
 
  const requestedListItem = page.locator('li[data-label="Requested"]');
  await expect(requestedListItem).toBeVisible();
  await expect(requestedListItem).toBeEnabled();
  await requestedListItem.click();
 
  const estimateSaveButton =page.locator('button[x-tooltip="Save"]').first();
  await expect(estimateSaveButton).toBeEnabled();
  await estimateSaveButton.click();
 
  const estimateUpdatedMessage = page.locator('p').filter({ hasText: 'Estimate updated successfully.' }).first();
  await expect(estimateUpdatedMessage).toBeVisible();
 
  await expect(estimateEditButton).toBeEnabled();
  await estimateEditButton.click();
 
  await expect(statusInput).toBeVisible();

  const statusRequestedDiv = page.locator('div').filter({ hasText: 'Status Requested' }).first();
  await expect(statusRequestedDiv).toBeVisible();

  const estimateSaveButton_2 =page.locator('button[x-tooltip="Save"]').first();
  await expect(estimateSaveButton_2).toBeEnabled();
  await estimateSaveButton_2.click();

 const draftIcon = page.locator(
  '//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]');
await expect(draftIcon).not.toBeVisible;
await expect(draftIcon).toHaveCount(0);

});