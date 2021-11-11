const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const controller = {};

// @route POST api/auth/login
// @desc Login user
// @access Public
controller.loginControllers = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Missing username and/or password!',
            });
    }

    try {
        // checking for existing username
        const user = await User.findOne({ username });

        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Incorrect username or password',
                });
        }

        const checkPassword = await argon2.verify(user.password, password);
        if (!checkPassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Incorrect username or password',
                });
        }

        // all good
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            success: true,
            message: 'Login successfully!',
            accessToken,
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