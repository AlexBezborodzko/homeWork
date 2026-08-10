import { BasePage } from './BasePage';
import { FooterComponent } from '../components/FooterComponent';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.footer = new FooterComponent(page);
    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupBtn = page.locator('[data-qa="signup-button"]');
    this.loginEmail = page.locator('[data-qa="login-email"]');
    this.loginPassword = page.locator('[data-qa="login-password"]');
    this.loginBtn = page.locator('[data-qa="login-button"]');
    this.errorMsg = page.locator('p[style="color: red;"]');
    this.accountCreatedHeader = page.locator('h2:has-text("Account Created!")');
    this.continueBtn = page.locator('[data-qa="continue-button"]');
    this.accountDeleteHeader = page.locator('h2:has-text("Account Deleted!")');
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daysSelect = page.locator('[data-qa="days"]');
    this.monthsSelect = page.locator('[data-qa="months"]');
    this.yearsSelect = page.locator('[data-qa="years"]');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
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

  async fillAccountDetails(user) {
    if (user.title === 'Mr') {
      await this.titleMr.check();
    } else if (user.title === 'Mrs' || user.title === 'Miss') {
      await this.titleMrs.check();
    }
    await this.passwordInput.fill(user.password);
    if (user.birth_date) {await this.daysSelect.selectOption(user.birth_date);}
    if (user.birth_month) {await this.monthsSelect.selectOption(user.birth_month);}
    if (user.birth_year) {await this.yearsSelect.selectOption(user.birth_year);}
    await this.firstNameInput.fill(user.firstName || user.first_name);
    await this.lastNameInput.fill(user.lastName || user.last_name);
    if (user.company) {await this.companyInput.fill(user.company);}
    await this.addressInput.fill(user.address || user.address1);
    if (user.address2) {await this.address2Input.fill(user.address2);}
    if (user.country) {await this.countrySelect.selectOption(user.country);}
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipCodeInput.fill(user.zipCode || user.zipcode);
    await this.mobileInput.fill(user.mobile || user.mobile_number);
  }

  async registerFullUser(user) {
    await this.registerUser(user.name, user.email);
    await this.fillAccountDetails(user);
    await this.createAccountBtn.click();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async loginUser(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginBtn.click();
  }
}
