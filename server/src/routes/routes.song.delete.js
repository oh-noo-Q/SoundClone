const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const { deleteControllers } = require('../controllers/controllers.song.delete');

// @route DELETE api/song/delete
// @desc Delete a song
// @access Private
router.delete('/:id', verifyToken, deleteControllers);

module.exports = router;