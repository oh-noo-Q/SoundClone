const jwt = require('jsonwebtoken');
const User = require('../models/users');

const controller = {};

controller.logoutControllers = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });

        user.refreshToken = null;
        user.save();
        console.log(user.refreshToken);

        res.status(201).json({ success: true, message: 'Logged out successfully' });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
};

module.exports = controller;