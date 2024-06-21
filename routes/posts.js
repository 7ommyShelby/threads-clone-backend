const express = require("express");
const {createpost, getpost, deletepost, likepost, replypost, feedpost, userposts} = require('../controllers/posts')
const userauth = require("../middlewares/userauth")

const router = express.Router();

router.get("/userposts/:id", userauth, userposts)
router.get("/feed", userauth, feedpost)
router.get("/:id", getpost) 
router.post("/create",userauth, createpost);
router.post("/like/:id", userauth, likepost);
router.post("/reply/:id", userauth, replypost);
router.delete("/:id",userauth, deletepost);

module.exports = router