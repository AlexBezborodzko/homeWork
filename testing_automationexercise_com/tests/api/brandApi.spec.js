import { BrandApi } from '../../api/BrandApi.js';
import { expect, test } from '@playwright/test';
import { validateBrands } from '../../shemas/brandShema.js';

test.describe('Positive API: /brandsList', () => {
  let brandApi;
  test.beforeEach(({ request }) => {
    brandApi = new BrandApi(request);
  });
  test(
    'API-03: GET /brandsList — should return 200 status and list of brands',
    { tag: ['@api', '@regression'] },
    async () => {
      const { response, body } = await brandApi.getBrandList();
      expect(response.status()).toBe(200);
      expect(body).toHaveProperty('responseCode');
      expect(body.responseCode).toBe(200);
      expect(body).toHaveProperty('brands');
      expect(body.brands.length).toBeGreaterThan(0);
      validateBrands(body.brands);
    }
  );
});
test.describe('Negative API: /brandsList', () => {
  let brandApi;
  test.beforeEach(({ request }) => {
    brandApi = new BrandApi(request);
  });
  test(
    'API-04: PUT /brandsList — should return 405 Method Not Allowed',
    { tag: ['@api', '@regression'] },
    async () => {
      const { response, body } = await brandApi.putBrandList();
      expect(response.status()).toBe(200);
      expect(body).toHaveProperty('responseCode');
      expect(body.responseCode).toBe(405);
      expect(body).toHaveProperty('message');
      expect(body.message).toContain('This request method is not supported.');
    }
  );
});
