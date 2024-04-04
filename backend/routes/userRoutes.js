const express = require('express')
const {getOtp, register, login, uploadPhoto, deleteProfile, getProfile, logout}  = require('../controllers/userController');
const {isAuthenticated} = require("../middlewares/auth")
const Router = express.Router();

Router.route("/getotp").post(getOtp);
Router.route("/register").post(register)
Router.route("/login").post(login)
Router.route("/upload").post(isAuthenticated,uploadPhoto)
Router.route("/delete/profile").delete(isAuthenticated,deleteProfile)
Router.route("/me").get(isAuthenticated,getProfile);
Router.route("/logout").get(isAuthenticated,logout);
module.exports =Router;

