const { Pool } = require('pg');
const { env } = require('../config');

const pool = new Pool({
  host: env.POSTGRESQL_HOST,
  port: Number(env.POSTGRESQL_PORT),
  user: env.POSTGRESQL_USER,
  password: env.POSTGRESQL_PASSWORD,
  database: env.POSTGRESQL_DB,
  ssl: false
});

async function resetDb() {
  await pool.query('BEGIN');

  await pool.query(`
    TRUNCATE TABLE "Bookings", "Sessions", "Schedules", "Services", "Businesses"
    RESTART IDENTITY CASCADE;
  `);

  const biz = await pool.query(`
    INSERT INTO "Businesses"(name, email, phone_number, street_address, city, state, postal_code, country, website, timezone, latitude, longitude)
    VALUES ('Test Biz','t@b.com','123-456-7890','1 Main St','Seattle','Washington','98039','United States','example.com','UTC', 47.6062, -122.3321)
    RETURNING id;
  `);

  const bizId = biz.rows[0].id;

  await pool.query(`
    INSERT INTO "Services"( "businessId", "name", "description", "price", "type", "duration")
    VALUES ($1,'Cut','Basic cut',25,'Service',30);
  `, [bizId]);

  await pool.query('COMMIT');
}

async function closeDb() {
  await pool.end();
}

module.exports = { pool, resetDb, closeDb };
