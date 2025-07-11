import request from 'supertest';
import app from '../src/app.js';
import { pool } from '../src/db.js';

describe('Health Check', () => {
  it('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  afterAll(async () => {
    await pool.end();  
  });
});
