const express = require('express');
const ctrl = require('./app/businesses.controllers');
const { asyncHandler } = require('./utils/http');

module.exports = (validateAccessToken) => {
  const router = express.Router();

  // Businesses
  router.get('/businesses', validateAccessToken, asyncHandler(ctrl.listBusinesses));
  router.get('/businesses/:id', validateAccessToken, asyncHandler(ctrl.getBusiness));
  router.post('/businesses', validateAccessToken, asyncHandler(ctrl.createBusiness));

  // Services
  router.get('/businessServices/:id', validateAccessToken, asyncHandler(ctrl.listBusinessServices));
  router.get('/services', validateAccessToken, asyncHandler(ctrl.listServices));
  router.get('/services/:id', asyncHandler(ctrl.getService));
  router.post('/services', validateAccessToken, asyncHandler(ctrl.createService));

  // Schedules
  router.post('/schedules', validateAccessToken, asyncHandler(ctrl.createSchedule));

  // Search
  router.post('/search', asyncHandler(ctrl.searchNearbyServices));

  // Dev
  router.get('/reset', validateAccessToken, asyncHandler(ctrl.resetDatabase));

  return router;
};
