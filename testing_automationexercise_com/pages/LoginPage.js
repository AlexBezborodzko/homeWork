import {BasePage} from './BasePage';
import {FooterComponent} from '../components/FooterComponent';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.footer = new FooterComponent(page);
        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa = "signup-email"]');
        this.signupBtn = page.locator('[data-qa = "signup-button"]');
        this.loginEmail = page.locator('[data-qa = "login-email"]');
        this.loginPassword = page.locator('[data-qa = "login-password"]');
        this.loginBtn = page.locator('[data-qa = "login-button"]');
        this.errorMsg = page.locator('p[style="color: red;"]');
        this.accountCreatedHeader = page.locator('h2:has-text("Account Created!")');
        this.continueBtn = page.locator('[data-qa="continue-button"]');
        this.accountDeleteHeader = page.locator('h2:has-text("Account Deleted!")');
        this.passwordInput = page.locator('[data-qa="password"]');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.addressInput = page.locator('[data-qa="address"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipCodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountBtn = page.locator('[data-qa="create-account"]');
    }

    async registerUser(name, email) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupBtn.click();
    }

    async fillAccountDetails(password, firstName, lastName, address, state, city, zipCode, mobile) {
        await this.passwordInput.fill(password);
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.addressInput.fill(address);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipCodeInput.fill(zipCode);
        await this.mobileInput.fill(mobile);

    }

    async clickCreateAccount() {
        await this.createAccountBtn.click();
    }

    async registerFullUser(user) {
        await this.registerUser(user.name, user.email);
        await this.fillAccountDetails(
            user.password,
            user.firstName,
            user.lastName,
            user.address,
            user.state,
            user.city,
            user.zipCode,
            user.mobile,
        );

    }

    async clickContinue() {
        await this.continueBtn.click();
    }

    async loginUser(email, password) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }


}