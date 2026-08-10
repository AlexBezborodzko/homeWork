import Ajv from 'ajv';
import { expect } from '@playwright/test';

export async function disablingAds(page) {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    const blocklist = [
      'google-analytics.com',
      'googletagmanager.com',
      'doubleclick.net',
      'facebook.com',
      'hotjar.com',
    ];

    if (blocklist.some((domain) => url.includes(domain))) {
      return route.abort();
    }
    return route.continue();
  });
}

export function createValidator(schema, entityName) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  function validateSingle(item) {
    const valid = validate(item);
    if (!valid) {
      const errors = validate.errors.map((err) => `${err.instancePath} ${err.message}`).join('; ');
      throw new Error(`Brand validation failed: ${errors}`);
    }
  }

  function validateArray(items) {
    validateArrayItems(items, validateSingle, entityName);
  }

  return { validateSingle, validateArray };
}

export function validateArrayItems(items, validator, itemName = 'Item') {
  items.forEach((item, index) => {
    try {
      validator(item);
    } catch (error) {
      const newError = new Error(
        `${itemName} at index ${index} failed validation: ${error.message}`,
      );
      newError.cause = error;
      throw newError;
    }
  });
}

export async function addProductToCart(productsPage, productName, action = 'continue') {
  const modal = await productsPage.addProductToCartByName(productName);
  await expect(await modal.successMessage).toContainText('Your product has been added to cart.');
  if (action === 'continue') {
    await modal.continueShopping();
  } else if (action === 'view') {
    await modal.viewCart();
  }
  return modal;
}
