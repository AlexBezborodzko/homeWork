class BasePage {
    constructor(page) {
        this.page = page;
    }


    async navigate(url = '/') {
        await this.page.goto(url);
    };

    async getPageTitle() {
        return await this.page.title();
    };
}

export {BasePage};
