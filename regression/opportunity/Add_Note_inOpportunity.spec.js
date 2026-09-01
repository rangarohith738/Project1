import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';

test('Add note in Opportunity @regression', async ({ page }) => {
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

  const charles12Row = page.getByText('demo', { exact: true }).first();
  await expect(charles12Row).toBeVisible();
  await expect(charles12Row).toBeEnabled();
  await charles12Row.click();

  const noNotesYetSection = page.locator('div').filter({ hasText: "This record doesn't have any notes associated yet" }).first();
  await expect(noNotesYetSection).toBeVisible();

  const newNoteButton = page.getByRole('button', { name: 'New Note', exact: true }).first();
  await expect(newNoteButton).toBeEnabled();
  await newNoteButton.click();

  const noteEditor = page.locator('.ql-editor');
  await expect(noteEditor).toBeVisible();
  await expect(noteEditor).toBeEditable();
  await noteEditor.fill(testData.awaitPageLocatorQlEditorFill);

  const saveNoteButton = page.locator('button[x-tooltip="Save"][wire\\:click="create"]');
  await expect(saveNoteButton).toBeEnabled();
  await saveNoteButton.scrollIntoViewIfNeeded();
  await saveNoteButton.click({ force: true });

  // const noteDate = page.locator('div').filter({ hasText: /^8\/6\/26 6:00 PM$/ }).first();
  // await expect(noteDate).toBeVisible();

  const noteAuthor = page.locator('div').filter({ hasText: 'Rohith Ranga' }).first();
  await expect(noteAuthor).toBeVisible();

  const noteContent = page.locator('div').filter({ hasText: 'Hello' }).first();
  await expect(noteContent).toBeVisible();

  const editNoteButton = page.locator('[data-cy="card-note-edit"]');
  await expect(editNoteButton).toBeEnabled();
  await editNoteButton.click();
});