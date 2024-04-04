const express = require('express')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRoutes')
const fileUpload =require("express-fileupload") ;

const app = express();
app.use(cors());
dotenv.config({path:"./config/config.env"});

//middlewares

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    fileUpload({
      useTempFiles: true,
    })
  );


//routes
app.use("/api/v1",userRouter)


module.exports = app;