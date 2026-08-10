import { expect, test } from '@playwright/test';
import { ProductsApi } from '../../api/ProductsApi.js';
import { validateProducts } from '../../shemas/productSchema.js';

test.describe('API: /productsList', () => {
  let productsApi;

  test.beforeEach(({ request }) => {
    productsApi = new ProductsApi(request);
  });

  test(
    'API-01: GET /productsList — should return 200 status and list of products',
    { tag: ['@api', '@regression'] },
    async () => {
      const { response, body, responseTime } = await productsApi.getProductList();
      expect(response.status()).toBe(200);
      expect(productsApi.assertResponseTime(responseTime)).toBe(true);
      expect(body).toHaveProperty('products');
      expect(Array.isArray(body.products)).toBe(true);
      expect(body.products.length).toBeGreaterThan(0);
      validateProducts(body.products);
    },
  );

  test(
    'API-02: POST /productsList — should return 405 Method Not Allowed',
    { tag: ['@api', '@regression'] },
    async () => {
      const { response, body } = await productsApi.postProductsList();
      expect(response.status()).toBe(200);
      expect(body).toHaveProperty('responseCode');
      expect(body.responseCode).toBe(405);
      expect(body.message).toContain('This request method is not supported');
    },
  );
});
