const express = require('express');
const router = express.Router();

const { registerControllers } = require('../controllers/controllers.auth.register');

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/', registerControllers);

module.exports = router;