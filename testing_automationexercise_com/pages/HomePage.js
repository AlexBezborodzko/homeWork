import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { FooterComponent } from '../components/FooterComponent';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.categoryContainer = page.locator('#accordian');
    this.categoryTitle = page.locator('.title.text-center');
    this.categoryLinks = {
      Women: page.locator('#accordian a[href="#Women"]'),
      Men: page.locator('#accordian a[href="#Men"]'),
      Kids: page.locator('#accordian a[href="#Kids"]'),
    };
    this.currentCategoryId = null;
    this.scrollUpButton = page.locator('#scrollUp');
    this.logo = page.locator('.logo.pull-left');
    this.footer = page.locator('footer');
  }

  getSubcategoryLocator(categoryId, subcategoryName) {
    return this.page.locator(`#${categoryId} a:has-text("${subcategoryName}")`);
  }

  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async clickCategory(categoryName) {
    const link = this.categoryLinks[categoryName];
    await link.waitFor({ state: 'visible', timeout: 10000 });
    await link.click();
    this.currentCategoryId = categoryName;
  }

  async clickSubcategory(subcategoryName) {
    const subcategoryLocator = this.getSubcategoryLocator(this.currentCategoryId, subcategoryName);
    await subcategoryLocator.waitFor({ state: 'visible', timeout: 10000 });
    await subcategoryLocator.click();
  }

  async getCategoryTitle() {
    await this.categoryTitle.waitFor({ state: 'visible', timeout: 5000 });
    return this.categoryTitle.textContent();
  }
}
