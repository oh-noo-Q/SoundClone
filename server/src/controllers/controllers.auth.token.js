const jwt = require('jsonwebtoken');
const User = require('../models/users');

const controller = {}

controller.tokenControllers = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'Where is the refresh token?' });
    }

    let user = await User.findOne({ refreshToken });
    console.log(user);

    if (!user) {
        return res.status(403).json({ success: false, message: 'Lew Lew Fake dude :))' })
    }

    try {
        // all good
        // New Access Token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1m',
        });

        // New Refresh Token
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1h',
        });

        // update new refresh token into database
        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            success: true,
            message: 'get new token successfully',
            accessToken,
            refreshToken,
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