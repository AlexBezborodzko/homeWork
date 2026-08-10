import { BaseApiClient } from './BaseApiClient.js';

export class ProductsApi extends BaseApiClient {
  constructor(request) {
    super(request);
    this.endpoint = '/api/productsList';
  }

  async getProductList() {
    const { response, responseTime } = await this.get(this.endpoint);
    const body = await response.json();
    return { response, body, responseTime };
  }

  async postProductsList(data = {}) {
    const { response, responseTime } = await this.post(this.endpoint, data);
    const body = await response.json();
    return { response, body, responseTime };
  }
}
