const DeleteSong = require('../models/songs');

const controller = {}

controller.deleteControllers = async (req, res) => {
    try {
        const songDeleteCondition = {
            _id: req.params.id,
            user: req.userId,
        }

        const deletedSong = await DeleteSong.findOneAndDelete(songDeleteCondition);

        // user not authorized or song not found
        if (!deletedSong) {
            return res.status(401).json({ success: false, message: 'not authorized or song not found!' });
        }

        res.json({
            success: true,
            message: 'he he he updated successfully',
            song: deletedSong,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
};

module.exports = controller;