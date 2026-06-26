import { test, expect } from '@playwright/test';

test('POST users API', async ({ request }) => {

  const postresponse = await request.post('http://127.0.0.1:5000/users', {
    headers: {
      'X-API-Key': 'secret123'
    },
    data: {
      username: 'omar456',
      name: 'Omar Doe',
      role: 'user'
    }
  });

  console.log('STATUS:', postresponse.status());
  console.log('BODY:', await postresponse.text());

  expect(postresponse.status()).toBe(201);

  const body = await postresponse.json();

  expect(body.username).toBe('omar456');
  expect(body.name).toBe('Omar Doe');
});