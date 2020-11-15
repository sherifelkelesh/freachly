const mongoose = require('mongoose');

const User = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    contact: {
        firstName: String,
        lastName: String,
        email: String
    },
    profilePictureUrl: String,
    username: {
        type: String,
        unique: true,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('User', User);
