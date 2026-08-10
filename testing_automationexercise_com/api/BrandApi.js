import { BaseApiClient } from './BaseApiClient.js';

export class BrandApi extends BaseApiClient {
  constructor(request) {
    super(request);
    this.endpoint = '/api/brandsList';
  }

  async getBrandList() {
    const { response, responseTime } = await this.get(this.endpoint);
    const body = await response.json();
    return { response, body, responseTime };
  }

  async putBrandList(data = {}) {
    const { response, responseTime } = await this.put(this.endpoint, data);
    const body = await response.json();
    return { response, body, responseTime };
  }
}
