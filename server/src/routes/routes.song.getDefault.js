const express = require('express');
const router = express.Router();

const { getDefaultControllers } = require('../controllers/controllers.song.getDefault');

// @route GET /api/song/getDefault
// @desc Get default songs of admin
// @access Public
router.get('/', getDefaultControllers);

module.exports = router;