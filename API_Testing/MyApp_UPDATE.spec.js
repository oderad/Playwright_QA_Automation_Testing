import { test, expect } from '@playwright/test';

test('Update User API', async ({ request }) => {

  const username = 'omar123';

  // STEP 1: try to update first (no need to create every time)
  const updateResponse = await request.put(
    `http://127.0.0.1:5000/users/1`,
    {
      headers: {
      'X-API-Key': 'secret123'
    },
      data: {
        username: 'omar456',
        name: 'Omar Smith'
      }
    }
  );

  console.log('UPDATE STATUS:', updateResponse.status());
  console.log('UPDATE BODY:', await updateResponse.text());

  expect(updateResponse.ok()).toBeTruthy();
});