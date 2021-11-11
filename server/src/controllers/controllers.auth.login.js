const argon2 = require('argon2');
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
        res.json({
            success: true,
            message: 'Login successfully!',
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