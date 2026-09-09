import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { generateDynamicFields } = require('../../helpers/dynamicData');

test('Cancel opportunity creation via close drawer @regression', async ({ page }) => {
  const { opportunityName, projectDescription } = generateDynamicFields();

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

  await page.waitForLoadState('domcontentloaded');

  const btn = page.locator('(//button[normalize-space()="Customer"])[1]');
  await expect(btn).toBeEnabled();
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
  await projectNameInput.fill(opportunityName);

  const projectDescriptionInput = page.locator('textarea[name="project.description"]');
  await expect(projectDescriptionInput).toBeVisible();
  await expect(projectDescriptionInput).toBeEditable();
  await projectDescriptionInput.fill(projectDescription);

  const selectCustomerButton = page.getByRole('button', { name: 'Select Customer', exact: true });
  await expect(selectCustomerButton).toBeEnabled();
  await selectCustomerButton.click();

  const quickSearchInput = page.locator("//span[normalize-space()='Customer Only']/ancestor::div[3]//input[@placeholder='Quick Search']");
  await expect(quickSearchInput).toBeVisible();
  await expect(quickSearchInput).toBeEditable();
  await quickSearchInput.fill(testData.quickSearch);

  const charlesLecrecCell = page.locator('td').filter({ hasText: 'Charles Lecrec' }).first();
  await expect(charlesLecrecCell).toBeVisible();
  await expect(charlesLecrecCell).toBeEnabled();
  await page.waitForTimeout(4000);
  await charlesLecrecCell.click();

  const unlinkButton = page.getByRole('button', { name: 'Unlink', exact: true });
  await expect(unlinkButton).toBeVisible();
  await expect(unlinkButton).toBeEnabled();

  const continueButton = page.getByRole('button', { name: 'Continue', exact: true }).first();
  await expect(continueButton).toBeVisible();
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  const selectedCustomerButton = page.getByRole('button', { name: 'Charles Lecrec', exact: true });
  await expect(selectedCustomerButton).toBeVisible();
  await expect(selectedCustomerButton).toBeEnabled();

  const closedDrawerButton = page.locator('//h2[normalize-space()="New Opportunity"]//parent::div/parent::div//span[text()="Close drawer"]');
  await expect(closedDrawerButton).toBeVisible();
  await expect(closedDrawerButton).toBeEnabled();
  await page.waitForTimeout(3000);
  await closedDrawerButton.click();

  const discardChangesButton = page.locator('//button[normalize-space()="Discard changes"]').first();
  await page.waitForTimeout(3000);
  await expect(discardChangesButton).toBeVisible();
  await expect(discardChangesButton).toBeEnabled();
  await discardChangesButton.click();

  const opportunitiesQuickSearchInput = page.getByPlaceholder('Quick Search');
  await page.waitForTimeout(3000);
  await expect(opportunitiesQuickSearchInput).toBeVisible();
  await opportunitiesQuickSearchInput.fill(opportunityName);

  const noResultsCell = page.locator('td').filter({ hasText: /^No results found\.$/ }).first();
  await expect(noResultsCell).toBeVisible();
});
