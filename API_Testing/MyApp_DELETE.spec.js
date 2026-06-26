import { test, expect } from '@playwright/test';

test('DELETE users API', async ({ request }) => {
  const response = await request.delete('http://127.0.0.1:5000/users', {
            headers: {
      'X-API-Key': 'secret123'
    }, 
    data: {
      username: 'john123',
      name: 'John Doe'
    }
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  console.log('STATUS:', response.status());
  console.log('HEADERS:', response.headers());

  const body = await response.json();
  console.log('RESPONSE:', JSON.stringify(body, null, 2));

  // optional assertion
  // expect(body).toHaveProperty('id');
});