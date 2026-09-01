import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../../helpers/sessionData');

test('Cancel opportunity creation @regression', async ({ page }) => {
  const session = prepareSession({ force: false });
  Object.assign(testData, session);
  if (session.opportunityName) testData.nameRequired = session.opportunityName;

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

  const signInConfirmButton = page.locator('[data-cy="btnLoginConfirm"]');
  await expect(signInConfirmButton).toBeEnabled();
  await signInConfirmButton.click();

  const btn=page.locator('(//button[normalize-space()="Customer"])[1]')
  await btn.click();
 
  const opportunitiesLink = page.getByRole('link', { name: 'Opportunities', exact: true });
  await expect(opportunitiesLink).toBeVisible();
  await expect(opportunitiesLink).toBeEnabled();
  await opportunitiesLink.click();

  const newOpportunityButton = page.getByRole('button', { name: 'New Opportunity', exact: true });
  await expect(newOpportunityButton).toBeEnabled();
  await newOpportunityButton.click();

  const projectNameInput = page.locator('input[name="project.name"][type="text"]');
  await expect(projectNameInput).toBeVisible();
  await expect(projectNameInput).toBeEditable();
  await projectNameInput.fill(testData.nameRequired);

  const projectDescriptionInput = page.locator('textarea[name="project.description"]');
  await expect(projectDescriptionInput).toBeVisible();
  await expect(projectDescriptionInput).toBeEditable();
  await projectDescriptionInput.fill(testData.projectDescription);

  const selectCustomerButton = page.getByRole('button', { name: 'Select Customer', exact: true });
  await expect(selectCustomerButton).toBeEnabled();
  await selectCustomerButton.click();

  const quickSearchInput = page.getByPlaceholder('Quick Search');
  await expect(quickSearchInput).toBeVisible();
  await expect(quickSearchInput).toBeEditable();
  await quickSearchInput.fill(testData.quickSearch);

  const charlesLecrecCell = page.locator('td').filter({ hasText: /^Charles Lecrec$/ }).first();
  await expect(charlesLecrecCell).toBeVisible();
  await expect(charlesLecrecCell).toBeEnabled();
  await charlesLecrecCell.click();

  const charlesLecrecSummary = page.locator('div').filter({ hasText: /^Charles Lecrec$/ }).first();
  await expect(charlesLecrecSummary).toBeVisible();
  await expect(charlesLecrecSummary).toBeEnabled();
  await charlesLecrecSummary.click();

  const unlinkButton = page.getByRole('button', { name: 'Unlink', exact: true });
  await expect(unlinkButton).toBeVisible();
  await expect(unlinkButton).toBeEnabled();
  await unlinkButton.click();

  const continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  await expect(continueButton).toBeVisible();
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  const selectedCustomerButton = page.getByRole('button', { name: 'Charles Lecrec', exact: true });
  await expect(selectedCustomerButton).toBeVisible();
  await expect(selectedCustomerButton).toBeEnabled();
  await selectedCustomerButton.click();

  const cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
  await expect(cancelButton).toBeVisible();
  await expect(cancelButton).toBeEnabled();
  await cancelButton.click();

  await expect(quickSearchInput).toBeVisible();
  await quickSearchInput.fill(testData.nameRequired);

  const noResultsCell = page.locator('td').filter({ hasText: /^No results found\.$/ }).first();
  await expect(noResultsCell).toBeVisible();

});