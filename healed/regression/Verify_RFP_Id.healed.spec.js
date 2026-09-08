//Verify_RFP_NUMBER_GENERATION (testcase-5)
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession, saveSession } = require('../../helpers/sessionData');

test('Verify RFP Id in RFP Queue @regression @set1', async ({ page }) => {

  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  await heal(page, 'sign in with email button', 'click', null,
    () => page.locator('[data-cy="btnLoginVisible"]'));

  await heal(page, 'email field', 'visible', null,
    () => page.locator('input[name="email"][type="email"]'));
  await heal(page, 'email field', 'fill', testData.email,
    () => page.locator('input[name="email"][type="email"]'));

  await heal(page, 'password field', 'visible', null,
    () => page.locator('input[name="password"][type="password"]'));
  await heal(page, 'password field', 'fill', testData.password,
    () => page.locator('input[name="password"][type="password"]'));

  await heal(page, 'sign in confirm button', 'click', null,
    () => page.locator('[data-cy="btnLoginConfirm"]'));

  await heal(page, 'estimate menu link', 'visible', null,
    () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));
  await heal(page, 'estimate menu link', 'click', null,
    () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));

  await heal(page, 'rfp menu link', 'visible', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));
  await heal(page, 'rfp menu link', 'click', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));

  await heal(page, 'new rfp link', 'visible', null,
    () => page.getByRole('link', { name: 'New Request for Proposal', exact: true }));
  await heal(page, 'new rfp link', 'click', null,
    () => page.getByRole('link', { name: 'New Request for Proposal', exact: true }));

  await heal(page, 'select customer button', 'click', null,
    () => page.getByRole('button', { name: 'Select Customer', exact: true }));

  await heal(page, 'quick search field', 'visible', null,
    () => page.getByPlaceholder('Quick Search').first());
  await heal(page, 'quick search field', 'fill', testData.quickSearch,
    () => page.getByPlaceholder('Quick Search').first());

  await heal(page, 'customer cell', 'visible', null,
    () => page.locator('td').filter({ hasText: 'Charles Lecrec' }).first());
  await heal(page, 'customer cell', 'click', null,
    () => page.locator('td').filter({ hasText: 'Charles Lecrec' }).first());

  await heal(page, 'customer div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Charles Lecrec' }).first());
  await heal(page, 'customer div', 'click', null,
    () => page.locator('div').filter({ hasText: 'Charles Lecrec' }).first());

  await heal(page, 'unlink button', 'visible', null,
    () => page.getByRole('button', { name: 'Unlink', exact: true }));
  await heal(page, 'cancel button', 'visible', null,
    () => page.getByRole('button', { name: 'Cancel', exact: true }));

  await heal(page, 'continue customer button', 'click', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));

  await page.waitForTimeout(2000);
  await heal(page, 'project radio', 'visible', null,
    () => page.locator('#projectselect').last());
  await heal(page, 'project radio', 'check', null,
    () => page.locator('#projectselect').last());
  await expect(page.locator('#projectselect').last()).toBeChecked();

  await heal(page, 'opportunity name field', 'visible', null,
    () => page.locator('//input[@placeholder="Enter the opportunity name"]'));
  await heal(page, 'opportunity name field', 'fill', testData.nameRequired,
    () => page.locator('//input[@placeholder="Enter the opportunity name"]'));

  await heal(page, 'opportunity description field', 'visible', null,
    () => page.locator('//input[contains(@name,"project_description")]'));
  await heal(page, 'opportunity description field', 'fill', testData.description,
    () => page.locator('//input[contains(@name,"project_description")]'));

  await heal(page, 'pricing table presets fieldset', 'visible', null,
    () => page.locator('fieldset').filter({ hasText: 'Pricing Table Presets' }).first());
  await heal(page, 'pricing table presets fieldset', 'click', null,
    () => page.locator('fieldset').filter({ hasText: 'Pricing Table Presets' }).first());

  await heal(page, 'sales unit field', 'visible', null,
    () => page.locator('//input[contains(@name,"quantityUnitId")]'));
  await heal(page, 'sales unit field', 'click', null,
    () => page.locator('//input[contains(@name,"quantityUnitId")]'));
  await heal(page, 'feet option', 'visible', null,
    () => page.locator('li[data-label="Feet"]'));
  await heal(page, 'feet option', 'click', null,
    () => page.locator('li[data-label="Feet"]'));

  await heal(page, 'quantity break 1 field', 'visible', null,
    () => page.locator('input[name="deliverableItemDTO.extension.quantityBreak1"][type="text"]'));
  await heal(page, 'quantity break 1 field', 'fill', testData.quantityBreak1,
    () => page.locator('input[name="deliverableItemDTO.extension.quantityBreak1"][type="text"]'));

  await heal(page, 'quoting options fieldset', 'visible', null,
    () => page.locator('fieldset').filter({ hasText: 'Quoting Options' }).first());
  await heal(page, 'quoting options fieldset', 'click', null,
    () => page.locator('fieldset').filter({ hasText: 'Quoting Options' }).first());

  await heal(page, 'max colors field', 'visible', null,
    () => page.locator('input[name="deliverableItemDTO.extension.maxColorsToQuote"][type="text"]'));
  await heal(page, 'max colors field', 'click', null,
    () => page.locator('input[name="deliverableItemDTO.extension.maxColorsToQuote"][type="text"]'));
  if (!(await page.locator('li[data-label="2"]').isVisible())) {
    await heal(page, 'max colors field', 'click', null,
      () => page.locator('input[name="deliverableItemDTO.extension.maxColorsToQuote"][type="text"]'));
  }
  await heal(page, 'six colors option', 'visible', null,
    () => page.locator('li[data-label="2"]'));
  await heal(page, 'six colors option', 'click', null,
    () => page.locator('li[data-label="2"]'));

  await heal(page, 'general info div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'General Information' }).first());
  await heal(page, 'general info div', 'click', null,
    () => page.locator('div').filter({ hasText: 'General Information' }).first());

  await heal(page, 'product class field', 'visible', null,
    () => page.locator('input[name="deliverableItemDTO.productClassId"][type="text"]'));
  await heal(page, 'product class field', 'click', null,
    () => page.locator('input[name="deliverableItemDTO.productClassId"][type="text"]'));
  await heal(page, 'rfid label option', 'visible', null,
    () => page.locator('li[data-label="RFID Label"]'));
  await heal(page, 'rfid label option', 'click', null,
    () => page.locator('li[data-label="RFID Label"]'));

  await heal(page, 'workflow field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.workflowId"][type="text"]'));
  await heal(page, 'workflow field', 'click', null,
    () => page.locator('input[name="deliverableItemSpecification.workflowId"][type="text"]'));
  await heal(page, 'rfid workflow option', 'visible', null,
    () => page.locator('li[data-label="RFID Digital Workflow"]'));
  await heal(page, 'rfid workflow option', 'click', null,
    () => page.locator('li[data-label="RFID Digital Workflow"]'));

  await heal(page, 'plant field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.plantId"][type="text"]'));
  await heal(page, 'plant field', 'click', null,
    () => page.locator('input[name="deliverableItemSpecification.plantId"][type="text"]'));
  await heal(page, 'fortis option', 'visible', null,
    () => page.locator('li[data-label="Fortis (99)"]'));
  await heal(page, 'fortis option', 'click', null,
    () => page.locator('li[data-label="Fortis (99)"]'));

  await heal(page, 'estimate description textarea', 'visible', null,
    () => page.locator('//label[@for="deliverableItemDTO.description"]/following-sibling::div/textarea'));
  await heal(page, 'estimate description textarea', 'click', null,
    () => page.locator('//label[@for="deliverableItemDTO.description"]/following-sibling::div/textarea'));
  await heal(page, 'estimate description textarea', 'fill', testData.descriptionRequired,
    () => page.locator('//label[@for="deliverableItemDTO.description"]/following-sibling::div/textarea'));

  await heal(page, 'unit set field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.unitSetTypeId"][type="text"]'));
  await heal(page, 'unit set field', 'click', null,
    () => page.locator('input[name="deliverableItemSpecification.unitSetTypeId"][type="text"]'));
  await heal(page, 'roll option', 'visible', null,
    () => page.locator('li[data-label="Rolls/Boxed"]'));
  await heal(page, 'roll option', 'click', null,
    () => page.locator('li[data-label="Rolls/Boxed"]'));

  await heal(page, 'core diameter field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.coreDiameterId"][type="text"]'));
  await heal(page, 'core diameter field', 'click', null,
    () => page.locator('input[name="deliverableItemSpecification.coreDiameterId"][type="text"]'));
  await heal(page, 'one inch option', 'visible', null,
    () => page.locator('(//li[@data-label="1"])[2]'));
  await heal(page, 'one inch option', 'click', null,
    () => page.locator('(//li[@data-label="1"])[2]'));

  await heal(page, 'application temp field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.applicationTemp"][type="text"]'));
  await heal(page, 'application temp field', 'fill', testData.applicationTempRequired,
    () => page.locator('input[name="deliverableItemSpecification.applicationTemp"][type="text"]'));

  await heal(page, 'surface type field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.applicationSurfaceTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'surface type field', 'click', null,
    () => page.locator('input[name="deliverableItemSpecification.applicationSurfaceTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'glass option', 'visible', null,
    () => page.locator('li[data-label="Glass"]'));
  await heal(page, 'glass option', 'click', null,
    () => page.locator('li[data-label="Glass"]'));

  await heal(page, 'surface temp after field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.surfaceTempAfterApplication"][type="text"]'));
  await heal(page, 'surface temp after field', 'fill', testData.surfaceTempAfter,
    () => page.locator('input[name="deliverableItemSpecification.surfaceTempAfterApplication"][type="text"]'));

  await heal(page, 'substrate info fieldset', 'visible', null,
    () => page.locator('fieldset').filter({ hasText: 'Generic Substrate Information' }).first());
  await heal(page, 'substrate info fieldset', 'click', null,
    () => page.locator('fieldset').filter({ hasText: 'Generic Substrate Information' }).first());

  await heal(page, 'appearance color field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.substrateColor"][type="text"]'));
  await heal(page, 'appearance color field', 'fill', testData.appearanceColorRequired,
    () => page.locator('input[name="deliverableItemSpecification.substrateColor"][type="text"]'));

  await heal(page, 'substrate face field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.substrateFace"][type="text"]'));
  await heal(page, 'substrate face field', 'fill', testData.substrateFaceOrFacestock,
    () => page.locator('input[name="deliverableItemSpecification.substrateFace"][type="text"]'));

  await heal(page, 'adhesive field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.substrateAdhesive"][type="text"]'));
  await heal(page, 'adhesive field', 'fill', testData.adhesiveRequired,
    () => page.locator('input[name="deliverableItemSpecification.substrateAdhesive"][type="text"]'));

  await heal(page, 'liner field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.substrateLiner"][type="text"]'));
  await heal(page, 'liner field', 'fill', testData.adhesiveRequired,
    () => page.locator('input[name="deliverableItemSpecification.substrateLiner"][type="text"]'));

  await heal(page, 'coating field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.coatingTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'coating field', 'click', null,
    () => page.locator('input[name="deliverableItemSpecification.coatingTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'uv gloss option', 'visible', null,
    () => page.locator('li[data-label="UV Gloss"]'));
  await heal(page, 'uv gloss option', 'click', null,
    () => page.locator('li[data-label="UV Gloss"]'));

  await heal(page, 'laminate field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.laminateTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'laminate field', 'click', null,
    () => page.locator('input[name="deliverableItemSpecification.laminateTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'ul laminate option', 'visible', null,
    () => page.locator('li[data-label="UL Laminate"]'));
  await heal(page, 'ul laminate option', 'click', null,
    () => page.locator('li[data-label="UL Laminate"]'));

  await heal(page, 'wind direction field', 'visible', null,
    () => page.locator('input[name="deliverableItemSpecification.windDirectionId"][type="text"]'));
  await heal(page, 'wind direction field', 'click', null,
    () => page.locator('input[name="deliverableItemSpecification.windDirectionId"][type="text"]'));
  await heal(page, 'left first option', 'visible', null,
    () => page.locator('li[data-label="4 - Print out, Left first."]'));
  await heal(page, 'left first option', 'click', null,
    () => page.locator('li[data-label="4 - Print out, Left first."]'));

  await heal(page, 'choose unit templates button', 'click', null,
    () => page.getByRole('button', { name: 'Choose Unit Templates', exact: true }));

  await heal(page, 'unit template quick search field', 'fill', testData.unitTemplatePicker,
    () => page.locator('input[placeholder="Quick Search"][data-flux-control]'));
 
  await heal(page, 'utm 12991 div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'UTM12991' }).first());
  await heal(page, 'utm 12991 div', 'click', null,
    () => page.locator('div').filter({ hasText: 'UTM12991' }).first());
 
  await heal(page, 'continue button 4', 'click', null,
    () => page.locator('//h3[normalize-space()="Choose Unit-Template-Picker"]//ancestor::div[4]//span[normalize-space()="Continue"]'));

  await heal(page, 'create rfp button', 'click', null,
    () => page.getByRole('button', { name: 'Create Request for Proposal', exact: true }));

  await heal(page, 'rfp success message', 'visible', null,
    () => page.getByText('Request for Proposal created successfully.',{ exact: true }));

  await heal(page, 'rfp heading', 'visible', null,
    () => page.getByRole('heading', { name: /RFP\d+ - Request for Proposal/ }));
  
  const headingText = await page.getByRole('heading', { name: /RFP\d+ - Request for Proposal/ }).innerText();
  const rfpNumber = headingText.split(' - ')[0];
  saveSession({ rfpNumber });
  console.log(`[data] Saved RFP Id → ${rfpNumber}`);

  await heal(page, 'draft span', 'visible', null,
    () => page.locator('span').filter({ hasText: 'Draft'}).last());

await heal(page, 'btn back', 'click', null,
  () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));

  // Request For Proposals navigation
  await heal(page, 'request for proposals link back', 'visible', null,
    () => page.getByRole('link', {name: 'Request For Proposals',exact: true}));
  await heal(page, 'request for proposals link back', 'click', null,
    () => page.getByRole('link', {name: 'Request For Proposals',exact: true}));

  // Request for Proposals Queue

  await heal(page, 'rfp queue label back', 'visible', null,
    () => page.locator('label') .filter({ hasText: 'Request for Proposals Queue' }) .first());
  await heal(page, 'rfp queue label back', 'click', null,
    () => page.locator('label') .filter({ hasText: 'Request for Proposals Queue' }) .first());

// const page.getByPlaceholder('Quick Search') = page.locator('[data-cy="input"]');
await heal(page, 'quick search field', 'visible', null,
  () => page.getByPlaceholder('Quick Search'));
await heal(page, 'quick search field', 'fill', rfpNumber,
  () => page.getByPlaceholder('Quick Search'));

await heal(page, 'rfp result', 'visible', null,
  () => page.getByText(rfpNumber, { exact: true }));
await expect(page.getByText(rfpNumber, { exact: true })).toHaveCount(1);

});