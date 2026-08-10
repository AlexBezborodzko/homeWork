import { expect, test } from '@playwright/test';
import { SearchApi } from '../../api/SearchApi.js';

test.describe('API: /searchProduct', () => {
  let searchApi;

  test.beforeEach(({ request }) => {
    searchApi = new SearchApi(request);
  });

  test(
    'API-05: POST /searchProduct with valid parameter — should return 200 and results',
    { tag: ['@api', '@regression', '@smoke'] },
    async () => {
      const keyword = 'tshirt';
      const { response, body, responseTime } = await searchApi.searchProduct(keyword);
      expect(response.status()).toBe(200);
      expect(responseTime).toBeLessThan(3000);
      expect(body.responseCode).toBe(200);
      expect(body).toHaveProperty('products');
      expect(Array.isArray(body.products)).toBe(true);
      if (body.products.length > 0) {
        body.products.forEach((product) => {
          const normalizedName = SearchApi.normalize(product.name);
          expect(normalizedName).toContain(SearchApi.normalize(keyword));
        });
      }
    },
  );

  test(
    'API-06: POST /searchProduct without parameter — should return 400 Bad Request',
    { tag: ['@api', '@regression'] },
    async () => {
      const { response, body } = await searchApi.searchProductWithoutParam();
      expect(response.status()).toBe(200);
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('responseCode');
      expect(body.responseCode).toBe(400);
      expect(body.message).toContain('search_product parameter is missing');
    },
  );
});
