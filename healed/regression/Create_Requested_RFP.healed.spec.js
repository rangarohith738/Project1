import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Creation of Requested RFP @regression @set1', async ({ page }) => {

  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

  // 1. Go to login page
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  await heal(page, 'Sign in with email button', 'click', null,
    () => page.locator('[data-cy="btnLoginVisible"]'));

  await heal(page, 'Email input', 'visible', null,
    () => page.locator('input[name="email"][type="email"]'));
  await heal(page, 'Email input', 'fill', testData.email,
    () => page.locator('input[name="email"][type="email"]'));

  await heal(page, 'Password input', 'visible', null,
    () => page.locator('input[name="password"][type="password"]'));
  await heal(page, 'Password input', 'fill', testData.password,
    () => page.locator('input[name="password"][type="password"]'));

  await heal(page, 'Sign in confirm button', 'click', null,
    () => page.locator('[data-cy="btnLoginConfirm"]'));

  await heal(page, 'Estimating & Pricing menu', 'visible', null,
    () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));
  await heal(page, 'Estimating & Pricing menu', 'click', null,
    () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));

  await heal(page, 'Request For Proposals link', 'visible', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));
  await heal(page, 'Request For Proposals link', 'click', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));

  await heal(page, 'New Request for Proposal link', 'visible', null,
    () => page.getByRole('link', { name: 'New Request for Proposal', exact: true }));
  await heal(page, 'New Request for Proposal link', 'click', null,
    () => page.getByRole('link', { name: 'New Request for Proposal', exact: true }));

  await heal(page, 'Select Customer button', 'click', null,
    () => page.getByRole('button', { name: 'Select Customer', exact: true }));

  await heal(page, 'Quick Search input', 'visible', null,
    () => page.getByPlaceholder('Quick Search').first());
  await heal(page, 'Quick Search input', 'fill', testData.quickSearch,
    () => page.getByPlaceholder('Quick Search').first());

  await heal(page, 'Customer cell Charles Lecrec', 'visible', null,
    () => page.locator('td').filter({ hasText: 'Charles Lecrec' }).first());
  await heal(page, 'Customer cell Charles Lecrec', 'click', null,
    () => page.locator('td').filter({ hasText: 'Charles Lecrec' }).first());

  await heal(page, 'Customer div Charles Lecrec', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Charles Lecrec' }).first());
  await heal(page, 'Customer div Charles Lecrec', 'click', null,
    () => page.locator('div').filter({ hasText: 'Charles Lecrec' }).first());

  await heal(page, 'Unlink button', 'visible', null,
    () => page.getByRole('button', { name: 'Unlink', exact: true }));
  await heal(page, 'Cancel button', 'visible', null,
    () => page.getByRole('button', { name: 'Cancel', exact: true }));

  await heal(page, 'Continue customer button', 'click', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));

  await page.waitForTimeout(2000);

  await heal(page, 'Project radio', 'visible', null,
    () => page.locator('#projectselect').last());
  await heal(page, 'Project radio', 'check', null,
    () => page.locator('#projectselect').last());

  await heal(page, 'Opportunity name input', 'visible', null,
    () => page.locator('//input[@placeholder="Enter the opportunity name"]'));
  await heal(page, 'Opportunity name input', 'fill', testData.nameRequired,
    () => page.locator('//input[@placeholder="Enter the opportunity name"]'));

  await heal(page, 'Opportunity description input', 'visible', null,
    () => page.locator('input[name="project.description"][type="text"]'));
  await heal(page, 'Opportunity description input', 'fill', testData.description,
    () => page.locator('input[name="project.description"][type="text"]'));

  await heal(page, 'Pricing Table Presets fieldset', 'visible', null,
    () => page.locator('fieldset').filter({ hasText: 'Pricing Table Presets' }).first());
  await heal(page, 'Pricing Table Presets fieldset', 'click', null,
    () => page.locator('fieldset').filter({ hasText: 'Pricing Table Presets' }).first());

  await heal(page, 'Sales unit input', 'visible', null,
    () => page.locator('input[name="estimate.quantity_unit_id"][type="text"]'));
  await heal(page, 'Sales unit input', 'click', null,
    () => page.locator('input[name="estimate.quantity_unit_id"][type="text"]'));
  await heal(page, 'Feet option', 'visible', null,
    () => page.locator('li[data-label="Feet"]'));
  await heal(page, 'Feet option', 'click', null,
    () => page.locator('li[data-label="Feet"]'));

  await heal(page, 'Quantity break 1 input', 'visible', null,
    () => page.locator('input[name="estimate.quantity_break_1"][type="text"]'));
  await heal(page, 'Quantity break 1 input', 'fill', testData.quantityBreak1,
    () => page.locator('input[name="estimate.quantity_break_1"][type="text"]'));

  await heal(page, 'Quoting Options fieldset', 'visible', null,
    () => page.locator('fieldset').filter({ hasText: 'Quoting Options' }).first());
  await heal(page, 'Quoting Options fieldset', 'click', null,
    () => page.locator('fieldset').filter({ hasText: 'Quoting Options' }).first());

  await heal(page, 'Max colors input', 'visible', null,
    () => page.locator('input[name="estimate.max_colors_to_quote"][type="text"]'));
  await heal(page, 'Max colors input', 'click', null,
    () => page.locator('input[name="estimate.max_colors_to_quote"][type="text"]'));
  // Retry-open if the "2" option isn't visible after first click
  {
    const sixColorsOption = page.locator('li[data-label="2"]');
    if (!(await sixColorsOption.isVisible())) {
      await heal(page, 'Max colors input (reopen)', 'click', null,
        () => page.locator('input[name="estimate.max_colors_to_quote"][type="text"]'));
    }
  }
  await heal(page, 'Six colors option', 'visible', null,
    () => page.locator('li[data-label="2"]'));
  await heal(page, 'Six colors option', 'click', null,
    () => page.locator('li[data-label="2"]'));

  await heal(page, 'General Information div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'General Information' }).first());
  await heal(page, 'General Information div', 'click', null,
    () => page.locator('div').filter({ hasText: 'General Information' }).first());

  await heal(page, 'Product class input', 'visible', null,
    () => page.locator('input[name="estimate.product_class_id"][type="text"]'));
  await heal(page, 'Product class input', 'click', null,
    () => page.locator('input[name="estimate.product_class_id"][type="text"]'));
  await heal(page, 'RFID Label option', 'visible', null,
    () => page.locator('li[data-label="RFID Label"]'));
  await heal(page, 'RFID Label option', 'click', null,
    () => page.locator('li[data-label="RFID Label"]'));

  await heal(page, 'Workflow input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.workflowId"][type="text"]'));
  await heal(page, 'Workflow input', 'click', null,
    () => page.locator('input[name="estimateSpecification.workflowId"][type="text"]'));
  await heal(page, 'RFID Digital Workflow option', 'visible', null,
    () => page.locator('li[data-label="RFID Digital Workflow"]'));
  await heal(page, 'RFID Digital Workflow option', 'click', null,
    () => page.locator('li[data-label="RFID Digital Workflow"]'));

  await heal(page, 'Plant input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.plantId"][type="text"]'));
  await heal(page, 'Plant input', 'click', null,
    () => page.locator('input[name="estimateSpecification.plantId"][type="text"]'));
  await heal(page, 'Fortis (99) option', 'visible', null,
    () => page.locator('li[data-label="Fortis (99)"]'));
  await heal(page, 'Fortis (99) option', 'click', null,
    () => page.locator('li[data-label="Fortis (99)"]'));

  await heal(page, 'Estimate description textarea', 'visible', null,
    () => page.locator('//label[@for="estimate.description"]/following-sibling::div/textarea'));
  await heal(page, 'Estimate description textarea', 'click', null,
    () => page.locator('//label[@for="estimate.description"]/following-sibling::div/textarea'));
  await heal(page, 'Estimate description textarea', 'fill', testData.descriptionRequired,
    () => page.locator('//label[@for="estimate.description"]/following-sibling::div/textarea'));

  await heal(page, 'Unit set input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.unitSetTypeId"][type="text"]'));
  await heal(page, 'Unit set input', 'click', null,
    () => page.locator('input[name="estimateSpecification.unitSetTypeId"][type="text"]'));
  await heal(page, 'Rolls/Boxed option', 'visible', null,
    () => page.locator('li[data-label="Rolls/Boxed"]'));
  await heal(page, 'Rolls/Boxed option', 'click', null,
    () => page.locator('li[data-label="Rolls/Boxed"]'));

  await heal(page, 'Core diameter input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.coreDiameterId"][type="text"]'));
  await heal(page, 'Core diameter input', 'click', null,
    () => page.locator('input[name="estimateSpecification.coreDiameterId"][type="text"]'));
  await heal(page, 'One inch option', 'visible', null,
    () => page.locator('(//li[@data-label="1"])[2]'));
  await heal(page, 'One inch option', 'click', null,
    () => page.locator('(//li[@data-label="1"])[2]'));

  await heal(page, 'Application temp input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.applicationTemp"][type="text"]'));
  await heal(page, 'Application temp input', 'fill', testData.applicationTempRequired,
    () => page.locator('input[name="estimateSpecification.applicationTemp"][type="text"]'));

  await heal(page, 'Surface type input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.applicationSurfaceTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'Surface type input', 'click', null,
    () => page.locator('input[name="estimateSpecification.applicationSurfaceTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'Glass option', 'visible', null,
    () => page.locator('li[data-label="Glass"]'));
  await heal(page, 'Glass option', 'click', null,
    () => page.locator('li[data-label="Glass"]'));

  await heal(page, 'Surface temp after input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.surfaceTempAfterApplication"][type="text"]'));
  await heal(page, 'Surface temp after input', 'fill', testData.surfaceTempAfter,
    () => page.locator('input[name="estimateSpecification.surfaceTempAfterApplication"][type="text"]'));

  await heal(page, 'Substrate info fieldset', 'visible', null,
    () => page.locator('fieldset').filter({ hasText: 'Generic Substrate Information' }).first());
  await heal(page, 'Substrate info fieldset', 'click', null,
    () => page.locator('fieldset').filter({ hasText: 'Generic Substrate Information' }).first());

  await heal(page, 'Appearance color input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.substrateColor"][type="text"]'));
  await heal(page, 'Appearance color input', 'fill', testData.appearanceColorRequired,
    () => page.locator('input[name="estimateSpecification.substrateColor"][type="text"]'));

  await heal(page, 'Substrate face input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.substrateFace"][type="text"]'));
  await heal(page, 'Substrate face input', 'fill', testData.substrateFaceOrFacestock,
    () => page.locator('input[name="estimateSpecification.substrateFace"][type="text"]'));

  await heal(page, 'Adhesive input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.substrateAdhesive"][type="text"]'));
  await heal(page, 'Adhesive input', 'fill', testData.adhesiveRequired,
    () => page.locator('input[name="estimateSpecification.substrateAdhesive"][type="text"]'));

  await heal(page, 'Liner input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.substrateLiner"][type="text"]'));
  await heal(page, 'Liner input', 'fill', testData.adhesiveRequired,
    () => page.locator('input[name="estimateSpecification.substrateLiner"][type="text"]'));

  await heal(page, 'Coating input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.coatingTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'Coating input', 'click', null,
    () => page.locator('input[name="estimateSpecification.coatingTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'UV Gloss option', 'visible', null,
    () => page.locator('li[data-label="UV Gloss"]'));
  await heal(page, 'UV Gloss option', 'click', null,
    () => page.locator('li[data-label="UV Gloss"]'));

  await heal(page, 'Laminate input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.laminateTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'Laminate input', 'click', null,
    () => page.locator('input[name="estimateSpecification.laminateTypeValuelistOptionId"][type="text"]'));
  await heal(page, 'UL Laminate option', 'visible', null,
    () => page.locator('li[data-label="UL Laminate"]'));
  await heal(page, 'UL Laminate option', 'click', null,
    () => page.locator('li[data-label="UL Laminate"]'));

  await heal(page, 'Wind direction input', 'visible', null,
    () => page.locator('input[name="estimateSpecification.windDirectionId"][type="text"]'));
  await heal(page, 'Wind direction input', 'click', null,
    () => page.locator('input[name="estimateSpecification.windDirectionId"][type="text"]'));
  await heal(page, 'Left first wind direction option', 'visible', null,
    () => page.locator('li[data-label="4 - Print out, Left first."]'));
  await heal(page, 'Left first wind direction option', 'click', null,
    () => page.locator('li[data-label="4 - Print out, Left first."]'));

  await heal(page, 'Choose Unit Templates button', 'click', null,
    () => page.getByRole('button', { name: 'Choose Unit Templates', exact: true }));

  await heal(page, 'Unit template Quick Search input', 'fill', testData.unitTemplatePicker,
    () => page.getByPlaceholder('Quick Search'));

  await heal(page, 'UTM12991 div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'UTM12991' }).first());
  await heal(page, 'UTM12991 div', 'click', null,
    () => page.locator('div').filter({ hasText: 'UTM12991' }).first());

  await heal(page, 'Continue button (unit template picker)', 'click', null,
    () => page.locator('//h3[normalize-space()="Choose Unit-Template-Picker"]//ancestor::div[4]//span[normalize-space()="Continue"]'));

  await heal(page, 'Create Request for Proposal button', 'click', null,
    () => page.getByRole('button', { name: 'Create Request for Proposal', exact: true }));

  await heal(page, 'RFP success message', 'visible', null,
    () => page.getByText('Request for Proposal created successfully.', { exact: true }));
});