import { BasePage } from './BasePage.js';
import { ProductDetailsPage } from './ProductDetailsPage.js';
import { CartModal } from '../components/CartModal.js';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productsTitle = page.locator('.title:has-text("All Products")');
    this.productCards = page.locator('.product-image-wrapper');
    this.firstViewProductBtn = page.locator('.choose a').first();
    this.modalContent = page.locator('.modal-content');
    this.modalSuccessMessage = this.modalContent.locator(
      '.modal-body p:has-text("Your product has been added")',
    );
  }

  getProductCard(productName) {
    return this.page
      .locator('.product-image-wrapper', {
        has: this.page.locator(`.productinfo p:has-text("${productName}")`),
      })
      .first();
  }

  getAddToCartButton(card) {
    return card.locator('.productinfo a:has-text("Add to cart")').first();
  }

  getProductCount() {
    return this.productCards.count();
  }

  async waitForLoaded() {
    await this.productsTitle.waitFor({ state: 'visible' });
  }

  async clickViewFirstProduct() {
    await this.firstViewProductBtn.click();
    return new ProductDetailsPage(this.page);
  }

  async addProductToCartByName(productName) {
    const card = this.getProductCard(productName);
    await card.waitFor({ state: 'attached' });
    const addButton = this.getAddToCartButton(card);
    await addButton.waitFor({ state: 'visible' });
    await addButton.scrollIntoViewIfNeeded();
    await addButton.evaluate((el) => el.click());
    await this.modalContent.waitFor({ state: 'visible' });
    await this.modalSuccessMessage.waitFor({ state: 'visible' });
    return new CartModal(this.page);
  }
}
