const express = require("express");
const { usersignup, userlogin, userfollow, updateuser, userprofile, userinfo } = require("../controllers/user")
const userauth = require("../middlewares/userauth")


const router = express.Router();
router.get("/userinfo", userauth, userinfo)
router.get("/profile/:query", userprofile)
router.post("/signup", usersignup);
router.post("/login", userlogin);
router.post("/follow/:id", userauth, userfollow);
router.post("/update/:id", userauth, updateuser )

module.exports = router;