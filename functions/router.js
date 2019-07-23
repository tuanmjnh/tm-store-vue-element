const express = require('express');
var router = express.Router();

// Controllers
const users = require('./controllers/users');

// Routers
// --users
router.route('/user').post(users.getUser);

module.exports = router;