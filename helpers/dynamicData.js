const { faker } = require('@faker-js/faker');

/**
 * Generates unique business input values for one test session.
 * Keys match test-data.json fields used by recorded scripts.
 */
function generateDynamicFields() {
  return {
    firstNameRequired: faker.person.firstName(),
    lastNameRequired: faker.person.lastName(),
    nameRequired: faker.person.fullName(),
    description: faker.lorem.sentence(),
    descriptionRequired: faker.lorem.sentence(),
    appearanceColorRequired: faker.color.human(),
    substrateFaceOrFacestock: faker.commerce.productMaterial(),
    adhesiveRequired: faker.commerce.productAdjective(),
    linerRequired: faker.commerce.productMaterial(),
  };
}

module.exports = {
  generateDynamicFields,
};
