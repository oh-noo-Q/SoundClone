const express = require('express');
const router = express.Router();

const { searchControllers } = require('../controllers/controllers.song.search');

// @route GET /api/song/search
// @desc Search songs
// @access Public
router.get('/', searchControllers);

module.exports = router;