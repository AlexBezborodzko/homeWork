import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';

test.describe('scroll', () => {
  let homePage;
  test.beforeEach(({ page }) => {
    homePage = new HomePage(page);
  });
  test(
    'TC25: should scroll to footer and back to top using arrow button"',
    { tag: ['@regression', '@ui'] },
    async () => {
      await homePage.navigate();
      await homePage.scrollToFooter();
      await expect(await homePage.scrollUpButton).toBeVisible();
      await homePage.scrollUpButton;
      await expect(await homePage.logo).toBeVisible();
    },
  );
  test(
    'TC26: should scroll to footer and back to top without arrow button',
    { tag: ['@regression', '@ui'] },
    async () => {
      await homePage.navigate();
      await homePage.scrollToFooter();
      await homePage.scrollToTop();
      await expect(await homePage.logo).toBeVisible();
    },
  );
});
