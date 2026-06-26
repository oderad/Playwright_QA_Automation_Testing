//Invalid Authentication
import { test, expect } from '@playwright/test';

test('Invalid API key should return 401', async ({ request }) => {
  const response = await request.get('http://127.0.0.1:5000/users', {
    headers: {
      'X-API-Key': 'wrong-key'
    }
  });

  expect(response.status()).toBe(401);

  const body = await response.json();
  expect(body.error).toBe('Unauthorized');
  console.log('STATUS:', response.status());
});