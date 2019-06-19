const express = require('express');
const healthController = require('./health');
const apiController = require('./api');

module.exports = { healthController, apiController };
