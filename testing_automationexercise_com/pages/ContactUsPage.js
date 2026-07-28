import {BasePage} from './BasePage';


export class ContactUsPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.getInTouchHeader = page.getByText('Get In Touch');
        this.inputName = page.locator('[data-qa="name"]');
        this.inputEmail = page.locator('[data-qa="email"]');
        this.inputSubject = page.locator('[data-qa="subject"]');
        this.inputMessage = page.locator('[data-qa="message"]');
        this.submitButton = page.locator('[data-qa="submit-button"]');
        this.successMessage = page.locator('#contact-page .alert-success');
        this.homeButton = page.locator('.btn-success');
        this.fileInput = page.locator('input[name="upload_file"]');
    }

    async fillContactForm(name, email, subject, message) {
        await this.inputName.fill(name);
        await this.inputEmail.fill(email);
        await this.inputSubject.fill(subject);
        await this.inputMessage.fill(message);
    };

    async clickSubmitButton() {
        await this.submitButton.waitFor({state: 'visible'});
        await this.submitButton.click();
    };

    async acceptAlert() {
        this.page.on('dialog', async dialog => {
            await dialog.accept();

        });
        await this.page.waitForLoadState('networkidle');
    };

    async clickHomeButton() {
        await this.homeButton.click();
    }

    async uploadFile(filePath) {
        await this.fileInput.setInputFiles(filePath);
    }


}