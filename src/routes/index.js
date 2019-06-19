const express = require('express');
const { healthController, apiController } = require('../controllers');

module.exports = function(app) {
  const router = express.Router();

  app.get('/status', healthController);
  app.use('/api', apiController);

  return router;
};
