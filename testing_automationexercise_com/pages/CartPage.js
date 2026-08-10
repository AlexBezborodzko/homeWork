import { BasePage } from './BasePage.js';
import { HeaderComponent } from '../components/HeaderComponent.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.cartItems = page.locator('#cart_info_table tbody tr:not(.cart_menu)');
    this.selectors = {
      price: '.cart_price p',
      priceFallback: '.cart_price',
      quantity: '.cart_quantity button',
      quantityFallback: '.cart_quantity',
      total: '.cart_total',
      name: '.cart_description a',
    };
    this.proceedToCheckout = page.locator('.btn.btn-default.check_out');
    this.deliveryBlock = page.locator('#address_delivery');
    this.deliveryAddress1 = this.deliveryBlock.locator('li').nth(3);
    this.deliveryAddress2 = this.deliveryBlock.locator('li').nth(4);
    this.deliveryPhone = this.deliveryBlock.locator('li').nth(7);
    this.deleteButton = (index) => this.cartItems.nth(index).locator('.cart_quantity_delete');
    this.emptyCartMessage = page.locator('#empty_cart');
  }

  getCartItemCount() {
    return this.cartItems.count();
  }

  async removeItem(index) {
    await this.deleteButton(index).click();
  }

  getItemCount() {
    return this.cartItems.count();
  }

  async getTextFromItem(item, primarySelector, fallbackSelector) {
    const primary = item.locator(primarySelector);
    if ((await primary.count()) > 0) {
      return primary.textContent();
    }
    const fallback = item.locator(fallbackSelector);
    return fallback.textContent();
  }

  async getItemPrice(index = 0) {
    const item = this.cartItems.nth(index);
    const text = await this.getTextFromItem(
      item,
      this.selectors.price,
      this.selectors.priceFallback
    );
    return parseInt(text.replace(/[^0-9]/g, ''), 10);
  }

  async getItemQuantity(index = 0) {
    const item = this.cartItems.nth(index);
    const text = await this.getTextFromItem(
      item,
      this.selectors.quantity,
      this.selectors.quantityFallback
    );
    return parseInt(text.replace(/[^0-9]/g, ''), 10);
  }

  async getItemTotalPrice(index = 0) {
    const item = this.cartItems.nth(index);
    const text = await this.getTextFromItem(item, this.selectors.total, this.selectors.total);
    return parseInt(text.replace(/[^0-9]/g, ''), 10);
  }

  async getItemNames() {
    const names = [];
    const items = await this.cartItems.all();
    for (const item of items) {
      const name = await item.locator(this.selectors.name).textContent();
      names.push(name.trim());
    }
    return names;
  }
}
