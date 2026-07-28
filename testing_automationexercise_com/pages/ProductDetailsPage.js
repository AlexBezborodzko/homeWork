import {BasePage} from './BasePage';

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
    }

    async waitForLoaded() {
        await this.productName.waitFor({state: 'visible'});
    }

    async getProductName() {
        return await this.productName.textContent();
    }

    async getCategory() {
        return await this.category.textContent();
    }

    async getPrice() {
        return await this.price.textContent();
    }

    async getAvailability() {
        return await this.availability.textContent();
    }

    async getCondition() {
        return await this.condition.textContent();
    }

    async getBrand() {
        return await this.brand.textContent();
    }
}