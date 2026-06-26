import { test, expect } from '@playwright/test';

test('Duplicate username', async ({ request }) => {
  await request.post('http://127.0.0.1:5000/users', {
    headers: {
      'X-API-Key': 'secret123'
    },
    data: {
      username: 'omar123',
      name: 'Omar Doe'
    }
  });

  const response = await request.post('http://127.0.0.1:5000/users', {
    data: {
      username: 'omar123',
      name: 'Another Omar'
    }
  });

  expect(response.status()).toBe(401);
});
