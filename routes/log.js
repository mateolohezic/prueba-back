const express = require('express');
const route = express.Router();
const { getLogs } = require('../controllers/log');
const { verifyAdminTokenDirect, verifyUserTokenDirect, verifyAdminToken, verifyUserToken } = require('../middleware/jwt')

route.post('/get-logs', verifyUserToken, getLogs)

module.exports = route;