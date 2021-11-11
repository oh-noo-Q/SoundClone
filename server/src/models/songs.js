const mongoose = require('mongoose');
const schema = mongoose.Schema;

const songSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    },
    views: {
        type: Number,
    },
    urlAudio: {
        type: String,
        required: true,
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'users',
    }
});

module.exports = mongoose.model('songs', songSchema);