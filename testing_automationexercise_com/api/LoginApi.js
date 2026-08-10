import { BaseApiClient } from './BaseApiClient.js';

export class LoginAPI extends BaseApiClient {
  constructor(request) {
    super(request);
    this.verifyLoginEndpoint = '/api/verifyLogin';
    this.createAccountEndpoint = '/api/createAccount';
    this.deleteAccountEndpoint = '/api/deleteAccount';
    this.updateAccountEndpoint = '/api/updateAccount';
    this.getDetailByEmailEndpoint = '/api/getUserDetailByEmail';
  }

  async verifyLogin(email, password) {
    const { response, responseTime } = await this.post(this.verifyLoginEndpoint, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      form: { email, password },
    });
    const body = await response.json();
    return { response, body, responseTime };
  }

  async verifyLoginOnlyPassword(password) {
    const { response, responseTime } = await this.post(this.verifyLoginEndpoint, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      form: { password },
    });
    const body = await response.json();
    return { response, body, responseTime };
  }

  async deleteVerifyLogin() {
    const { response, responseTime } = await this.delete(this.verifyLoginEndpoint);
    const body = await response.json();
    return { response, body, responseTime };
  }

  async createAccount(userDate) {
    const apiData = { ...userDate };
    if (apiData.first_name) {
      apiData.firstname = apiData.first_name;
      delete apiData.first_name;
    }
    if (apiData.last_name) {
      apiData.lastname = apiData.last_name;
      delete apiData.last_name;
    }
    const { response, responseTime } = await this.post(this.createAccountEndpoint, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      form: apiData,
    });
    const body = await response.json();
    return { response, body, responseTime };
  }

  async deleteAccount(email, password) {
    const { response, responseTime } = await this.delete(this.deleteAccountEndpoint, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      form: { email, password },
    });
    const body = await response.json();
    return { response, body, responseTime };
  }

  async getDetailByEmail(email) {
    const { response, responseTime } = await this.get(this.getDetailByEmailEndpoint, {
      params: { email },
    });
    const body = await response.json();
    return { response, body, responseTime };
  }

  async updateAccount(userData) {
    const apiData = { ...userData };
    if (apiData.first_name) {
      apiData.firstname = apiData.first_name;
      delete apiData.first_name;
    }
    if (apiData.last_name) {
      apiData.lastname = apiData.last_name;
      delete apiData.last_name;
    }
    const { response, responseTime } = await this.put(this.updateAccountEndpoint, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      form: apiData,
    });
    const body = await response.json();
    return { response, body, responseTime };
  }
}
