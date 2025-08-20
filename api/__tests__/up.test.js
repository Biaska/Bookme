const request = require('supertest');
const app = require('../index');

describe('up', () => {
  it('returns api name', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("\"Bookme API\"");
  });
});