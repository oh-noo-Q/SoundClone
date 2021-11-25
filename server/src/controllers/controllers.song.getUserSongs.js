const Song = require('../models/songs');

const controller = {};

controller.getUserSongsController = async (req, res) => {
    console.log(req.userId);

    try {
        const songs = await Song
            .find({ user: req.userId }, { _id: 0, __v: 0 })
            .populate('user', 'fullname -_id');

        res.json({
            success: true,
            message: 'Successful',
            songs,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
}

module.exports = controller;