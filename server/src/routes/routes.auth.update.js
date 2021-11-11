const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const { updateFullnameControllers, updatePasswordControllers } = require('../controllers/controllers.auth.update');

// @route PUT api/auth/update/fullname
// @desc Update user's fullname
// @access Private
router.put('/fullname', verifyToken, updateFullnameControllers);

// @route PUT api/auth/update/password
// @desc Update user's password
// @access Private
router.put('/password', verifyToken, updatePasswordControllers);

module.exports = router;