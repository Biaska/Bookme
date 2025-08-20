const services = require('./businesses.service');
const { AppError } = require('../utils/http');

// GET /businesses
async function listBusinesses(req, res) {
  const rows = await services.getAllBusinesses();
  return res.status(200).json(rows);
}

// GET /businesses/:id
async function getBusiness(req, res) {
  const row = await services.getBusinessById(req.params.id);
  if (!row) throw new AppError(404, 'Business not found');
  return res.status(200).json(row);
}

// POST /businesses
async function createBusiness(req, res) {
  await services.createBusiness(req.body);
  return res.status(201).json({ message: 'Business created' });
}

// GET /businessServices/:id
async function listBusinessServices(req, res) {
  const rows = await services.getServicesForBusiness(req.params.id);
  if (!rows.length) throw new AppError(404, 'No services for this business');
  return res.status(200).json(rows);
}

// GET /services
async function listServices(_req, res) {
  const rows = await services.getAllServices();
  return res.status(200).json(rows);
}

// GET /services/:id
async function getService(req, res) {
  const row = await services.getServiceById(req.params.id);
  if (!row) throw new AppError(404, 'Service not found');
  return res.status(200).json(row);
}

// POST /services
async function createService(req, res) {
  await services.createService(req.body);
  return res.status(201).json({ message: 'Service created' });
}

// POST /schedules
async function createSchedule(req, res) {
  const result = await services.createSchedule(req.body);
  return res.status(200).json(result);
}

// POST /search
async function searchNearbyServices(req, res) {
  const { zipCode, radius, keyword } = req.body || {};
  if (!zipCode) throw new AppError(400, 'Zip code is required');
  const list = await services.searchNearbyServices(zipCode, radius, keyword);
  return res.status(200).json(list);
}

// GET /reset (for development)
async function resetDatabase(_req, res) {
  await services.resetDatabase();
  return res.status(200).json({ message: 'Database Reset' });
}

module.exports = {
  listBusinesses,
  getBusiness,
  createBusiness,
  listBusinessServices,
  listServices,
  getService,
  createService,
  createSchedule,
  searchNearbyServices,
  resetDatabase,
};
