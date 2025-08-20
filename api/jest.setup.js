const db = require('./db');

beforeAll(async () => {
  await db.resetDatabase();
});

// ensure clean for each test
afterEach(async () => {
  await db.resetDatabase();
});

// close db pool
afterAll(() => db.closePool());