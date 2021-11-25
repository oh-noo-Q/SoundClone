const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const { getUserSongsController } = require('../controllers/controllers.song.getUserSongs');

// @route GET /api/song/getUserSongs
// @desc Get songs of user
// @access Private
router.get('/', verifyToken, getUserSongsController);

module.exports = router;