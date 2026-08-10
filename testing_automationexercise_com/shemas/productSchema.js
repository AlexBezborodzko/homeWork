import { createValidator } from '../helpers/helpers.js';

export const productSchema = {
  type: 'object',
  required: ['id', 'name', 'price', 'brand', 'category'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    price: {
      type: 'string',
      pattern: '^(Rs\\.\\s*\\d+|\\d+)$',
    },
    brand: { type: 'string' },
    category: { type: 'object' },
  },
  additionalProperties: true,
};

export const { validateSingle: validateSingleProduct, validateArray: validateProducts } =
  createValidator(productSchema, 'Product');
