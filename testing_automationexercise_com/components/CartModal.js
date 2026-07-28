export class CartModal {
    constructor(page) {
        this.page = page;
        this.modal = page.locator('.modal-content');
        this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
        this.viewCartBtn = page.locator('a:has-text("View Cart")');
        this.successMessage = page.locator('.modal-body p').first();
        this.cartTable = page.locator('#cart_info_table tbody tr:not(.cart_menu)');
    };

    async waitForModalVisible(timeout = 10000) {
        await this.modal.waitFor({state: 'visible', timeout});
    };

    async continueShopping(timeout = 10000) {
        await this.waitForModalVisible(timeout);
        await this.continueShoppingBtn.click();
        await this.modal.waitFor({state: 'hidden', timeout});
    };

    async viewCart(timeout = 10000) {
        await this.waitForModalVisible(timeout);
        await this.viewCartBtn.click();
        await this.page.waitForURL(/.*view_cart/, {timeout});
        await this.cartTable.first().waitFor({state: 'visible', timeout});
    };
}