const postmodel = require("../models/userpost")
const usermodel = require("../models/user")
const mongoose = require("mongoose")

const createpost = async (req, res) => {

    const { postedBy, text, img } = req.body;

    try {

        if (!postedBy || !text) {
            return res.status(400).json({
                message: "Missing feilds"
            })
        }

        const user = await usermodel.findById(postedBy)
        // console.log(user);
        if (!user) return res.status(400).json({ messgae: "User not found" });

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                message: "User unauthorised"
            })
        }

        const maxlength = 500;
        if (text.length > maxlength) {
            return res.status(400).json({
                message: "Text limit exceded"
            })
        }

        await postmodel.create({ postedBy, text, img });

        return res.status(201).json({
            message: "Post created successfully"
        })


    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message: "Something went wrong!" + error.message
        })
    }
}
const getpost = async (req, res) => {

    const { id } = req.params

    try {
        const post = await postmodel.findById(id);

        if (!post) {
            return res.status(400).json({
                message: "Post not found"
            })
        }

        res.json(post)

    } catch (error) {
        console.log("something went wrong", error.message);
        res.status(400).json({
            message: "Something went wrong" + error.message
        })
    }
}
const deletepost = async (req, res) => {
    const { id } = req.params

    try {
        const post = await postmodel.findById(id);

        if (!post) {
            return res.status(400).json({
                message: "Something went wrong, Post not found"
            })
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                message: "Do not poke your nose in someone else's account"
            })
        }

        await postmodel.findByIdAndDelete(id);

        res.json({
            message: "Post deleted successfully"
        })


    } catch (error) {
        console.log("something went wrong", error.message);
        res.status(400).json({
            message: "Something went wrong" + error.message
        })
    }

}
const likepost = async (req, res) => {

    const { id: postid } = req.params;

    try {

        const post = await postmodel.findById(postid);

        if (!post) {
            return res.status(404).json({
                message: "Something went wrong, Post not found"
            })
        }

        const userlikepost = post.likes.includes(req.user._id);

        if (userlikepost) {
            await postmodel.updateOne({ _id: postid }, { $pull: { likes: req.user._id } })
            res.json({
                message: "Post unliked Successfully"
            })

        } else {
            await postmodel.updateOne({ _id: postid }, { $push: { likes: req.user._id } })
            res.json({
                message: "Post liked Successfully"
            })
        }

    } catch (error) {
        console.log("something went wrong", error.message);
        res.status(400).json({
            message: "Something went wrong" + error.message
        })
    }
}
const replypost = async (req, res) => {
    
    const { id: postid } = req.params;
    const { text } = req.body;

    const { _id, profilePic, username } = req.user
    const loggeduserid = _id;

    try {

        const post = await postmodel.findById(postid);
        // console.log(post);
        if (!post) {
            return res.status(400).json({
                message: "Post not found"
            })
        }

        const reply = { userID: loggeduserid, username, text, userphoto: profilePic }

        post.reply.push(reply);
        await post.save()

        res.status(200).json({
            message: "Reply sent successfully",
            post
        })

    } catch (error) {
        console.log("something went wrong! ", error.message);
        res.status(400).json({
            message: "Something went wrong" + " " + error.message
        })
    }
}
const feedpost = async (req, res) => {

    try {
        const userid = req.user._id;
        const user = await usermodel.findById(userid);

        if (!user) {
            return res.status(400).json({
                message: "Something went wrong! User not found"
            })
        }
        const following = user.following;

        const feeds = await postmodel.find({ postedBy: { $in: following } }).sort({ createdAt: -1 }).populate('postedBy', 'username', usermodel)

        res.json(feeds)

    } catch (error) {
        console.log("something went wrong! ", error.message);
        res.status(400).json({
            message: "Something went wrong" + " " + error.message
        })
    }

}
const userposts = async (req, res)=>{

    const {id} = req.params;

    const posts  = await postmodel.find({postedBy : id}).populate("postedBy", "username", usermodel);

    if(!posts){
        return res.json({
            message : "No posts found, Create some"
        })
    }

    res.json(posts)

}
const postcontroller = {
    createpost,
    getpost,
    deletepost,
    likepost,
    replypost,
    feedpost,
    userposts
}

module.exports = postcontroller
