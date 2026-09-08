// Verify General Info section on Product Item show page after create (TC45 / TC48)
import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');
const { prepareSession } = require('../../helpers/sessionData');

test('Verify General Info section in Product Item @regression @set2', async ({ page }) => {
  const session = prepareSession({ force: true });
  Object.assign(testData, session);
  console.log(`[data] customerPartNumberRequired: ${session.customerPartNumberRequired}`);
  console.log(`[data] brandName: ${session.brandName}`);

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

  await heal(page, 'new product item link', 'visible', null,
    () => page.getByRole('link', { name: 'New Product Item', exact: true }));
  await heal(page, 'new product item link', 'click', null,
    () => page.getByRole('link', { name: 'New Product Item', exact: true }));

  await heal(page, 'new product item text', 'visible', null,
    () => page.locator('//label[normalize-space()="New Product Item"]').first());

  await heal(page, 'select customer button', 'click', null,
    () => page.getByRole('button', { name: 'Select Customer', exact: true }));

  await heal(page, 'customer quick search field', 'click', null,
    () => page.getByPlaceholder('Quick Search').first());
  await heal(page, 'customer quick search field', 'fill', testData.quickSearch,
    () => page.getByPlaceholder('Quick Search').first());

  await heal(page, 'customer cell', 'visible', null,
    () => page.locator('td').filter({ hasText: testData.quickSearch }).first());
  await heal(page, 'customer cell', 'click', null,
    () => page.locator('td').filter({ hasText: testData.quickSearch }).first());
  await page.waitForTimeout(2000);

  await heal(page, 'unlink button', 'visible', null,
    () => page.getByRole('button', { name: 'Unlink', exact: true }));
  await heal(page, 'cancel customer button', 'visible', null,
    () => page.getByRole('button', { name: 'Cancel', exact: true }).first());

  await heal(page, 'continue product item button', 'click', null,
    () => page.getByRole('button', { name: 'Continue', exact: true }));

  await heal(page, 'product class field', 'visible', null,
    () => page.locator('input[name="deliverableItem.product_class_id"][type="text"]'));
  await heal(page, 'product class field', 'click', null,
    () => page.locator('input[name="deliverableItem.product_class_id"][type="text"]'));

  await heal(page, 'prime label option', 'visible', null,
    () => page.locator('li[data-label="Prime Label"]'));
  await heal(page, 'prime label option', 'click', null,
    () => page.locator('li[data-label="Prime Label"]'));

  await heal(page, 'customer part number field', 'visible', null,
    () => page.locator('input[name="productItemExtension.customer_part_number"][type="text"]'));
  await heal(page, 'customer part number field', 'fill', testData.customerPartNumberRequired,
    () => page.locator('input[name="productItemExtension.customer_part_number"][type="text"]'));

  await heal(page, 'brand name field', 'visible', null,
    () => page.locator('input[name="productItemExtension.brand_name"][type="text"]'));
  await heal(page, 'brand name field', 'fill', testData.brandName,
    () => page.locator('input[name="productItemExtension.brand_name"][type="text"]'));

  await heal(page, 'max odinput', 'visible', null,
    () => page.locator('input[name="specification.max_roll_diameter"][type="number"]'));
  await heal(page, 'max odinput', 'fill', testData.editingAncillaryItemsQuantity,
    () => page.locator('input[name="specification.max_roll_diameter"][type="number"]'));

  await heal(page, 'substrate field', 'visible', null,
    () => page.locator('input[name="productItemExtension.substrate_text"][type="text"]'));
  await heal(page, 'substrate field', 'fill', testData.substrateFaceOrFacestock,
    () => page.locator('input[name="productItemExtension.substrate_text"][type="text"]'));

  await heal(page, 'coating field', 'visible', null,
    () => page.locator('input[name="specification.coating_type_valuelist_option_id"][type="text"]'));
  await heal(page, 'coating field', 'click', null,
    () => page.locator('input[name="specification.coating_type_valuelist_option_id"][type="text"]'));

  await heal(page, 'uv matte option', 'visible', null,
    () => page.locator('li[data-label="UV Matte"]'));
  await heal(page, 'uv matte option', 'click', null,
    () => page.locator('li[data-label="UV Matte"]'));

  await heal(page, 'core diameter field', 'visible', null,
    () => page.locator('input[name="specification.core_diameter_id"][type="text"]'));
  await heal(page, 'core diameter field', 'click', null,
    () => page.locator('input[name="specification.core_diameter_id"][type="text"]'));

  await heal(page, 'core diameter option', 'visible', null,
    () => page.locator('li[data-label="1"]'));
  await heal(page, 'core diameter option', 'click', null,
    () => page.locator('li[data-label="1"]'));

  await heal(page, 'unwind field', 'visible', null,
    () => page.locator('input[name="specification.wind_direction_id"][type="text"]'));
  await heal(page, 'unwind field', 'click', null,
    () => page.locator('input[name="specification.wind_direction_id"][type="text"]'));

  await heal(page, 'unwind option', 'visible', null,
    () => page.locator('li[data-label="3 - Print out, Right first."]'));
  await heal(page, 'unwind option', 'click', null,
    () => page.locator('li[data-label="3 - Print out, Right first."]'));

  await heal(page, 'laminate field', 'visible', null,
    () => page.locator('input[name="specification.laminate_type_valuelist_option_id"][type="text"]'));
  await heal(page, 'laminate field', 'click', null,
    () => page.locator('input[name="specification.laminate_type_valuelist_option_id"][type="text"]'));

  await heal(page, 'gloss laminate option', 'visible', null,
    () => page.locator('li[data-label="Gloss Laminate"]'));
  await heal(page, 'gloss laminate option', 'click', null,
    () => page.locator('li[data-label="Gloss Laminate"]'));

  await heal(page, 'sales unit field', 'visible', null,
    () => page.locator('input[name="item.sales_unit_id"][type="text"]'));
  await heal(page, 'sales unit field', 'click', null,
    () => page.locator('input[name="item.sales_unit_id"][type="text"]'));

  await heal(page, 'feet option', 'visible', null,
    () => page.locator('li[data-label="Feet"]'));
  await heal(page, 'feet option', 'click', null,
    () => page.locator('li[data-label="Feet"]'));

  await heal(page, 'quantity field', 'visible', null,
    () => page.locator('input[name="item.quantity_in_sales_uom"][type="number"]'));
  await heal(page, 'quantity field', 'fill', testData.toothCount,
    () => page.locator('input[name="item.quantity_in_sales_uom"][type="number"]'));

  await heal(page, 'description field', 'visible', null,
    () => page.locator('//label[@for="deliverableItem.description"]/following-sibling::div/textarea'));
  await heal(page, 'description field', 'fill', testData.descriptionRequired,
    () => page.locator('//label[@for="deliverableItem.description"]/following-sibling::div/textarea'));

  await heal(page, 'category field', 'visible', null,
    () => page.locator('input[name="productItemExtension.product_item_category"][type="text"]'));
  await heal(page, 'category field', 'click', null,
    () => page.locator('input[name="productItemExtension.product_item_category"][type="text"]'));

  await heal(page, 'pressure sensitive option', 'visible', null,
    () => page.locator('li[data-label="Pressure Sensitive"]'));
  await heal(page, 'pressure sensitive option', 'click', null,
    () => page.locator('li[data-label="Pressure Sensitive"]'));

  await heal(page, 'c of crequired checkbox', 'check', null,
    () => page.locator('#productitemc-of-c-required-productitemc-of-c-required-c-of-c-required'));
  await expect(page.locator('#productitemc-of-c-required-productitemc-of-c-required-c-of-c-required')).toBeChecked();

  await heal(page, 'aib compliance checkbox', 'check', null,
    () => page.locator('#productitemaib-compliance-productitemaib-compliance-aib-compliance'));
  await expect(page.locator('#productitemaib-compliance-productitemaib-compliance-aib-compliance')).toBeChecked();

  await heal(page, 'sqf compliance checkbox', 'check', null,
    () => page.locator('#productitemsqf-compliance-productitemsqf-compliance-sqf-compliance'));
  await expect(page.locator('#productitemsqf-compliance-productitemsqf-compliance-sqf-compliance')).toBeChecked();

  await heal(page, 'create button', 'click', null,
    () => page.getByRole('button', { name: 'Create', exact: true }));

  await heal(page, 'success message', 'visible', null,
    () => page.locator('p').filter({ hasText: 'Product Item created successfully' }).first());

  await heal(page, 'product class prime label', 'visible', null,
    () => page.locator('div').filter({ hasText: 'Product Class Prime Label' }).first());

  await heal(page, 'description on show page', 'visible', null,
    () => page.locator('div') .filter({ hasText: `Description ${testData.descriptionRequired}` }) .first());

  await heal(page, 'brand name span', 'visible', null,
    () => page.locator('span') .filter({ hasText: `Brand Name: ${testData.brandName}` }) .first());

  await heal(page, 'customer part number span', 'visible', null,
    () => page.locator('span') .filter({ hasText: `Customer Part # ${testData.customerPartNumberRequired}` }) .first());

  await expect(page.locator('//div[normalize-space()="Product Item Category"]/following-sibling::div//span')).toHaveText('Pressure Sensitive');

  await expect(page.locator('//div[normalize-space()="Sales Unit"]/following-sibling::div//span')).toHaveText('Feet');

  await expect(page.locator('//div[normalize-space()="Quantity in Sales UOM"]/following-sibling::div//span')).toHaveText(testData.toothCount);

  await heal(page, 'c of crequired yes div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'C of C Required Yes' }).first());

  await heal(page, 'aib compliance yes div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'AIB Compliance Yes' }).first());

  await heal(page, 'sqf compliance yes div', 'visible', null,
    () => page.locator('div').filter({ hasText: 'SQF Compliance Yes' }).first());

  await heal(page, 'product route heading', 'visible', null,
    () => page.locator('h3').filter({ hasText: 'Product Route' }).first());
});
