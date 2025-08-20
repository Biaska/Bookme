const request = require('supertest');
const app = require('../index');

jest.mock('../utils/geocode', () => (
  jest.fn(async (zip) => {
    // Return fixed coords of Seattle for any zip in tests
    return { latitude: 47.6062, longitude: -122.3321 };
  })
));

describe('POST /search', () => {
  it('returns nearby services in Seattle', async () => {
    const res = await request(app)
      .post('/search')
      .send({ zipCode: '98039', radius: 25, keyword: '' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(s => s.name === 'Galactic Aromatherapy')).toBe(true);
  });
});

describe('POST /search', () => {
  it('returns no services', async () => {
    const res = await request(app)
      .post('/search')
      .send({ zipCode: '20001', radius: 1, keyword: '' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
