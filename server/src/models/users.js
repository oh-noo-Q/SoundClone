const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    fullname: {
        type: String,
        required: true,
    },
    tracks: {
        type: Array,
    },
    playlists: {
        type: Array,
    }
});

module.exports = mongoose.model('users', userSchema);