import { test, expect } from '@playwright/test';

test('POST user without username should fail', async ({ request }) => {
const postresponse = await request.post('http://127.0.0.1:5000/users', {
headers: {
'X-API-Key': 'secret123'
},
data: {
name: 'Omar Doe'
}
});

console.log('STATUS:', postresponse.status());

expect(postresponse.status()).toBe(400);
});
