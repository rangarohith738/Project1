// Create RFP from Product Item; verify on Product Item Links and RFP Queue (TC61 / TC62)
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession, saveSession } = require('../../helpers/sessionData');

test('Verify RFP in Product Item and RFP Hub @regression @set2', async ({ page }) => {
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

  await page.waitForLoadState('domcontentloaded');

  await heal(page, 'items menu button', 'click', null,
    () => page.locator('button').filter({ hasText: 'Items' }).first());

  await heal(page, 'product items link', 'visible', null,
    () => page.getByRole('link', { name: 'Product Items', exact: true }));
  await heal(page, 'product items link', 'click', null,
    () => page.getByRole('link', { name: 'Product Items', exact: true }));

  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('main').getByText('Product Items')).toBeVisible();

  await page.waitForTimeout(2000);
  await heal(page, 'first product item', 'visible', null,
    () => page.locator('//tbody//tr[1]//td[2]//p[1]'));
  const firstProductItemText = (await page.locator('//tbody//tr[1]//td[2]//p[1]').textContent() || '').split(/\s*\|\s*/)[0].trim().replace(/\|/g, '').trim();
  console.log(`[data] productItemId: ${firstProductItemText}`);

  await heal(page, 'first product item', 'click', null,
    () => page.locator('//tbody//tr[1]//td[2]//p[1]'));

  await page.waitForTimeout(2000);
  await heal(page, 'product item heading', 'visible', null,
    () => page.locator('div').filter({ hasText: `${firstProductItemText}-Product Item` }).first());

  const customerText = (await page.locator("//span[contains(@class,'text-ellipsis') and contains(@x-tooltip.only-on-ellipsis.allowhtml,'-')]").first().innerText()).trim();
  const customerNameOnlyShowpage = customerText.split('-').slice(1).join('-').trim();
  console.log(`[data] newRfpPage.locator('//div[contains(@class,"pt-1")][.//div[normalize-space()="Customer"]]//div[contains(@class,"uppercase")]').first(): ${customerNameOnlyShowpage}`);

  const productClassShowpageText = (await page.locator('//div[normalize-space()="Product Class"]/following-sibling::div//span').innerText()).trim();

  const descriptionShowpageText = (await page.locator('//div[normalize-space()="Description"]/following-sibling::div//span').innerText()).trim();

  const opportunityShowpageText = (await page.locator('//div[normalize-space()="Opportunity #"]/following-sibling::div//span').innerText()).trim();

  let opportunityName;
  if (opportunityShowpageText === 'Nothing Selected') {
    opportunityName = 'Nothing Selected';
  } else {
    opportunityName = opportunityShowpageText.split('-').slice(1).join('-').trim();
  }
  console.log(`[data] opportunityName: ${opportunityName}`);

  const salesUnitSpanShowpageText = (await page.locator('//div[normalize-space()="Sales Unit"]/following-sibling::div//span').innerText()).trim();

  await heal(page, 'links tab button', 'visible', null,
    () => page.locator('[data-cy="hub-tab-links"]'));
  await heal(page, 'links tab button', 'click', null,
    () => page.locator('[data-cy="hub-tab-links"]'));

  await heal(page, 'rfp heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Request for Proposal' }).first());

  await heal(page, 'new rfp link', 'visible', null,
    () => page.locator('//h3[normalize-space()="Request for Proposal"]//..//span[normalize-space()="New Request for Proposal"]').first());

  const [newRfpPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.locator('//h3[normalize-space()="Request for Proposal"]//..//span[normalize-space()="New Request for Proposal"]').first().click()
  ]);

  await newRfpPage.waitForLoadState('domcontentloaded');
  await newRfpPage.waitForTimeout(3000);

  await heal(newRfpPage, 'new rfp via product item', 'visible', null,
    () => newRfpPage.locator('//h2[normalize-space()="Request for Proposal Information"]').first());

  await heal(newRfpPage, 'customer name', 'visible', null,
    () => newRfpPage.locator('//div[contains(@class,"pt-1")][.//div[normalize-space()="Customer"]]//div[contains(@class,"uppercase")]').first());
  const customerNameText = (await newRfpPage.locator('//div[contains(@class,"pt-1")][.//div[normalize-space()="Customer"]]//div[contains(@class,"uppercase")]').first().innerText()).trim();
  expect(customerNameText.toLowerCase()).toBe(customerNameOnlyShowpage.toLowerCase());

  if (opportunityName === 'Nothing Selected') {
    await heal(newRfpPage, 'choose opportunity button', 'visible', null,
      () => newRfpPage.locator('//button[normalize-space()="Choose Opportunity"]').first());
    await heal(newRfpPage, 'choose opportunity button', 'click', null,
      () => newRfpPage.locator('//button[normalize-space()="Choose Opportunity"]').first());

    await newRfpPage.waitForTimeout(2000);
    await heal(newRfpPage, 'first opportunity row', 'visible', null,
      () => newRfpPage.locator('(//tbody//tr[1]//td[3]//div)[2]').first());
    const selectedOpportunityName = (await newRfpPage.locator('(//tbody//tr[1]//td[3]//div)[2]').first().textContent() || '').trim();
    console.log(`[data] selectedOpportunityName: ${selectedOpportunityName}`);
    await heal(newRfpPage, 'first opportunity row', 'click', null,
      () => newRfpPage.locator('(//tbody//tr[1]//td[3]//div)[2]').first());
    await newRfpPage.waitForTimeout(2000);

    await heal(newRfpPage, 'continue opportunity button', 'click', null,
      () => newRfpPage.locator('//h3[normalize-space()="Choose Opportunity"]//..//..//..//..//button[normalize-space()="Continue"]'));

    await expect(newRfpPage.locator('//div[normalize-space()="Opportunity"]/following-sibling::div//div[contains(@class,"uppercase")]').first()).not.toHaveText('');
    await expect(newRfpPage.locator('//div[normalize-space()="Opportunity"]/following-sibling::div//div[contains(@class,"uppercase")]').first()).toContainText(selectedOpportunityName, { ignoreCase: true });
  } else {
    await expect(newRfpPage.locator('//div[normalize-space()="Opportunity"]/following-sibling::div//div[contains(@class,"uppercase")]').first()).toContainText(opportunityName, { ignoreCase: true });
  }

  const currentUnit = (await newRfpPage.locator('//input[contains(@name,"quantityUnitId")]').inputValue()).trim();
  console.log(`[data] currentQuantityUnit: ${currentUnit}`);

  if (currentUnit) {
    expect(currentUnit.toLowerCase()).toBe(salesUnitSpanShowpageText.toLowerCase());
  } else {
    await heal(newRfpPage, 'quantity unit field', 'click', null,
      () => newRfpPage.locator('//input[contains(@name,"quantityUnitId")]'));
    await heal(newRfpPage, 'sales unit option', 'visible', null,
      () => newRfpPage.locator(`li[data-label="${salesUnitSpanShowpageText}"]`));
    await heal(newRfpPage, 'sales unit option', 'click', null,
      () => newRfpPage.locator(`li[data-label="${salesUnitSpanShowpageText}"]`));
    await expect(newRfpPage.locator('//input[contains(@name,"quantityUnitId")]')).toHaveValue(salesUnitSpanShowpageText);
  }

  await heal(newRfpPage, 'quantity break field', 'click', null,
    () => newRfpPage.locator('input[name="deliverableItemDTO.extension.quantityBreak1"][type="text"]'));
  await heal(newRfpPage, 'quantity break field', 'fill', testData.quantityBreak1,
    () => newRfpPage.locator('input[name="deliverableItemDTO.extension.quantityBreak1"][type="text"]'));

  await heal(newRfpPage, 'number of skuinput', 'click', null,
    () => newRfpPage.locator('//input[@name="estimate.count_of_items"]'));
  await heal(newRfpPage, 'number of skuinput', 'fill', testData.numberOfSKUsProductItems,
    () => newRfpPage.locator('//input[@name="estimate.count_of_items"]'));

  await heal(newRfpPage, 'max colors field', 'click', null,
    () => newRfpPage.locator('input[name="deliverableItemDTO.extension.maxColorsToQuote"][type="text"]'));
  await heal(newRfpPage, 'colors option', 'click', null,
    () => newRfpPage.locator('li[data-label="2"]'));

  const productClassText = (await newRfpPage.locator('input[name="deliverableItemDTO.productClassId"]').inputValue()).trim();
  await expect(productClassText).toBe(productClassShowpageText);
  await expect(newRfpPage.locator('input[name="deliverableItemDTO.productClassId"][type="text"]')).toHaveValue(productClassShowpageText);

  await heal(newRfpPage, 'workflow field', 'click', null,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.workflowId"][type="text"]'));
  await heal(newRfpPage, 'standard digital label option', 'click', null,
    () => newRfpPage.locator('li[data-label="Standard Digital Label"]'));

  await heal(newRfpPage, 'plant field', 'click', null,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.plantId"][type="text"]'));
  await heal(newRfpPage, 'fortis option', 'click', null,
    () => newRfpPage.locator('li[data-label="Fortis (99)"]'));

  await heal(newRfpPage, 'description field', 'visible', null,
    () => newRfpPage.locator('//label[@for="deliverableItemDTO.description"]/following-sibling::div/textarea'));
  const descriptionText = (await newRfpPage.locator('//label[@for="deliverableItemDTO.description"]/following-sibling::div/textarea').inputValue()).trim();
  expect(descriptionText).toBe(descriptionShowpageText);

  await heal(newRfpPage, 'unit set field', 'click', null,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.unitSetTypeId"][type="text"]'));
  await heal(newRfpPage, 'rolls boxed option', 'click', null,
    () => newRfpPage.locator('li[data-label="Rolls/Boxed"]'));

  await heal(newRfpPage, 'core diameter field', 'click', null,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.coreDiameterId"][type="text"]'));
  await heal(newRfpPage, 'core diameter option', 'click', null,
    () => newRfpPage.locator('(//li[@data-label="1"])[2]'));

  await heal(newRfpPage, 'application type field', 'click', null,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.applicationType"][type="text"]'));
  await heal(newRfpPage, 'hand option', 'click', null,
    () => newRfpPage.locator('li[data-label="Hand"]'));

  await heal(newRfpPage, 'application temp field', 'fill', testData.applicationTempRequired,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.applicationTemp"][type="text"]'));

  await heal(newRfpPage, 'surface type field', 'click', null,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.applicationSurfaceTypeValuelistOptionId"][type="text"]'));
  await heal(newRfpPage, 'petg option', 'click', null,
    () => newRfpPage.locator('li[data-label="PETg"]'));

  await heal(newRfpPage, 'surface temp after field', 'fill', testData.surfaceTempAfter,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.surfaceTempAfterApplication"][type="text"]'));

  await heal(newRfpPage, 'appearance color field', 'fill', testData.appearanceColorRequired,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.substrateColor"][type="text"]'));

  await heal(newRfpPage, 'substrate face field', 'fill', testData.substrateFaceOrFacestock,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.substrateFace"][type="text"]'));

  await heal(newRfpPage, 'adhesive field', 'fill', testData.adhesiveRequired,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.substrateAdhesive"][type="text"]'));

  await heal(newRfpPage, 'liner field', 'fill', testData.linerRequired,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.substrateLiner"][type="text"]'));

  await heal(newRfpPage, 'not required checkbox', 'check', null,
    () => newRfpPage.locator('#not-required'));
  await expect(newRfpPage.locator('#not-required')).toBeChecked();

  await heal(newRfpPage, 'wind direction button', 'click', null,
    () => newRfpPage.getByRole('button', { name: '7 - Print in, Right first.', exact: true }));

  await heal(newRfpPage, 'choose unit templates button', 'click', null,
    () => newRfpPage.getByRole('button', { name: 'Choose Unit Templates', exact: true }));

  await heal(newRfpPage, 'unit template quick search field', 'fill', testData.unitTemplatePicker,
    () => newRfpPage.locator('input[placeholder="Quick Search"][data-flux-control]'));

  await heal(newRfpPage, 'unit template div', 'visible', null,
    () => newRfpPage.locator('div').filter({ hasText: testData.unitTemplatePicker }).first());
  await heal(newRfpPage, 'unit template div', 'click', null,
    () => newRfpPage.locator('div').filter({ hasText: testData.unitTemplatePicker }).first());

  await heal(newRfpPage, 'continue unit template button', 'click', null,
    () => newRfpPage.locator('//h3[normalize-space()="Choose Unit-Template-Picker"]//ancestor::div[4]//span[normalize-space()="Continue"]'));

  await heal(newRfpPage, 'rewinder slitter field', 'click', null,
    () => newRfpPage.locator('[placeholder="Select Rewinder/Slitter"]'));
  await heal(newRfpPage, 'rewinder option', 'visible', null,
    () => newRfpPage.locator('li[data-label="Rewinder"]'));
  await heal(newRfpPage, 'rewinder option', 'click', null,
    () => newRfpPage.locator('li[data-label="Rewinder"]'));

  await heal(newRfpPage, 'number of slits field', 'visible', null,
    () => newRfpPage.locator('input[name="estimateWorkflowStepTool.numberOfSlits"][type="number"]'));
  await heal(newRfpPage, 'number of slits field', 'fill', '2',
    () => newRfpPage.locator('input[name="estimateWorkflowStepTool.numberOfSlits"][type="number"]'));

  await heal(newRfpPage, 'sheeter field', 'click', null,
    () => newRfpPage.locator("//input[@placeholder='Select Sheeter']"));
  await heal(newRfpPage, 'paper cutter option', 'click', null,
    () => newRfpPage.locator('li[data-label="Paper Cutter"]'));

  await heal(newRfpPage, 'number across step field', 'visible', null,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.impositionAc"][type="number"]'));
  await heal(newRfpPage, 'number across step field', 'fill', '1',
    () => newRfpPage.locator('input[name="deliverableItemSpecification.impositionAc"][type="number"]'));

  await heal(newRfpPage, 'number around repeat field', 'visible', null,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.impositionAr"][type="number"]'));
  await heal(newRfpPage, 'number around repeat field', 'fill', '1',
    () => newRfpPage.locator('input[name="deliverableItemSpecification.impositionAr"][type="number"]'));

  await heal(newRfpPage, 'tooth count field', 'visible', null,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.toothCount"][type="number"]'));
  await heal(newRfpPage, 'tooth count field', 'fill', testData.toothCount,
    () => newRfpPage.locator('input[name="deliverableItemSpecification.toothCount"][type="number"]'));

  await heal(newRfpPage, 'create rfp button', 'click', null,
    () => newRfpPage.getByRole('button', { name: 'Create Request for Proposal', exact: true }));

  await heal(newRfpPage, 'rfp success message', 'visible', null,
    () => newRfpPage.getByText('Request for Proposal created successfully.', { exact: true }));

  const rfpNumber = newRfpPage.locator('//h1/span[contains(normalize-space(), "Request for Proposal")]').innerText().split('-')[0].trim();
  saveSession({ rfpNumber });
  console.log(`[data] Saved RFP Id → ${rfpNumber}`);

  await expect(newRfpPage.locator('//span[normalize-space()="Draft"]/preceding-sibling::div/span/span[normalize-space()="01"]')).toHaveCount(0);

  await newRfpPage.close();
  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  await heal(page, 'links tab button', 'click', null,
    () => page.locator('[data-cy="hub-tab-links"]'));

  await heal(page, 'created rfp number', 'visible', null,
    () => page.locator(`//h3[normalize-space()="Request for Proposal"]/../following::div[contains(@class,"text-ellipsis") and normalize-space()="${rfpNumber}"]`));
  await expect(page.locator(`//h3[normalize-space()="Request for Proposal"]/../following::div[contains(@class,"text-ellipsis") and normalize-space()="${rfpNumber}"]`)).toHaveCount(1);

  await heal(page, 'estimate menu link back', 'visible', null,
    () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));
  await heal(page, 'estimate menu link back', 'click', null,
    () => page.locator('(//button[normalize-space()="Estimating & Pricing"])[1]'));

  await heal(page, 'rfp menu link back', 'visible', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));
  await heal(page, 'rfp menu link back', 'click', null,
    () => page.getByRole('link', { name: 'Request For Proposals', exact: true }));

  await heal(page, 'rfp queue label', 'visible', null,
    () => page.locator('label') .filter({ hasText: /^Request for Proposals Queue$/ }) .first());

  await heal(page, 'rfp quick search field', 'click', null,
    () => page.getByPlaceholder('Quick Search'));
  await heal(page, 'rfp quick search field', 'fill', rfpNumber,
    () => page.getByPlaceholder('Quick Search'));

  await page.waitForTimeout(2000);

  await heal(page, 'rfp cell', 'visible', null,
    () => page.locator('td').filter({ hasText: rfpNumber }).first());
  await expect(page.locator('td').filter({ hasText: rfpNumber }).first()).toHaveText(rfpNumber);

  await expect(page.locator('//tbody/tr').count()).toBe(1);
});
