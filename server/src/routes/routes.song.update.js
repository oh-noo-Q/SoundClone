const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const { updateControllers } = require('../controllers/controllers.songs.update');

// @route PUT api/song/update
// @desc Update a song
// @access Private
router.put('/:id', verifyToken, updateControllers);

module.exports = router;