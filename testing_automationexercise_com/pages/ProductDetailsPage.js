import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.productName = page.locator('.product-information h2');
    this.category = page.locator('.product-information p:has-text("Category:")');
    this.price = page.locator('.product-information span span');
    this.availability = page.locator('.product-information p:has-text("Availability:")');
    this.condition = page.locator('.product-information p:has-text("Condition:")');
    this.brand = page.locator('.product-information p:has-text("Brand:")');
    this.formReview = page.locator('#review-form');
    this.userName = page.getByPlaceholder('Your Name');
    this.emailAdress = page.locator('#email');
    this.addReview = page.getByPlaceholder('Add Review Here!');
    this.submitButton = page.locator('#button-review');
    this.successMessage = page.locator('#review-section .alert-success');
  }

  async waitForLoaded() {
    await this.productName.waitFor({ state: 'visible' });
  }

  async fillReviewFrom() {
    await this.userName.fill('Alex');
    await this.emailAdress.fill('alex@mail.ru');
    await this.addReview.fill('Very Good!');
    await this.submitButton.click();
  }

  async getProductDetails() {
    const [name, category, price, availability, condition, brand] = await Promise.all([
      this.productName.textContent(),
      this.category.textContent(),
      this.price.textContent(),
      this.availability.textContent(),
      this.condition.textContent(),
      this.brand.textContent(),
    ]);

    return {
      name: name?.trim() || '',
      category: category?.trim() || '',
      price: price?.trim() || '',
      availability: availability?.trim() || '',
      condition: condition?.trim() || '',
      brand: brand?.trim() || '',
    };
  }
}
