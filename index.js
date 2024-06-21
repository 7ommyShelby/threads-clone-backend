const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors");
const userrouter = require("./routes/user")
const postrouter = require('./routes/posts')

const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGOOSE_KEY)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(() => {
        console.log("Could not connect to database");
    })

    app.use("/api/users", userrouter)
    app.use("/api/posts", postrouter)

app.listen(port, () => {
    console.log("Server up and running at", port);
})