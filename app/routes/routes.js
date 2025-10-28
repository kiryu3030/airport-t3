const express = require('express');

const htmlRoute = require('./html/html.routes.js');

const checkDBAndMQTT = require( '../middleware/check-db-mqtt.js');

const api = express.Router()
  .use(checkDBAndMQTT);

const apiRoute = express.Router().use('/api', api);

module.exports = { apiRoute, htmlRoute };
