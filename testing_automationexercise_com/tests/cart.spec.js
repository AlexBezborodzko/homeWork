// import {test} from '../fixtures/fixture.js';
import {HomePage} from '../pages/HomePage.js';
import {ProductsPage} from '../pages/ProductsPage.js';
import {CartPage} from '../pages/CartPage.js';
import {disablingAds} from '../helpers/helpers.js';
import {expect, test} from '@playwright/test';

test.describe('Cart Tests', () => {
    let homePage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);

        await disablingAds(page);
        await homePage.navigate();
    });

    test('TC12: should add multiple products to the cart', async ({page}) => {
        await expect(page).toHaveURL('/');
        await homePage.header.goToProducts();
        const productsPage = new ProductsPage(page);
        await productsPage.waitForLoaded();
        const modal = await productsPage.addProductToCartByName('Blue Top');
        await expect(await modal.successMessage).toContainText('Your product has been added to cart.');
        await modal.continueShopping();
        const modal2 = await productsPage.addProductToCartByName('Men Tshirt');
        await expect(await modal2.successMessage).toContainText('Your product has been added to cart.');
        await modal2.viewCart();
        const cartPage = new CartPage(page);
        const count = await cartPage.getCartItemCount();
        expect(count).toBe(2);
        const itemNames = await cartPage.getItemNames();
        expect(itemNames).toContain('Blue Top');
        expect(itemNames).toContain('Men Tshirt');
        const price1 = await cartPage.getItemPrice(0);
        const quantity1 = await cartPage.getItemQuantity(0);
        const total1 = await cartPage.getItemTotalPrice(0);
        expect(price1 * quantity1).toBe(total1);
        const price2 = await cartPage.getItemPrice(1);
        const quantity2 = await cartPage.getItemQuantity(1);
        const total2 = await cartPage.getItemTotalPrice(1);
        expect(price2 * quantity2).toBe(total2);
    });
});