const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    hashTags: [String],
    mentions: [String],
    text: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Comment', Comment);
