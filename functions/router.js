const express = require('express');
var router = express.Router();

// Controllers
const users = require('./controllers/users');

// Routers
// --users
router.route('/user')
.get(users.get)
.post(users.post)
.put(users.put)
.delete(users.delete);

module.exports = router;