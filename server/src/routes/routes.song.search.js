const express = require('express');
const router = express.Router();

const { searchControllers } = require('../controllers/controllers.song.search');

// @route POST /api/song/search
// @desc Search songs
// @access Public
router.post('/', searchControllers);

module.exports = router;