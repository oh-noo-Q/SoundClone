const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const { logoutControllers } = require('../controllers/controllers.auth.logout');

// @route DELETE api/auth/logout
// @desc Logout user
// @access Private
router.delete('/', verifyToken, logoutControllers);

module.exports = router;