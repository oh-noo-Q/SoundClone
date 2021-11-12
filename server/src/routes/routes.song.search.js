const express = require('express');
const route = express.Router();

const { searchControllers } = require('../controllers/controllers.song.search');

// @route GET /api/song/search
// @desc Search songs
// @access Public
route.get('/', searchControllers);

module.exports = route;