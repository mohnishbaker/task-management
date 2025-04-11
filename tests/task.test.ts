// tests/task.test.ts
import request from 'supertest';
import app from '../src/app';

describe('Tasks', () => {
  let token = '';

  beforeAll(async () => {
    const res = await request(app).post('/api/users/register').send({
      name: 'Tester',
      email: 'test2@example.com',
      password: 'testpass'
    });
    token = res.body.token;
  });

  it('creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task 1' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Task 1');
  });
});
