const argon2 = require('argon2');
const express = require('express');
const router = express.Router();

const User = require('../models/users')

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const { fullname, username, password } = req.body;

    // simple validation
    if (!fullname || !username || !password) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Missing fullname, username and/or password!',
            });
    }

    try {
        // checking for exist user
        const user = await User.findOne({ username });

        // if exist
        if (user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Username already existed!'
                });
        }

        // all good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashedPassword,
            fullname,
        });
        await newUser.save();

        res.json({
            success: true,
            message: 'User created successfully!',
        });

        // maybe access token here

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
});


// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async(req, res) => {
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
})

module.exports = router