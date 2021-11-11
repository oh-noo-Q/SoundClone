const express = require('express');
const router = express.Router();

const { uploadControllers } = require('../controllers/controllers.upload')

// @route POST api/upload
// @desc Upload a song
// @access Private
router.post('/', uploadControllers);

module.exports = router;