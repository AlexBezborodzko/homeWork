import {expect, test} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {ContactUsPage} from '../pages/ContactUsPage';
import {disablingAds} from '../helpers/helpers';
import {fileURLToPath} from 'url';


test.describe('Contact Us', () => {
    let homePage, contactUsPage;
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        contactUsPage = new ContactUsPage(page);
        await disablingAds(page);
        await homePage.navigate();
    });

    test('TC6: should submit contact us form with file upload', async ({page}) => {
        await expect(page).toHaveURL('/');
        await homePage.header.goToContactUs();
        await expect(await contactUsPage.getInTouchHeader).toBeVisible();
        await contactUsPage.fillContactForm('Alex',
            'Alex@example.com',
            'Test Subject',
            'This is a test message.');
        const filePath = fileURLToPath(new URL('../test-data/sample.txt', import.meta.url));
        await contactUsPage.uploadFile(filePath);
        await contactUsPage.acceptAlert();
        await contactUsPage.clickSubmitButton();
        await expect(await contactUsPage.successMessage).toBeVisible();
        await contactUsPage.clickHomeButton();
        await expect(page).toHaveURL('/');


    });
});
