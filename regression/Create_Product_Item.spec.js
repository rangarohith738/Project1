// Create Product Item
import testData from '../test-data.json';
import { test, expect } from '@playwright/test';
const { prepareSession } = require('../helpers/sessionData');

test('Create Product Item @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] Creation override → nameRequired: ${session.nameRequired}`);
  console.log(`[data] customerPartNumberRequired: ${session.customerPartNumberRequired}`);

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

  const itemsMenuButton = page.locator('button').filter({ hasText: 'Items' }).first();
  await expect(itemsMenuButton).toBeEnabled();
  await itemsMenuButton.click();

  const productItemsLink = page.getByRole('link', { name: 'Product Items', exact: true });
  await expect(productItemsLink).toBeVisible();
  await expect(productItemsLink).toBeEnabled();
  await productItemsLink.click();

  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('main').getByText('Product Items')).toBeVisible();

  const newProductItemLink = page.getByRole('link', {
    name: 'New Product Item',
    exact: true
  });
  await expect(newProductItemLink).toBeVisible();
  await expect(newProductItemLink).toBeEnabled();
  await newProductItemLink.click();

  const newProductItemText = page.locator('//label[normalize-space()="New Product Item"]').first();
  await expect(newProductItemText).toBeVisible();
  await expect(newProductItemText).toBeEnabled();

  const selectCustomerButton = page.getByRole('button', {
    name: 'Select Customer',
    exact: true
  });

  await expect(selectCustomerButton).toBeEnabled();
  await selectCustomerButton.click();

  const customerQuickSearchInput = page.getByPlaceholder('Quick Search');
  await expect(customerQuickSearchInput).toBeEnabled();
  await customerQuickSearchInput.click();
  await customerQuickSearchInput.fill(testData.quickSearch);

  const customerCell = page.locator('td').filter({ hasText: testData.quickSearch }).first();
  await expect(customerCell).toBeVisible();
  await expect(customerCell).toBeEnabled();
  await customerCell.click();
  await page.waitForTimeout(2000);

  const unlinkButton = page.getByRole('button', { name: 'Unlink', exact: true });
  await expect(unlinkButton).toBeVisible();
  const cancelCustomerButton = page.getByRole('button', { name: 'Cancel', exact: true }).first();
  await expect(cancelCustomerButton).toBeVisible();

  const continueProductItemButton = page.getByRole('button', { name: 'Continue', exact: true });
  await expect(continueProductItemButton).toBeEnabled();
  await continueProductItemButton.click();

  const productClassInput = page.locator('input[name="productItem.product_class_id"][type="text"]');
  await expect(productClassInput).toBeVisible();
  await expect(productClassInput).toBeEnabled();
  await productClassInput.click();

  const primeLabelOption = page.locator('li[data-label="Prime Label"]');
  await expect(primeLabelOption).toBeVisible();
  await expect(primeLabelOption).toBeEnabled();
  await primeLabelOption.click();

  const customerPartNumberInput = page.locator('input[name="productItem.customer_part_number"][type="text"]');
  await expect(customerPartNumberInput).toBeVisible();
  await expect(customerPartNumberInput).toBeEditable();
  await customerPartNumberInput.fill(testData.customerPartNumberRequired);

  const brandNameInput = page.locator('input[name="productItem.brand_name"][type="text"]');
  await expect(brandNameInput).toBeVisible();
  await expect(brandNameInput).toBeEditable();
  await brandNameInput.fill(testData.brandName);

  const maxODInput = page.locator('input[name="productItemSpecification.max_roll_diameter"][type="number"]');
  await expect(maxODInput).toBeVisible();
  await expect(maxODInput).toBeEditable();
  await maxODInput.fill(testData.editingAncillaryItemsQuantity);

  const substrateInput = page.locator('input[name="productItem.substrate_text"][type="text"]');
  await expect(substrateInput).toBeVisible();
  await expect(substrateInput).toBeEditable();
  await substrateInput.fill(testData.substrateFaceOrFacestock);

  const coatingInput = page.locator('input[name="productItemSpecification.coating_type_valuelist_option_id"][type="text"]');
  await expect(coatingInput).toBeVisible();
  await expect(coatingInput).toBeEnabled();
  await coatingInput.click();

  const uvMatteOption = page.locator('li[data-label="UV Matte"]');
  await expect(uvMatteOption).toBeVisible();
  await expect(uvMatteOption).toBeEnabled();
  await uvMatteOption.click();

  const coreDiameterInput = page.locator('input[name="productItemSpecification.core_diameter_id"][type="text"]');
  await expect(coreDiameterInput).toBeVisible();
  await expect(coreDiameterInput).toBeEnabled();
  await coreDiameterInput.click();

  const coreDiameterOption = page.locator('li[data-label="1"]');
  await expect(coreDiameterOption).toBeVisible();
  await expect(coreDiameterOption).toBeEnabled();
  await coreDiameterOption.click();

  const unwindInput = page.locator('input[name="productItemSpecification.wind_direction_id"][type="text"]');
  await expect(unwindInput).toBeVisible();
  await expect(unwindInput).toBeEnabled();
  await unwindInput.click();

  const unwindOption = page.locator('li[data-label="3 - Print out, Right first."]');
  await expect(unwindOption).toBeVisible();
  await expect(unwindOption).toBeEnabled();
  await unwindOption.click();

  const laminateInput = page.locator('input[name="productItemSpecification.laminate_type_valuelist_option_id"][type="text"]');
  await expect(laminateInput).toBeVisible();
  await expect(laminateInput).toBeEnabled();
  await laminateInput.click();

  const glossLaminateOption = page.locator('li[data-label="Gloss Laminate"]');
  await expect(glossLaminateOption).toBeVisible();
  await expect(glossLaminateOption).toBeEnabled();
  await glossLaminateOption.click();

  const salesUnitInput = page.locator('input[name="item.sales_unit_id"][type="text"]');
  await expect(salesUnitInput).toBeVisible();
  await expect(salesUnitInput).toBeEnabled();
  await salesUnitInput.click();

  const feetOption = page.locator('li[data-label="Feet"]');
  await expect(feetOption).toBeVisible();
  await expect(feetOption).toBeEnabled();
  await feetOption.click();

  const quantityInput = page.locator('input[name="item.quantity_in_sales_uom"][type="number"]');
  await expect(quantityInput).toBeVisible();
  await expect(quantityInput).toBeEditable();
  await quantityInput.fill(testData.toothCount);

  const descriptionInput = page.locator('//label[@for="productItem.description"]/following-sibling::div/textarea');
  await expect(descriptionInput).toBeVisible();
  await expect(descriptionInput).toBeEditable();
  await descriptionInput.fill(testData.descriptionRequired);

  const categoryInput = page.locator('input[name="productItem.product_item_category"][type="text"]');
  await expect(categoryInput).toBeVisible();
  await expect(categoryInput).toBeEnabled();
  await categoryInput.click();

  const pressureSensitiveOption = page.locator('li[data-label="Pressure Sensitive"]');
  await expect(pressureSensitiveOption).toBeVisible();
  await expect(pressureSensitiveOption).toBeEnabled();
  await pressureSensitiveOption.click();

  const createButton = page.getByRole('button', { name: 'Create', exact: true });
  await expect(createButton).toBeVisible();
  await expect(createButton).toBeEnabled();
  await createButton.click();

  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  // Land on Product Item show page — Product Item # is system-generated after Create
  const productItemHeading = page.locator('div').filter({ hasText: '-Product Item' }).first();
  await expect(productItemHeading).toBeVisible();
  const headingText = (await productItemHeading.textContent() || '').trim();
  const productItemId = headingText.split('-Product Item')[0].trim();
  console.log(`[data] Created productItemId: ${productItemId}`);
  expect(productItemId.length).toBeGreaterThan(0);

  const productItemInfoSection = page.locator('div').filter({ hasText: 'Product Item Information' }).first();
  await expect(productItemInfoSection).toBeVisible();

  const detailsTabButton = page.locator('[data-cy="hub-tab-details"]');
  await expect(detailsTabButton).toBeVisible();
});
