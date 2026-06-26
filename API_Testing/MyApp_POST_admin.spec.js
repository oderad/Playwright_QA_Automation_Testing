import { test, expect } from '@playwright/test';

test('Create admin user', async ({ request }) => {
  const response = await request.post('http://127.0.0.1:5000/users', {
    headers: {
      'X-API-Key': 'secret123'
    },
    data: {
      username: 'admin',
      name: 'Administrator',
      role: 'admin'
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.role).toBe('admin');
});