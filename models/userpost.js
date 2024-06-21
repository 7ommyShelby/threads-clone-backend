const mongoose = require("mongoose");

const postdata = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    text: {
        type: String,
        maxLength: 500,
    },
    img: {
        type: String,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref : "users",
        default: []
    },
    reply: [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true,
            },
            text: {
                type: String,
                required: true
            },
            userphoto: {
                type: String
            },
            username: {
                type: String
            }
        }
    ]
}, {
    timestamps: true,
})

const postmodel = mongoose.model("posts", postdata);

module.exports = postmodel