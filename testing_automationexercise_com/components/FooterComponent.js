export class FooterComponent {
    constructor(page) {
        this.page = page;
        this.footerSubscriptionInput = page.getByPlaceholder('Your email address');
        this.footerSubscribeBtn = page.locator('#subscribe');
        this.subscriptionSuccessMsg = page.locator('#success-subscribe');
        this.subscriptionText = page.locator('.single-widget h2:has-text("Subscription")');
    }

    async subscribeWithEmail(email) {
        await this.footerSubscriptionInput.fill(email);
    }

    async clickSubscribeButton() {
        await this.footerSubscribeBtn.click();
    }
    
}