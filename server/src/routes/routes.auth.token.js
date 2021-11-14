const express = require('express');
const router = express.Router();
// const verifyToken = require('../middleware/auth');

const { tokenControllers } = require('../controllers/controllers.auth.token');

// @route POST api/auth/token
// @desc get new AccessToken when the old expired
// @access Private
router.post('/', tokenControllers);

module.exports = router;