export class BaseApiClient {
  constructor(request) {
    this.request = request;
  }

  async get(endpoint, params = {}) {
    const startTime = Date.now();
    const response = await this.request.get(endpoint, params);
    const responseTime = Date.now() - startTime;
    return { response, responseTime };
  }

  async post(endpoint, params = {}) {
    const startTime = Date.now();
    const response = await this.request.post(endpoint, params);
    const responseTime = Date.now() - startTime;
    return { response, responseTime };
  }

  async put(endpoint, params = {}) {
    const startTime = Date.now();
    const response = await this.request.put(endpoint, params);
    const responseTime = Date.now() - startTime;
    return { response, responseTime };
  }

  async delete(endpoint, options = {}) {
    const startTime = Date.now();
    const response = await this.request.delete(endpoint, options);
    const responseTime = Date.now() - startTime;
    return { response, responseTime };
  }

  assertResponseTime(responseTime, limit = 3000) {
    if (responseTime > limit) {
      throw new Error(`Response time ${responseTime}ms exceeds limit ${limit}ms`);
    }
    return true;
  }
}
