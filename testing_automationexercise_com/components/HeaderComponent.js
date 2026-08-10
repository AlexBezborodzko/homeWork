export class HeaderComponent {
  constructor(page) {
    this.page = page;
    this.loggedInUser = page.getByText(/Logged in as.*/);
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async goToLogout() {
    await this.logoutLink.click();
  }

  async goToDeleteAccount() {
    await this.deleteAccountLink.click();
  }

  async goToProducts() {
    await this.productsLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goToContactUs() {
    await this.contactUsLink.click();
  }
}
