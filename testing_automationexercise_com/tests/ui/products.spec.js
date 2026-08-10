import { test } from '../../fixtures/fixture.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { HomePage } from '../../pages/HomePage.js';
import { expect } from '@playwright/test';
import { disablingAds } from '../../helpers/helpers.js';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage.js';

test.describe('Products Tests', () => {
  let homePage, productsPage;
  let productDetailsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    await disablingAds(page);
    await homePage.navigate();
  });

  test(
    'TC8: should display all products and product details',
    { tag: ['@smoke', '@ui', '@regression'] },
    async () => {
      await homePage.header.goToProducts();
      await productsPage.waitForLoaded();
      await expect(await productsPage.productsTitle).toBeVisible();
      expect(await productsPage.getProductCount()).toBeGreaterThan(0);
      const productDetailsPage = await productsPage.clickViewFirstProduct();
      await productDetailsPage.waitForLoaded();
      await expect(await productDetailsPage.productName).toBeVisible();
      await expect(await productDetailsPage.category).toBeVisible();
      await expect(await productDetailsPage.price).toBeVisible();
      await expect(await productDetailsPage.availability).toBeVisible();
      await expect(await productDetailsPage.condition).toBeVisible();
      await expect(await productDetailsPage.brand).toBeVisible();
    },
  );
  test('TC18: should filter products by category', { tag: ['@ui', '@regression'] }, async () => {
    await expect(await homePage.categoryContainer).toBeVisible();
    await homePage.clickCategory('Women');
    await homePage.clickSubcategory('Dress');
    expect(await homePage.getCategoryTitle()).toContain('Women - Dress Products');
    expect(await productsPage.getProductCount()).toBeGreaterThan(0);
    await homePage.clickCategory('Men');
    await homePage.clickSubcategory('Tshirts');
    expect(await homePage.getCategoryTitle()).toContain('Men - Tshirts Products');
    expect(await productsPage.getProductCount()).toBeGreaterThan(0);
  });
  test(
    'TC21: should add review to product successfully',
    { tag: ['@ui', '@regression'] },
    async () => {
      await homePage.header.goToProducts();
      await productsPage.waitForLoaded();
      await expect(await productsPage.productsTitle).toBeVisible();
      await productsPage.clickViewFirstProduct();
      await expect(await productDetailsPage.formReview).toBeVisible();
      await productDetailsPage.fillReviewFrom();
      await expect(productDetailsPage.successMessage).toHaveText('Thank you for your review.');
    },
  );
  test(
    'TC30: should view product details and verify data',
    { tag: ['@ui', '@regression'] },
    async () => {
      await homePage.header.goToProducts();
      await productsPage.waitForLoaded();
      await productsPage.clickViewFirstProduct();
      const details = await productDetailsPage.getProductDetails();
      expect(details.name).toBe('Blue Top');
      expect(details.price).toBe('Rs. 500');
      expect(details.category).toContain('Women > Tops');
      expect(details.availability).toContain('In Stock');
      expect(details.condition).toBe('Condition: New');
      expect(details.brand).toBe('Brand: Polo');
    },
  );
});
