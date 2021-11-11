const express = require('express');
const router = express.Router();

const { loginControllers } = require('../controllers/controllers.auth.login');

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/', loginControllers);

module.exports = router;