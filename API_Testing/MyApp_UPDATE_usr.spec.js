test('User cannot update another user', async ({ request }) => {

  const update = await request.put(
    'http://127.0.0.1:5000/users/2',
    {
      headers: {
        'X-API-Key': 'secret123',
        'X-Username': 'omar456'
      },
      data: {
        username: 'user2',
        name: 'Hacked'
      }
    }
  );

  expect(update.status()).toBe(403);
});