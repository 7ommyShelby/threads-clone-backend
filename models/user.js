const mongoose = require("mongoose");

const userdata = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profilePic: {
        type: String,
        default: ""
    },
    followers: {
        type: [String],
        default: [],

    },
    following: {
        type: [String],
        default: [],
    },
    bio: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const usermodel = mongoose.model("users", userdata);

module.exports = usermodel;