import { expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { disablingAds } from '../../helpers/helpers.js';
import { test } from '../../fixtures/fixture.js';
import { LoginAPI } from '../../api/LoginApi.js';

test.describe('Authentication', () => {
  let homePage, loginPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await disablingAds(page);
    await homePage.navigate();
    await homePage.header.goToSignupLogin();
  });

  test(
    'TC1: should register a new user successfully ',
    { tag: ['@smoke', '@ui', '@regression'] },
    async ({ newUser }) => {
      await loginPage.registerFullUser(newUser);
      await expect(await loginPage.accountCreatedHeader).toBeVisible();
      await loginPage.clickContinue();
      await expect(await homePage.header.loggedInUser).toHaveText(`Logged in as ${newUser.name}`);
      await homePage.header.goToDeleteAccount();
    }
  );

  test(
    'TC2: should log in with valid credentials',
    { tag: ['@smoke', '@ui', '@regression'] },
    async ({ page, newUser }) => {
      await loginPage.registerFullUser(newUser);
      await expect(await loginPage.accountCreatedHeader).toBeVisible();
      await loginPage.clickContinue();
      await expect(await homePage.header.loggedInUser).toHaveText(`Logged in as ${newUser.name}`);
      await homePage.header.goToLogout();
      await expect(page).toHaveURL('/login');
      await loginPage.loginUser(newUser.email, newUser.password);
      await expect(await homePage.header.loggedInUser).toHaveText(`Logged in as ${newUser.name}`);
      await homePage.header.goToDeleteAccount();
    }
  );

  test(
    'TC3: should not log in with invalid credentials',
    { tag: ['@regression', '@ui'] },
    async ({ newUser }) => {
      await loginPage.loginUser(newUser.email, newUser.password);
      await expect(await loginPage.errorMsg).toBeVisible();
    }
  );

  test(
    'TC4: should log out successfully',
    { tag: ['@smoke', '@ui', '@regression'] },
    async ({ page, newUser }) => {
      await loginPage.registerFullUser(newUser);
      await expect(await loginPage.accountCreatedHeader).toBeVisible();
      await loginPage.clickContinue();
      await expect(await homePage.header.loggedInUser).toHaveText(`Logged in as ${newUser.name}`);
      await homePage.header.goToLogout();
      await expect(page).toHaveURL('/login');
    }
  );

  test(
    'TC10: should subscribe to newsletter from home page',
    { tag: ['@smoke', '@ui', '@regression'] },
    async ({ newUser }) => {
      await expect(await loginPage.footer.subscriptionText).toBeVisible();
      await loginPage.footer.subscribeWithEmail(newUser.email);
      await expect(await loginPage.footer.subscriptionSuccessMsg).toBeVisible();
    }
  );

  test(
    'TC11: should subscribe to newsletter from cart page',
    { tag: ['@smoke', '@ui', '@regression'] },
    async ({ newUser }) => {
      await homePage.header.goToCart();
      await expect(await loginPage.footer.subscriptionText).toBeVisible();
      await loginPage.footer.subscribeWithEmail(newUser.email);
      await expect(await loginPage.footer.subscriptionSuccessMsg).toBeVisible();
    }
  );
});
test.describe('Combined API + UI', () => {
  let homePage;
  let loginPage;
  let loginApi;

  test.beforeEach(({ page, request }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    loginApi = new LoginAPI(request);
  });

  test(
    'TC_API_UI_01: Register user via API and verify login via UI',
    { tag: ['@smoke', '@regression'] },
    async ({ newUser }) => {
      await test.step('Create user via API', async () => {
        const createResult = await loginApi.createAccount(newUser);
        expect(createResult.body.responseCode).toBe(201);
        expect(createResult.body.message).toBe('User created!');
      });
      await test.step('Navigate to login page', async () => {
        await homePage.navigate();
        await homePage.header.goToSignupLogin();
      });

      await test.step('Log in with API-created credentials', async () => {
        await loginPage.loginUser(newUser.email, newUser.password);
      });
      await test.step('Verify logged-in user name in UI', async () => {
        await expect(await homePage.header.loggedInUser).toHaveText(`Logged in as ${newUser.name}`);
      });
    }
  );
});
