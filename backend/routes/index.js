const express = require('express');

const Router = express.Router();

const allController = require('../controllers/userControllers');

Router.post('/register', allController.register);
Router.post('/login', allController.login);
Router.get('/profile', allController.authorization, allController.profile);
Router.get('/logout', allController.authorization, allController.logout);

module.exports = Router;
