const Song = require('../models/songs');

const controller = {};

controller.searchControllers = async (req, res) => {
    // titleSearch is regex
    const { titleSearch } = req.body;

    if (!titleSearch) {
        return res.status(400).json({ success: false, message: 'please enter something -_-' });
    }
    console.log(titleSearch);

    try {
        const songs = await Song.find({ title: titleSearch }).populate('user', ['fullname']);

        if (songs.length === 0) {
            return res.status(404).json({ success: false, message: 'Sorry, something you want is not available :((' });
        }

        // all good
        res.json({ success: true, message: 'hehe search done', songs });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
};

module.exports = controller;