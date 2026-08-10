import { test } from '../../fixtures/fixture.js';
import { HomePage } from '../../pages/HomePage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { addProductToCart, disablingAds } from '../../helpers/helpers.js';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test.describe('Cart Tests', () => {
  let homePage, cartPage, productsPage, loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    loginPage = new LoginPage(page);
    await disablingAds(page);
    await homePage.navigate();
  });

  test(
    'TC12: should add multiple products to the cart ',
    { tag: ['@smoke', '@ui', '@regression'] },
    async () => {
      await test.step('Navigate to Products and add first product', async () => {
        await homePage.header.goToProducts();
        await productsPage.waitForLoaded();
        await addProductToCart(productsPage, 'Blue Top', 'continue');
      });

      await test.step('Add second product and go to cart', async () => {
        await addProductToCart(productsPage, 'Men Tshirt', 'view');
      });

      await test.step('Verify cart contains both products', async () => {
        expect(await cartPage.getCartItemCount()).toBe(2);
        expect(await cartPage.getItemNames()).toContain('Blue Top');
        expect(await cartPage.getItemNames()).toContain('Men Tshirt');
      });

      await test.step('Verify prices and totals', async () => {
        expect((await cartPage.getItemPrice(0)) * (await cartPage.getItemQuantity(0))).toBe(
          await cartPage.getItemTotalPrice(0)
        );

        expect((await cartPage.getItemPrice(1)) * (await cartPage.getItemQuantity(1))).toBe(
          await cartPage.getItemTotalPrice(1)
        );
      });
    }
  );

  test(
    'TC23: should verify delivery and billing addresses on checkout page',
    { tag: ['@ui', '@regression'] },
    async ({ newUser }) => {
      await test.step('Register new user', async () => {
        await homePage.header.goToSignupLogin();
        await loginPage.registerFullUser(newUser);
      });

      await test.step('Add product to cart', async () => {
        await homePage.header.goToProducts();
        await productsPage.waitForLoaded();
        await addProductToCart(productsPage, 'Blue Top', 'continue');
      });

      await test.step('Proceed to checkout and verify addresses', async () => {
        await homePage.header.goToCart();
        await cartPage.proceedToCheckout.click();
        await expect(cartPage.deliveryAddress1).toHaveText(newUser.address1);
        await expect(cartPage.deliveryAddress2).toHaveText(newUser.address2);
        await expect(cartPage.deliveryPhone).toHaveText(newUser.mobile_number);
      });

      await test.step('Delete account', async () => {
        await homePage.header.goToDeleteAccount();
      });
    }
  );

  test(
    'TC24: should remove product from cart successfully',
    { tag: ['@ui', '@regression'] },
    async () => {
      await test.step('Add product to cart', async () => {
        await homePage.header.goToProducts();
        await productsPage.waitForLoaded();
        await addProductToCart(productsPage, 'Blue Top', 'continue');
      });

      await test.step('Go to cart and verify product is present', async () => {
        await homePage.header.goToCart();
        expect(await cartPage.getItemCount()).toBe(1);
      });

      await test.step('Remove product and verify cart is empty', async () => {
        await cartPage.removeItem(0);
        await expect(await cartPage.emptyCartMessage).toBeVisible();
      });
    }
  );
});
