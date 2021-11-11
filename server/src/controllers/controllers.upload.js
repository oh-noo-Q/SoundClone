const UploadSong = require('../models/songs');

const controller = {};

// @route POST api/upload
// @desc Upload a song
// @access Private
controller.uploadControllers = async(req, res) => {
    const { title, genre, urlAudio } = req.body;

    // simple validation
    if (!title) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Title is required',
            });
    }

    try {
        const newSong = new UploadSong({ 
            title, 
            genre: genre || 'none', 
            urlAudio, 
            user: '618b87d5e2204d9f9ae33e01',
        });

        await newSong.save();

        res.json({
            success: true,
            message: 'haha thanh cong rui ne :>',
            song: newSong,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
};

module.exports = controller;