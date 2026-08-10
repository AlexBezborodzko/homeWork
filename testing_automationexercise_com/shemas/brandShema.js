import { createValidator } from '../helpers/helpers.js';

export const brandSchema = {
  type: 'object',
  required: ['id', 'brand'],
  properties: {
    id: { type: 'number' },
    brand: { type: 'string' },
  },
  additionalProperties: true,
};

export const { validateSingle: validateSingleBrand, validateArray: validateBrands } =
  createValidator(brandSchema, 'Brand');
