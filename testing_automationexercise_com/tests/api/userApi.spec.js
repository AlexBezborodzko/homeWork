import { expect } from '@playwright/test';
import { LoginAPI } from '../../api/LoginAPI.js';
import { test } from '../../fixtures/fixture.js';

test.describe('User API positive', () => {
  let loginApi;
  test.beforeEach(({ request }) => {
    loginApi = new LoginAPI(request);
  });
  test(
    'API-07: POST /createAccount — should register user account successfully',
    { tag: ['@api', '@regression', '@smoke'] },
    async ({ newUser }) => {
      const createResult = await loginApi.createAccount(newUser);
      expect(createResult.response.status()).toBe(200);
      expect(createResult.body.responseCode).toBe(201);
      expect(createResult.body.message).toBe('User created!');
    },
  );
  test(
    'API-08: DELETE /deleteAccount — should delete user account',
    { tag: ['@api', '@regression'] },
    async ({ newUser }) => {
      const createResult = await loginApi.createAccount(newUser);
      expect(createResult.body.message).toBe('User created!');
      const deleteResult = await loginApi.deleteAccount(newUser.email, newUser.password);
      expect(deleteResult.body.responseCode).toBe(200);
      expect(deleteResult.body.message).toBe('Account deleted!');
    },
  );
  test(
    'API-09: PUT /updateAccount — should update user account',
    { tag: ['@api', '@regression'] },
    async ({ newUser }) => {
      const createResult = await loginApi.createAccount(newUser);
      expect(createResult.body.responseCode).toBe(201);
      const updatedData = {
        email: newUser.email,
        password: newUser.password,
        name: 'UpdatedName',
        birth_date: '14',
        birth_month: 'December',
        birth_year: '1983',
        first_name: 'Alex',
        last_name: 'Smith',
        company: 'NewCompany',
        address1: '456 New Street',
        address2: 'Apt 7B',
        country: 'Canada',
        state: 'Ontario',
        city: 'Toronto',
        zipcode: 'M5V 2L6',
        mobile_number: '9876543210',
      };
      const updateResult = await loginApi.updateAccount(updatedData);
      expect(updateResult.body.responseCode).toBe(200);
      expect(updateResult.body.message).toBe('User updated!');
    },
  );
  test(
    'API-10: POST /login with valid credentials — should return success',
    { tag: ['@api', '@regression'] },
    async ({ newUser }) => {
      const createResult = await loginApi.createAccount(newUser);
      expect(createResult.response.status()).toBe(200);
      expect(createResult.body.responseCode).toBe(201);
      expect(createResult.body.message).toBe('User created!');
      const loginResult = await loginApi.verifyLogin(newUser.email, newUser.password);
      expect(loginResult.response.status()).toBe(200);
      expect(loginResult.body.responseCode).toBe(200);
      expect(loginResult.body.message).toBe('User exists!');
    },
  );
  test(
    'API-11: GET /userDetails by email — should return user details',
    { tag: ['@api', '@regression'] },
    async ({ newUser }) => {
      const createResult = await loginApi.createAccount(newUser);
      expect(createResult.body.responseCode).toBe(201);
      const detailsResult = await loginApi.getDetailByEmail(newUser.email);
      expect(detailsResult.body.responseCode).toBe(200);
      const user = detailsResult.body.user;
      expect(user.email).toBe(newUser.email);
      expect(user.name).toBe(newUser.name);
    },
  );
});
test.describe('User API negative', () => {
  let loginApi;
  test.beforeEach(({ request }) => {
    loginApi = new LoginAPI(request);
  });
  test(
    'API-12: POST /login without email — should return error',
    { tag: ['@api', '@regression'] },
    async () => {
      const loginResult = await loginApi.verifyLoginOnlyPassword('somePassword');
      expect(loginResult.body.responseCode).toBe(400);
      expect(loginResult.body.message).toBe(
        'Bad request, email or password parameter is missing in POST request.',
      );
    },
  );
  test(
    'API-14: DELETE /login — should return 405 Method Not Allowed',
    { tag: ['@api', '@regression'] },
    async () => {
      const loginResult = await loginApi.deleteVerifyLogin();
      expect(loginResult.body.responseCode).toBe(405);
      expect(loginResult.body.message).toContain('This request method is not supported.');
    },
  );
  test(
    'API-13: POST /login with invalid credentials — should return error',
    { tag: ['@api', '@regression'] },
    async () => {
      const invalidEmail = `${Date.now()}@example.com`;
      const invalidPassword = `${Date.now()}`;
      const loginResult = await loginApi.verifyLogin(invalidEmail, invalidPassword);
      expect(loginResult.body.responseCode).toBe(404);
      expect(loginResult.body.message).toContain('User not found!');
    },
  );
});
