//Valid Authentication
import { test, expect } from '@playwright/test';

test('Valid API key should allow access', async ({ request }) => {
  const response = await request.get('http://127.0.0.1:5000/users', {
    headers: {
      'X-API-Key': 'secret123'
    }
  });

  expect(response.status()).toBe(200);
  console.log('STATUS:', response.status());
});