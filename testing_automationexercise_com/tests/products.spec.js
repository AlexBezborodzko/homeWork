import {test} from '../fixtures/fixture.js';
import {ProductsPage} from '../pages/ProductsPage.js';
import {HomePage} from '../pages/HomePage.js';
import {expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {disablingAds} from '../helpers/helpers';

test.describe('Products Tests', () => {
    let homePage, loginPage;
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await disablingAds(page);
        await homePage.navigate();


    });

    test('TC8: should display all products and product details', async ({page}) => {

        await expect(page).toHaveURL('/');
        await expect(homePage.categoryContainer).toBeVisible();
        await homePage.header.goToProducts();
        const productsPage = new ProductsPage(page);
        await productsPage.waitForLoaded();
        await expect(await productsPage.productsTitle).toBeVisible();
        await expect(page).toHaveURL(/.*products/);
        const count = await productsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
        const productDetailsPage = await productsPage.clickViewFirstProduct();
        await productDetailsPage.waitForLoaded();
        await expect(page).toHaveURL(/.*product_details/);
        await expect(await productDetailsPage.productName).toBeVisible();
        await expect(await productDetailsPage.category).toBeVisible();
        await expect(await productDetailsPage.price).toBeVisible();
        await expect(await productDetailsPage.availability).toBeVisible();
        await expect(await productDetailsPage.condition).toBeVisible();
        await expect(await productDetailsPage.brand).toBeVisible();


    });
    test('TC18: should filter products by category', async ({page}) => {
        await expect(page).toHaveURL('/');
        await expect(homePage.categoryContainer).toBeVisible();
        await homePage.clickCategory('Women');
        await homePage.clickSubcategory('Dress');
        const productsPage = new ProductsPage(page);
        await expect(page).toHaveURL(/.*category_products/);
        expect(await homePage.getCategoryTitle()).toContain('Women - Dress Products');
        expect(await productsPage.getProductCount()).toBeGreaterThan(0);
        await homePage.clickCategory('Men');
        await homePage.clickSubcategory('Tshirts');
        expect(await homePage.getCategoryTitle()).toContain('Men - Tshirts Products');
        expect(await productsPage.getProductCount()).toBeGreaterThan(0);


    });
});