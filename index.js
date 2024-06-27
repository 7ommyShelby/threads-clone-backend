const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors");
const userrouter = require("./routes/user")
const postrouter = require('./routes/posts')

const app = express();

const port = process.env.PORT;

const corsOptions = {
    origin: ["https://threads-clone-frontend-mu.vercel.app", "http://localhost:5173"],
    credentials: true
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
    const allowedOrigins = [
      "https://threads-clone-frontend-mu.vercel.app",
      "http://localhost:5173"
    ];
  
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
  
    next();
  });



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