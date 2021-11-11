const UpdateSong = require('../models/songs');

const controller = {};

controller.updateControllers = async(req, res) => {
    const { title, genre } = req.body;

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
        let updatedSong = {
            title,
            genre,
        }

        const songUpdateCondition = {
            _id: req.params.id,
            user: req.userId,
        }

        updatedSong = await UpdateSong.findOneAndUpdate(songUpdateCondition, updatedSong, { new: true });

        // user not authorized or song not found
        if (!updatedSong) {
            return res.status(401).json({ success: false, message: 'not authorized or song not found!' });
        }

        res.json({
            success: true,
            message: 'he he he updated successfully',
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