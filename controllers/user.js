const usermodel = require("../models/user");
const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")


const userprofile = async (req, res) => {

    const { query } = req.params;

    try {
        let user;

        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await usermodel.findOne({ username: query }).select("-password").select("-updatedAt");
        } else {
            user = await usermodel.findOne({ _id: query }).select("-password").select("-updatedAt");
        }

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        res.status(200).json(user)


    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message: "Something went wrong" + error.message,
        })

    }
}

const usersignup = async (req, res) => {

    try {
        const { name, username, email, password, } = req.body
        const user = await usermodel.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hashpass = bcrypt.hashSync(password, salt);

        // console.log(salt, hashpass);

        const newuser = { name, email, username, password: hashpass }
        await usermodel.create(newuser)

        res.json({
            success: true,
            message: `${name} Registered Successfully`
        })

    } catch (error) {
        console.log("Something went wrong", error);
    }
}

const userlogin = async (req, res) => {
    try {

        const user = await usermodel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "incorrect email or password"
            })
        }

        const payload = {
            userid: user._id,
            email: user.email,
            name: user.name,
        }

        const token = jwt.sign(payload, process.env.JWTKEY, {
            expiresIn: "2d"
        })

        if (bcrypt.compareSync(req.body.password, user.password)) {
            return res.json({
                success: true,
                message: `Welcome, ${user.name}`,
                token: token,
            })
        }

        res.json({
            success: false,
            message: "incorrect email or password"
        })

    } catch (error) {
        console.log("Something went wrong while logging ", error);
        res.status(404).json({
            message: "Something went wrong" + error.message,
        })
    }

}

const userfollow = async (req, res) => {

    // console.log("from middleware" , req.user);

    try {
        const { id } = req.params;

        const modifyuser = await usermodel.findById(id)
        const currentuser = await usermodel.findById(req.user._id)

        console.log("selected profile", modifyuser, "loggedin profile", currentuser);

        const loggedid = req.user._id.toString()

        // console.log(loggedid);

        if (id === loggedid) return res.status(400).json({
            message: "Invalid action"
        })

        // if (!modifyuser || !currentuser) return res.status(400).json({
        //     message: "User not found"
        // })

        const isfollowing = currentuser.following.includes(id);

        if (isfollowing) {
            await usermodel.findByIdAndUpdate(loggedid, { $pull: { following: id } });
            await usermodel.findByIdAndUpdate(id, { $pull: { followers: loggedid } })
            res.json({
                message: "User unfollowed successfully"
            })
        } else {
            await usermodel.findByIdAndUpdate(loggedid, { $push: { following: id } })
            await usermodel.findByIdAndUpdate(id, { $push: { followers: loggedid } })
            res.json({
                message: "User followed successfully"
            })
        }


    } catch (error) {
        console.log(error.message);
    }
}

const updateuser = async (req, res) => {

    const { name, email, username, password, profilePic, bio } = req.body;

    const userid = req.user._id;

    try {

        let user = await usermodel.findById(userid);

        // console.log("updatelogged", user);

        const loggeduserid = userid.toString()

        // console.log(loggeduserid, req.params.id);

        if (req.params.id !== loggeduserid) {
            return res.status(400).json({ message: " Login into your account,  Hacker nahi ho!" })
        }

        if (!user) return res.status(400).json({ message: "User not found" })

        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hashpass = bcrypt.hashSync(password, salt);
            user.password = hashpass
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;


        await usermodel.create(user)

        res.json({
            message: "Profile updated successfully"
        })


    } catch (error) {

        console.log(error.message);
        res.status(400).json({
            message: "Couldn't update user" + error.message
        })
    }

}

const userinfo = async (req, res) => {

    const user = await usermodel.findById(req.user._id).select("-password").select("-createdAt");

    if (!user) {
        return res.status(400).json({
            message: "NO user found"
        })
    }

    res.json(user)

}

const usercontroller = {
    userprofile,
    usersignup,
    userlogin,
    userfollow,
    updateuser,
    userinfo
}

module.exports = usercontroller