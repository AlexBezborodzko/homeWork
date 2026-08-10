import { test as base } from '@playwright/test';
import { generateUser } from '../test-data/testData';

export const test = base.extend({
  // eslint-disable-next-line no-empty-pattern
  newUser: async ({}, use) => {
    const user = await generateUser();
    await use(user);
  },
});
