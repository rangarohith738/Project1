import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../../helpers/sessionData');

test('Adding Opportunity plant @regression', async ({ page }) => {
  const session = prepareSession({ force: false });
  Object.assign(testData, session);
  const opportunityName = session.opportunityName || session.nameRequired;

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

  const opportunity = page.getByText(opportunityName, { exact: true }).first();
  await expect(opportunity).toBeVisible();
  await expect(opportunity).toBeEnabled();
  await opportunity.click();

  const editButton = page.locator('button[x-tooltip="Edit"]');
  await expect(editButton).toBeVisible();
  await expect(editButton).toBeEnabled();
  await editButton.click();

  const selectPlantButton = page.getByRole('button', { name: 'Select Plant', exact: true });
  await expect(selectPlantButton).toBeEnabled();
  await selectPlantButton.click();

  const pasoRoblesRadio = page.locator('input[name="selectedId"][type="radio"][value="29"]');
  await expect(pasoRoblesRadio).toBeVisible();
  await pasoRoblesRadio.check();
  await expect(pasoRoblesRadio).toBeChecked();

  const pasoRoblesLabel = page.locator('label').filter({ hasText: 'Paso Robles, CA' }).first();
  await expect(pasoRoblesLabel).toBeVisible();
  await expect(pasoRoblesLabel).toBeEnabled();
  await pasoRoblesLabel.click();

  const continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  const saveButton = page.locator('button[x-tooltip="Save"]').first();
  await expect(saveButton).toBeVisible();
  
  const cancelButton = page.locator('button[x-tooltip="Cancel"]').first();
  await expect(cancelButton).toBeVisible();
  
  await saveButton.click();
  
  await expect(editButton).toBeVisible();

  const pasoRoblesSummaryText = page.locator('span').filter({ hasText: 'Paso Robles, CA (33)' }).first();
  await expect(pasoRoblesSummaryText).toBeVisible();
});