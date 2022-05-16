const express = require('express');
const route = express.Router();
const userController = require('../controllers/user');

route.get('/sign-up', userController.getSignUp)
route.post('/sign-up', userController.postSignUp)
route.get('/login', userController.getLogin)
route.post('/login', userController.postLogin)
module.exports = route