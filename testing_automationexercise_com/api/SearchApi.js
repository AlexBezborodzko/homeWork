import { BaseApiClient } from './BaseApiClient.js';

export class SearchApi extends BaseApiClient {
  constructor(request) {
    super(request);
    this.endpoint = '/api/searchProduct';
  }

  async searchProduct(keyword) {
    const { response, responseTime } = await this.post(this.endpoint, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      form: { search_product: keyword },
    });

    const body = await response.json();
    return { response, body, responseTime };
  }

  async searchProductWithoutParam() {
    const { response, responseTime } = await this.post(this.endpoint, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      form: {},
    });
    const body = await response.json();
    return { response, body, responseTime };
  }

  static normalize(text) {
    return text.toLowerCase().replace(/[^a-z]/g, '');
  }
}
