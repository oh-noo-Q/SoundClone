const User = require('../models/users');

const controller = {}

controller.authControllers = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }

        res.json({
            success: true,
            user,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Interval server errors',
        });
    }
}

module.exports = controller