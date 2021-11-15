const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const controller = {};

controller.loginControllers = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res
            .status(401)
            .json({
                success: false,
                message: 'Missing username and/or password!',
            });
    }

    try {
        // checking for existing username
        let user = await User.findOne({ username });

        if (!user) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Incorrect username or password',
                });
        }

        const checkPassword = await argon2.verify(user.password, password);
        if (!checkPassword) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Incorrect username or password',
                });
        }

        // all good
        // Access Token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '12h',
        });

        // Refresh Token
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1000h',
        }); 

        // update refresh token into database
        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            success: true,
            message: 'Login successfully!',
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