const express = require('express');
const route = express.Router();
const urlController = require('../controllers/urls');

route.get('/', urlController.getMainPage)
route.post('/shortUrl', urlController.shrinkUrl)
route.get('/:shortUrl', urlController.redirectToUrl)

module.exports = route;