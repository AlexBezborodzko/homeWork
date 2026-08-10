import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { ContactUsPage } from '../../pages/ContactUsPage.js';
import { disablingAds } from '../../helpers/helpers.js';

test.describe('Contact Us', () => {
  let homePage, contactUsPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactUsPage = new ContactUsPage(page);
    await disablingAds(page);
    await homePage.navigate();
  });

  test(
    'TC6: should submit contact us form with file upload',
    { tag: ['@ui', '@regression'] },
    async () => {
      await homePage.header.goToContactUs();
      await contactUsPage.fillContactForm(
        'Alex',
        'Alex@example.com',
        'Test Subject',
        'This is a test message.'
      );
      await contactUsPage.uploadFile('test-data/sample.txt');
      await contactUsPage.acceptAlert();
      await contactUsPage.clickSubmitButton();
      await expect(await contactUsPage.successMessage).toBeVisible();
    }
  );
});
