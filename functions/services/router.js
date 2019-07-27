const express = require('express');
var router = express.Router();

// Controllers
const users = require('../controllers/users');

// Routers
// --users
router.route('/users')
.get(users.get)
.post(users.post)
.put(users.put)
.delete(users.delete);
router.route('/users/collection').get(users.getCollectionUser);

module.exports = router;