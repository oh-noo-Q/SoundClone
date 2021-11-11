const argon2 = require('argon2');
const User = require('../models/users');

const controller = {};

controller.registerControllers = async (req, res) => {
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
    } catch (error) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
};

module.exports = controller;