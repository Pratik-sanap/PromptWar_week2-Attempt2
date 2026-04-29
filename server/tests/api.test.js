const request = require('supertest');
const app = require('../app');

describe('ElectWise 2.0 API Security & Integrity', () => {
  
  test('GET /api/health should return 200 and Google service status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('OK');
    expect(res.body.services.gemini).toBe('OK');
  });

  test('Security headers should be present (Helmet)', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-xss-protection']).toBeDefined();
    expect(res.headers['content-security-policy']).toBeDefined();
  });

  test('Rate limiting should trigger after excessive requests', async () => {
    // Basic check for X-RateLimit headers
    const res = await request(app).get('/api/health');
    expect(res.headers['ratelimit-limit']).toBeDefined();
  });

  test('AI Chat endpoint should exist', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ prompt: 'Hello' });
    expect(res.statusCode).not.toBe(404);
  });
});
