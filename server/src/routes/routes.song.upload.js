const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const { uploadControllers } = require('../controllers/controllers.song.upload')

// @route POST api/upload
// @desc Upload a song
// @access Private
router.post('/', verifyToken, uploadControllers);

module.exports = router;