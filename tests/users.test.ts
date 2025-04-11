import request from 'supertest';
import app from '../src/app';

describe('User API', () => {
  it('registers a user', async () => {
    const res = await request(app).post('/api/users/register').send({
      name: 'Test',
      email: 'test@example.com',
      password: 'pass123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
