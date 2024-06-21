const usermodel = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken")

const userauth = async (req, res, next) => {

    try {

        if (!req.headers.authorization) {
            return res.status(400).json({
                message: "UnAuthorized User"
            })
        }
        // console.log(!true);
        //  console.log(!jwt.verify(req.headers.authorization, process.env.JWTKEY), "jwtverification");

        if (!jwt.verify(req.headers.authorization, process.env.JWTKEY)) {
            return res.status(400).json({
                message: "UnAuthorized User"
            })
        }

        const tokendata = jwt.decode(req.headers.authorization)

        const userid = tokendata.userid;
        const user = await usermodel.findById(userid);

        if (!user) {
            return res.status(401).json({
                message: "UnAuthorized User"
            })
        }

        req.user = user
        
        next();

    } catch (error) {
        console.log("something went wrong in auth", error.message);
        res.status(401).json({
            status : "Expired",
            message: error.message
        })
    }
}

module.exports = userauth;