const argon2 = require('argon2');

const UpdateUser = require('../models/users');

const controller = {};

// @control UPDATE user's fullname
controller.updateFullnameControllers = async(req, res) => {
    const { fullname } = req.body;

    // simple validation
    if (!fullname) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Fullname is required',
            });
    }

    try {
        let updatedUser = {
            fullname,
        }

        const userUpdateCondition = {
            user: req.userId,
        }

        updatedUser = await UpdateUser.findOneAndUpdate(userUpdateCondition, updatedUser, { new: true });

        // user not authorized or song not found
        if (!updatedUser) {
            return res.status(401).json({ success: false, message: 'not authorized or user not found!' });
        }

        res.json({
            success: true,
            message: 'hi hi hi updated successfully',
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
};


// @control UPDATE user's password
controller.updatePasswordControllers = async(req, res) => {
    const { newPass, oldPass } = req.body;

    // simple validation
    if (!newPass || !oldPass) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'You have not entered the passwords -_-',
            });
    }

    try {
        const user = await UpdateUser.findById(req.userId);
        const checkOldPass = await argon2.verify(user.password, oldPass);

        if (!checkOldPass) {
            return res.status(400).json({ success: false, message: 'Wrong password :)))' });
        }

        if (oldPass === newPass) {
            return res.status(400).json({ success: false, message: 'Same passwords, please enter again -_-' });
        }

        const hashedNewPass = await argon2.hash(newPass);
        let updatedUser = {
            password: hashedNewPass,
        }

        const userUpdateCondition = {
            user: req.userId,
        }

        updatedUser = await UpdateUser.findOneAndUpdate(userUpdateCondition, updatedUser, { new: true });

        // user not authorized or song not found
        if (!updatedUser) {
            return res.status(401).json({ success: false, message: 'not authorized or user not found!' });
        }

        res.json({
            success: true,
            message: 'hehe changed password successfully :>',
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