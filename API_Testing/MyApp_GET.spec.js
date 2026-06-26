import { test, expect } from '@playwright/test';

test('GET users API', async ({ request }) => {
  const response = await request.get('http://127.0.0.1:5000/users', {
          headers: {
      'X-API-Key': 'secret123'
    } 
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  console.log('STATUS:', response.status());

  const body = await response.json();

  console.log('RESPONSE:', JSON.stringify(body, null, 2));

  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  expect(body[0]).toHaveProperty('username');
  expect(body[0]).toHaveProperty('name');
});