const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const { authControllers } = require('../controllers/controllers.auth');

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, authControllers);

module.exports = router;