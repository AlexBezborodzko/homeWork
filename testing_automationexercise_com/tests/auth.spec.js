import {expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';
import {disablingAds} from '../helpers/helpers';
import {test} from '../fixtures/fixture';


test.describe('Authentication', () => {
    let homePage, loginPage;
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await disablingAds(page);
        await homePage.navigate();


    });
    test('TC1: should register a new user successfully', async ({page, newUser}) => {
        await homePage.header.goToSignupLogin();
        await loginPage.registerFullUser(newUser);
        await loginPage.clickCreateAccount();
        await expect(await loginPage.accountCreatedHeader).toBeVisible();
        await loginPage.clickContinue();
        await expect(page).toHaveURL('/');
        await expect(await homePage.header.loggedInUser).toHaveText(`Logged in as ${newUser.name}`);


    });

    test('TC2: should log in with valid credentials', async ({page, newUser}) => {
        await expect(page).toHaveURL('/');
        await homePage.header.goToSignupLogin();
        await loginPage.registerFullUser(newUser);
        await loginPage.clickCreateAccount();
        await expect(await loginPage.accountCreatedHeader).toBeVisible();
        await loginPage.clickContinue();
        await expect(page).toHaveURL('/');
        await expect(await homePage.header.loggedInUser).toHaveText(`Logged in as ${newUser.name}`);
        await homePage.header.goToLogout();
        await expect(page).toHaveURL('/login');
        await loginPage.loginUser(newUser.email, newUser.password);
        await loginPage.clickLoginBtn();
        await expect(await homePage.header.loggedInUser).toHaveText(`Logged in as ${newUser.name}`);


    });

    test('TC3: should not log in with invalid credentials', async ({page, newUser}) => {

        await expect(page).toHaveURL('/');
        await homePage.header.goToSignupLogin();
        await expect(await loginPage.loginBtn).toBeVisible();
        await loginPage.loginUser(newUser.email, newUser.password);
        await loginPage.clickLoginBtn();
        await expect(await loginPage.errorMsg).toBeVisible();

    });
    test('TC4: should log out successfully', async ({page, newUser}) => {
        await expect(page).toHaveURL('/');
        await homePage.header.goToSignupLogin();
        await expect(await loginPage.loginBtn).toBeVisible();
        await loginPage.registerFullUser(newUser);
        await loginPage.clickCreateAccount();
        await expect(await loginPage.accountCreatedHeader).toBeVisible();
        await loginPage.clickContinue();
        await expect(await homePage.header.loggedInUser).toHaveText(`Logged in as ${newUser.name}`);
        await homePage.header.goToLogout();
        await expect(page).toHaveURL('/login');


    });
    test('TC10: should subscribe to newsletter from home page', async ({page, newUser}) => {
        await expect(page).toHaveURL('/');
        await expect(await loginPage.footer.subscriptionText).toBeVisible();
        await loginPage.footer.subscribeWithEmail(newUser.email);
        await loginPage.footer.clickSubscribeButton();
        await expect(await loginPage.footer.subscriptionSuccessMsg).toBeVisible();

    });

    test('TC11: should subscribe to newsletter from cart page', async ({page, newUser}) => {
        await expect(page).toHaveURL('/');
        await homePage.header.goToCart();
        await expect(await loginPage.footer.subscriptionText).toBeVisible();
        await loginPage.footer.subscribeWithEmail(newUser.email);
        await loginPage.footer.clickSubscribeButton();
        await expect(await loginPage.footer.subscriptionSuccessMsg).toBeVisible();
    });

});