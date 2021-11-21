const express = require('express');
const router = express.Router();
const multer = require('multer');

const firebase = require('../configs/firebase');
const verifyToken = require('../middleware/auth');

const upload = multer({
    storage: multer.memoryStorage(),
});

// @route POST api/song/upfirebase
// @desc Upload audio files to Firebase Storage
// @access Private
router.post('/', verifyToken, upload.single('song'), (req, res) => {
    console.log(req.file.originalname);

    if (!req.file) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'File not found :((',
            });
    }

    try {
        const blob = firebase.bucket.file(`songs/${req.file.originalname}`);

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        blobWriter.on("error", (err) => {
            console.log(err);
        });

        blobWriter.on("finish", () => {
            let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
            res.status(200).json({
                message: "File uploaded!",
                url: publicUrl,
            });
        });

        blobWriter.end(req.file.buffer);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }

});

module.exports = router;