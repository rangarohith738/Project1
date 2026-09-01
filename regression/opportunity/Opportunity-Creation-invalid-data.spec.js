import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';

test('Opportunity creation with invalid data @regression', async ({ page }) => {
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

  // After navigation, assert the heading
  const newOpportunityHeading = page.locator('h2').filter({ hasText: /^New Opportunity$/ }).first();
  await expect(newOpportunityHeading).toBeVisible();

  const continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  const nameFieldRequiredAlert = page.getByText('The name field is required.', { exact: true });
  await expect(nameFieldRequiredAlert).toBeVisible();
});