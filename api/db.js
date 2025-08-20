const queries = require('./sql-queries.cjs');
const { Pool } = require('pg');
const { env, pgSsl } = require('./config');

const pool = new Pool({
  user: env.POSTGRESQL_USER,
  host: env.POSTGRESQL_HOST,
  database: env.POSTGRESQL_DB,
  password: env.POSTGRESQL_PASSWORD,
  port: Number(env.POSTGRESQL_PORT),
  ssl: pgSsl,
});


async function query(text, params) {
  return pool.query(text, params);
}

// Use client for multiple transactions
async function withClient(fn) {
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}

// Reset the database for development
async function resetDatabase() {
  await withClient(async (client) => {
    await client.query('BEGIN');
    if (queries.drop) await client.query(queries.drop);
    if (queries.createDatabase) await client.query(queries.createDatabase);
    if (queries.insertSampleData) await client.query(queries.insertSampleData);
    await client.query('COMMIT');
  });
}

async function closePool() {
  await pool.end();
}

module.exports = { pool, query, withClient, closePool, resetDatabase };