const db = require('../db/db');
const queries = require('../db/sql-queries.cjs');

// ---- Businesses
async function getAllBusinesses() {
  const { rows } = await db.query(queries.businesses.select.all);
  return rows;
}

async function getBusinessById(id) {
  const q = await db.query(queries.businesses.select.one, [id]);
  return q.rows[0];
}

async function createBusiness(paramsArray) {
  await db.query(queries.businesses.insert.one, paramsArray);
}

async function searchBusinessesWithinRadius(userLat, userLon, radiusMeters) {
  const { rows } = await db.query(queries.search, [userLat, userLon, radiusMeters]);
  console.log('within radius:', rows);
  return rows;
}

// ---- Services
async function getServicesByBusinessId(businessId) {
  const q = await db.query(queries.services.select.business, [businessId]);
  return q.rows;
}

async function getAllServices() {
  const { rows } = await db.query(queries.services.select.all);
  return rows;
}

async function getServiceById(id) {
  const q = await db.query(queries.services.select.one, [id]);
  return q.rows[0];
}

async function createService(paramsArray) {
  await db.query(queries.services.insert.one, paramsArray);
}

// Fetch services for many businesses with optional keyword filtering
async function getServicesByBusinessIds(businessIds, keyword) {
  const { rows } = await db.query(queries.services.select.byKeyword, [businessIds, keyword || null]);
  return rows;
}

module.exports = {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  searchBusinessesWithinRadius,
  getServicesByBusinessId,
  getAllServices,
  getServiceById,
  createService,
  getServicesByBusinessIds,
};
