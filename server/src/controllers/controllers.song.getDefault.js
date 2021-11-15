const Song = require('../models/songs');

const controller = {};

controller.getDefaultControllers = async (req, res) => {

    try {
        const songs = await Song
            .find({ user: process.env.ID_ADMIN_ACCOUNT }, { _id: 0, __v: 0 })
            .populate('user', 'fullname -_id');

        if (songs.length === 0) {
            return res.status(404).json({ success: false, message: 'Sorry, something you want is not available :((' });
        }

        // all good
        res.json({ success: true, message: 'hehe get default songs successfully', songs });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
};

module.exports = controller;