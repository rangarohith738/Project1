import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../../helpers/sessionData');

test('Creation of Opportunity @regression', async ({ page }) => {
  // Override session data whenever Creation runs; later tests reuse this name.
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → opportunityName: ${session.opportunityName}`);


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

  await page.waitForLoadState('domcontentloaded');

  const btn=page.locator('(//button[normalize-space()="Customer"])[1]')
  await btn.click();

  const opportunitiesLink = page.getByRole('link', { name: 'Opportunities', exact: true });
  await expect(opportunitiesLink).toBeVisible();
  await expect(opportunitiesLink).toBeEnabled();
  await opportunitiesLink.click();

  await page.waitForLoadState('domcontentloaded');

  const newOpportunityButton = page.getByRole('button', { name: 'New Opportunity', exact: true });
  await expect(newOpportunityButton).toBeEnabled();
  await newOpportunityButton.click();

  const nameRequiredInput = page.locator('input[name="project.name"][type="text"]');
  await expect(nameRequiredInput).toBeVisible();
  await expect(nameRequiredInput).toBeEditable();
  await nameRequiredInput.fill(session.opportunityName);

  const newOpportunityHeading = page.locator('h2').filter({ hasText: /^New Opportunity$/ }).first();
  await expect(newOpportunityHeading).toBeVisible();

  const formTab = page.locator('div').filter({ hasText: /^Form$/ }).first();
  await expect(formTab).toBeVisible();
  await expect(formTab).toBeEnabled();
  await formTab.click();

  const duplicateCheckTab = page.locator('div').filter({ hasText: /^Duplicate check$/ }).first();
  await expect(duplicateCheckTab).toBeVisible();
  await expect(duplicateCheckTab).toBeEnabled();
  await duplicateCheckTab.click();

  const previewTab = page.locator('div').filter({ hasText: /^Preview$/ }).first();
  await expect(previewTab).toBeVisible();
  await expect(previewTab).toBeEnabled();
  await previewTab.click();

  const selectCustomerButton = page.getByRole('button', { name: 'Select Customer', exact: true });
  await expect(selectCustomerButton).toBeVisible();

  const continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  await expect(duplicateCheckTab).toBeVisible();

  const yesAddRecordButton = page.getByRole('button', { name: 'Yes, add record', exact: true });
  await expect(yesAddRecordButton).toBeEnabled();
  await yesAddRecordButton.click();

  await page.waitForLoadState('domcontentloaded');
});