// Create RFP from Product Item; verify on Product Item Links and RFP Queue (TC61 / TC62)
import testData from '../../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession, saveSession } = require('../../helpers/sessionData');

test('Verify RFP in Product Item and RFP Hub @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);

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

  const itemsMenuButton = page.locator('button').filter({ hasText: 'Items' }).first();
  await expect(itemsMenuButton).toBeEnabled();
  await itemsMenuButton.click();

  const productItemsLink = page.getByRole('link', { name: 'Product Items', exact: true });
  await expect(productItemsLink).toBeVisible();
  await expect(productItemsLink).toBeEnabled();
  await productItemsLink.click();

  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('main').getByText('Product Items')).toBeVisible();

  await page.waitForTimeout(2000);
  const firstProductItem = page.locator('//tbody//tr[1]//td[2]//p[1]');
  await expect(firstProductItem).toBeVisible();
  const firstProductItemText = (await firstProductItem.textContent() || '').split(/\s*\|\s*/)[0].trim().replace(/\|/g, '').trim();
  console.log(`[data] productItemId: ${firstProductItemText}`);

  await firstProductItem.click();

  await page.waitForTimeout(2000);
  const productItemHeading = page.locator('div').filter({ hasText: `${firstProductItemText}-Product Item` }).first();
  await expect(productItemHeading).toBeVisible();

  const customerNameShowpage = page.locator(
    "//span[contains(@class,'text-ellipsis') and contains(@x-tooltip.only-on-ellipsis.allowhtml,'-')]"
  ).first();
  const customerText = (await customerNameShowpage.innerText()).trim();
  const customerNameOnlyShowpage = customerText.split('-').slice(1).join('-').trim();
  console.log(`[data] customerName: ${customerNameOnlyShowpage}`);

  const productClassShowpage = page.locator('//div[normalize-space()="Product Class"]/following-sibling::div//span');
  const productClassShowpageText = (await productClassShowpage.innerText()).trim();

  const descriptionShowpage = page.locator('//div[normalize-space()="Description"]/following-sibling::div//span');
  const descriptionShowpageText = (await descriptionShowpage.innerText()).trim();

  const opportunityShowpage = page.locator(
    '//div[normalize-space()="Opportunity #"]/following-sibling::div//span'
  );
  const opportunityShowpageText = (await opportunityShowpage.innerText()).trim();

  let opportunityName;
  if (opportunityShowpageText === 'Nothing Selected') {
    opportunityName = 'Nothing Selected';
  } else {
    opportunityName = opportunityShowpageText.split('-').slice(1).join('-').trim();
  }
  console.log(`[data] opportunityName: ${opportunityName}`);

  const salesUnitSpanShowpage = page.locator(
    '//div[normalize-space()="Sales Unit"]/following-sibling::div//span'
  );
  const salesUnitSpanShowpageText = (await salesUnitSpanShowpage.innerText()).trim();

  const linksTabButton = page.locator('[data-cy="hub-tab-links"]');
  await expect(linksTabButton).toBeVisible();
  await expect(linksTabButton).toBeEnabled();
  await linksTabButton.click();

  const rfpHeading = page.locator('h3').filter({ hasText: 'Request for Proposal' }).first();
  await expect(rfpHeading).toBeVisible();

  const newRfpLink = page.locator('//h3[normalize-space()="Request for Proposal"]//..//span[normalize-space()="New Request for Proposal"]').first();
  await expect(newRfpLink).toBeVisible();
  await expect(newRfpLink).toBeEnabled();

  const [newRfpPage] = await Promise.all([
    page.context().waitForEvent('page'),
    newRfpLink.click()
  ]);

  await newRfpPage.waitForLoadState('domcontentloaded');
  await newRfpPage.waitForTimeout(3000);

  const newRfpViaProductItem = newRfpPage.locator('//h2[normalize-space()="Request for Proposal Information"]').first();
  await expect(newRfpViaProductItem).toBeVisible();

  const customerName = newRfpPage.locator(
    '//div[contains(@class,"pt-1")][.//div[normalize-space()="Customer"]]//div[contains(@class,"uppercase")]'
  ).first();
  await expect(customerName).toBeVisible();
  const customerNameText = (await customerName.innerText()).trim();
  expect(customerNameText.toLowerCase()).toBe(customerNameOnlyShowpage.toLowerCase());

  if (opportunityName === 'Nothing Selected') {
    const chooseOpportunityButton = newRfpPage.locator('//button[normalize-space()="Choose Opportunity"]').first();
    await expect(chooseOpportunityButton).toBeVisible();
    await chooseOpportunityButton.click();

    await newRfpPage.waitForTimeout(2000);
    const firstOpportunityRow = newRfpPage.locator('(//tbody//tr[1]//td[3]//div)[2]').first();
    await expect(firstOpportunityRow).toBeVisible();
    const selectedOpportunityName = (await firstOpportunityRow.textContent() || '').trim();
    console.log(`[data] selectedOpportunityName: ${selectedOpportunityName}`);
    await firstOpportunityRow.click();
    await newRfpPage.waitForTimeout(2000);

    const continueOpportunityButton = newRfpPage.locator(
      '//h3[normalize-space()="Choose Opportunity"]//..//..//..//..//button[normalize-space()="Continue"]'
    );
    await expect(continueOpportunityButton).toBeEnabled();
    await continueOpportunityButton.click();

    const opportunityNameCreationPage = newRfpPage.locator(
      '//div[normalize-space()="Opportunity"]/following-sibling::div//div[contains(@class,"uppercase")]'
    ).first();
    await expect(opportunityNameCreationPage).not.toHaveText('');
    await expect(opportunityNameCreationPage).toContainText(selectedOpportunityName, { ignoreCase: true });
  } else {
    const opportunityNameCreationPage = newRfpPage.locator(
      '//div[normalize-space()="Opportunity"]/following-sibling::div//div[contains(@class,"uppercase")]'
    ).first();
    await expect(opportunityNameCreationPage).toContainText(opportunityName, { ignoreCase: true });
  }

  const quantityUnitInput = newRfpPage.locator('input[name="estimate.quantity_unit_id"][type="text"]');
  const currentUnit = (await quantityUnitInput.inputValue()).trim();
  console.log(`[data] currentQuantityUnit: ${currentUnit}`);

  if (currentUnit) {
    expect(currentUnit.toLowerCase()).toBe(salesUnitSpanShowpageText.toLowerCase());
  } else {
    await quantityUnitInput.click();
    const salesUnitOption = newRfpPage.locator(`li[data-label="${salesUnitSpanShowpageText}"]`);
    await expect(salesUnitOption).toBeVisible();
    await salesUnitOption.click();
    await expect(quantityUnitInput).toHaveValue(salesUnitSpanShowpageText);
  }

  const quantityBreakInput = newRfpPage.locator('input[name="estimate.quantity_break_1"][type="text"]');
  await expect(quantityBreakInput).toBeEnabled();
  await quantityBreakInput.click();
  await quantityBreakInput.fill(testData.quantityBreak1);

  const numberOfSKUInput = newRfpPage.locator('//input[@name="estimate.count_of_items"]');
  await expect(numberOfSKUInput).toBeEnabled();
  await numberOfSKUInput.click();
  await numberOfSKUInput.fill(testData.numberOfSKUsProductItems);

  const maxColorsInput = newRfpPage.locator('input[name="estimate.max_colors_to_quote"][type="text"]');
  await expect(maxColorsInput).toBeEnabled();
  await maxColorsInput.click();
  const colorsOption = newRfpPage.locator('li[data-label="2"]');
  await expect(colorsOption).toBeEnabled();
  await colorsOption.click();

  const productClassDropdown = newRfpPage.locator('input[name="estimate.product_class_id"]');
  const productClassText = (await productClassDropdown.inputValue()).trim();
  await expect(productClassText).toBe(productClassShowpageText);
  await expect(newRfpPage.locator('input[name="estimate.product_class_id"][type="text"]')).toHaveValue(productClassShowpageText);

  const workflowInput = newRfpPage.locator('input[name="estimateSpecification.workflowId"][type="text"]');
  await expect(workflowInput).toBeEnabled();
  await workflowInput.click();
  const standardDigitalLabelOption = newRfpPage.locator('li[data-label="Standard Digital Label"]');
  await expect(standardDigitalLabelOption).toBeEnabled();
  await standardDigitalLabelOption.click();

  const plantInput = newRfpPage.locator('input[name="estimateSpecification.plantId"][type="text"]');
  await expect(plantInput).toBeEnabled();
  await plantInput.click();
  const fortisOption = newRfpPage.locator('li[data-label="Fortis (99)"]');
  await expect(fortisOption).toBeEnabled();
  await fortisOption.click();

  const descriptionInput = newRfpPage.locator('//label[@for="estimate.description"]/following-sibling::div/textarea');
  await expect(descriptionInput).toBeVisible();
  const descriptionText = (await descriptionInput.inputValue()).trim();
  expect(descriptionText).toBe(descriptionShowpageText);

  const unitSetInput = newRfpPage.locator('input[name="estimateSpecification.unitSetTypeId"][type="text"]');
  await expect(unitSetInput).toBeEnabled();
  await unitSetInput.click();
  const rollsBoxedOption = newRfpPage.locator('li[data-label="Rolls/Boxed"]');
  await expect(rollsBoxedOption).toBeEnabled();
  await rollsBoxedOption.click();

  const coreDiameterInput = newRfpPage.locator('input[name="estimateSpecification.coreDiameterId"][type="text"]');
  await expect(coreDiameterInput).toBeEnabled();
  await coreDiameterInput.click();
  const coreDiameterOption = newRfpPage.locator('(//li[@data-label="1"])[2]');
  await coreDiameterOption.click();

  const applicationTypeInput = newRfpPage.locator('input[name="estimateSpecification.applicationType"][type="text"]');
  await expect(applicationTypeInput).toBeEnabled();
  await applicationTypeInput.click();
  const handOption = newRfpPage.locator('li[data-label="Hand"]');
  await expect(handOption).toBeEnabled();
  await handOption.click();

  const applicationTempInput = newRfpPage.locator('input[name="estimateSpecification.applicationTemp"][type="text"]');
  await expect(applicationTempInput).toBeEditable();
  await applicationTempInput.fill(testData.applicationTempRequired);

  const surfaceTypeInput = newRfpPage.locator('input[name="estimateSpecification.applicationSurfaceTypeValuelistOptionId"][type="text"]');
  await expect(surfaceTypeInput).toBeEnabled();
  await surfaceTypeInput.click();
  const petgOption = newRfpPage.locator('li[data-label="PETg"]');
  await expect(petgOption).toBeEnabled();
  await petgOption.click();

  const surfaceTempAfterInput = newRfpPage.locator('input[name="estimateSpecification.surfaceTempAfterApplication"][type="text"]');
  await expect(surfaceTempAfterInput).toBeEditable();
  await surfaceTempAfterInput.fill(testData.surfaceTempAfter);

  const appearanceColorInput = newRfpPage.locator('input[name="estimateSpecification.substrateColor"][type="text"]');
  await expect(appearanceColorInput).toBeEditable();
  await appearanceColorInput.fill(testData.appearanceColorRequired);

  const substrateFaceInput = newRfpPage.locator('input[name="estimateSpecification.substrateFace"][type="text"]');
  await expect(substrateFaceInput).toBeEditable();
  await substrateFaceInput.fill(testData.substrateFaceOrFacestock);

  const adhesiveInput = newRfpPage.locator('input[name="estimateSpecification.substrateAdhesive"][type="text"]');
  await expect(adhesiveInput).toBeEditable();
  await adhesiveInput.fill(testData.adhesiveRequired);

  const linerInput = newRfpPage.locator('input[name="estimateSpecification.substrateLiner"][type="text"]');
  await expect(linerInput).toBeEditable();
  await linerInput.fill(testData.linerRequired);

  const notRequiredCheckbox = newRfpPage.locator('#not-required');
  await notRequiredCheckbox.check();
  await expect(notRequiredCheckbox).toBeChecked();

  const windDirectionButton = newRfpPage.getByRole('button', {
    name: '7 - Print in, Right first.',
    exact: true
  });
  await expect(windDirectionButton).toBeEnabled();
  await windDirectionButton.click();

  const chooseUnitTemplatesButton = newRfpPage.getByRole('button', {
    name: 'Choose Unit Templates',
    exact: true
  });
  await expect(chooseUnitTemplatesButton).toBeEnabled();
  await chooseUnitTemplatesButton.click();

  const unitTemplateQuickSearchInput = newRfpPage.getByPlaceholder('Quick Search');
  await unitTemplateQuickSearchInput.fill(testData.unitTemplatePicker);

  const unitTemplateDiv = newRfpPage.locator('div').filter({ hasText: testData.unitTemplatePicker }).first();
  await expect(unitTemplateDiv).toBeVisible();
  await unitTemplateDiv.click();

  const continueUnitTemplateButton = newRfpPage.locator(
    '//h3[normalize-space()="Choose Unit-Template-Picker"]//ancestor::div[4]//span[normalize-space()="Continue"]'
  );
  await continueUnitTemplateButton.click();

  const rewinderSlitterInput = newRfpPage.locator('[placeholder="Select Rewinder/Slitter"]');
  await rewinderSlitterInput.click();
  const rewinderOption = newRfpPage.locator('li[data-label="Rewinder"]');
  await expect(rewinderOption).toBeVisible();
  await rewinderOption.click();

  const numberOfSlitsInput = newRfpPage.locator('input[name="estimateWorkflowStepTool.numberOfSlits"][type="number"]');
  await expect(numberOfSlitsInput).toBeVisible();
  await numberOfSlitsInput.fill('2');

  const sheeterInput = newRfpPage.locator("//input[@placeholder='Select Sheeter']");
  await sheeterInput.click();
  const paperCutterOption = newRfpPage.locator('li[data-label="Paper Cutter"]');
  await paperCutterOption.click();

  const numberAcrossStepInput = newRfpPage.locator('input[name="estimateSpecification.impositionAc"][type="number"]');
  await expect(numberAcrossStepInput).toBeVisible();
  await numberAcrossStepInput.fill('1');

  const numberAroundRepeatInput = newRfpPage.locator('input[name="estimateSpecification.impositionAr"][type="number"]');
  await expect(numberAroundRepeatInput).toBeVisible();
  await numberAroundRepeatInput.fill('1');

  const toothCountInput = newRfpPage.locator('input[name="estimateSpecification.toothCount"][type="number"]');
  await expect(toothCountInput).toBeVisible();
  await toothCountInput.fill(testData.toothCount);

  const createRfpButton = newRfpPage.getByRole('button', {
    name: 'Create Request for Proposal',
    exact: true
  });
  await expect(createRfpButton).toBeEnabled();
  await createRfpButton.click();

  const rfpSuccessMessage = newRfpPage.getByText('Request for Proposal created successfully.', { exact: true });
  await expect(rfpSuccessMessage).toBeVisible();

  const rfpText = await newRfpPage.locator(
    '//h1/span[contains(normalize-space(), "Request for Proposal")]'
  ).innerText();
  const rfpNumber = rfpText.split('-')[0].trim();
  saveSession({ rfpNumber });
  console.log(`[data] Saved RFP Id → ${rfpNumber}`);

  const draftIcon = newRfpPage.locator('//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]');
  await expect(draftIcon).toHaveCount(0);

  await newRfpPage.close();
  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  await expect(linksTabButton).toBeEnabled();
  await linksTabButton.click();

  const createdRfpNumber = page.locator(
    `//h3[normalize-space()="Request for Proposal"]/../following::div[contains(@class,"text-ellipsis") and normalize-space()="${rfpNumber}"]`
  );
  await expect(createdRfpNumber).toBeVisible();
  await expect(createdRfpNumber).toHaveCount(1);

  const estimateMenuLinkBack = page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]');
  await expect(estimateMenuLinkBack).toBeVisible();
  await estimateMenuLinkBack.click();

  const rfpMenuLinkBack = page.getByRole('link', { name: 'Request For Proposals', exact: true });
  await expect(rfpMenuLinkBack).toBeVisible();
  await expect(rfpMenuLinkBack).toBeEnabled();
  await rfpMenuLinkBack.click();

  const rfpQueueLabel = page
    .locator('label')
    .filter({ hasText: /^Request for Proposals Queue$/ })
    .first();
  await expect(rfpQueueLabel).toBeVisible();
  await expect(rfpQueueLabel).toBeEnabled();

  const rfpQuickSearchInput = page.getByPlaceholder('Quick Search');
  await expect(rfpQuickSearchInput).toBeEnabled();
  await rfpQuickSearchInput.click();
  await rfpQuickSearchInput.fill(rfpNumber);

  await page.waitForTimeout(2000);

  const rfpCell = page.locator('td').filter({ hasText: rfpNumber }).first();
  await expect(rfpCell).toBeVisible();
  await expect(rfpCell).toHaveText(rfpNumber);

  const rfpRowCount = await page.locator('//tbody/tr').count();
  await expect(rfpRowCount).toBe(1);
});
