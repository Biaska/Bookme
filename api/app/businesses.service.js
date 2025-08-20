const model = require('./businesses.model');
const geocodeAddress = require('../utils/geocode');

const RADIUS_M_PER_MILE = 1609.344;

async function getAllBusinesses() {
  const rows = await model.getAllBusinesses();
  return rows;
}

async function getBusinessById(id) {
  const row = await model.getBusinessById(id);
  return row || null;
}

async function createBusiness(body) {
  const params = Object.entries(body).map(([, v]) => v);
  await model.createBusiness(params);
}

async function getServicesForBusiness(businessId) {
  return model.getServicesByBusinessId(businessId);
}

async function getAllServices() {
  return model.getAllServices();
}

async function getServiceById(id) {
  return model.getServiceById(id);
}

async function createService(body) {
  const params = Object.entries(body).map(([, v]) => v);
  await model.createService(params);
}

// Indexed radius search using earthdistance+cube
async function getBusinessesWithinRadius(userLat, userLon, radiusMiles) {
  const radiusMeters = Number(radiusMiles) * RADIUS_M_PER_MILE;
  return model.searchBusinessesWithinRadius(userLat, userLon, radiusMeters);
}

async function searchNearbyServices(zipCode, radiusMiles, keyword) {
  const { latitude, longitude } = await geocodeAddress(zipCode);
  const businesses = await getBusinessesWithinRadius(latitude, longitude, radiusMiles);

  const businessIds = businesses.map((b) => b.id);
  if (businessIds.length === 0) return [];

  const services = await model.getServicesByBusinessIds(businessIds, keyword);
  return services
}

module.exports = {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  getServicesForBusiness,
  getAllServices,
  getServiceById,
  createService,
  getBusinessesWithinRadius,
  searchNearbyServices,
};
