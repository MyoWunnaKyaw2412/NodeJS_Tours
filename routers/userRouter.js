const express = require("express");
const userCtrl = require("./../controller/userCtrl");
const authCtrl = require("../controller/authCtrl")
const userRouter = express.Router();

// userRouter.route("/login").post(userCtrl.checkBody,userCtrl.login);

userRouter.post('/login',userCtrl.login);

userRouter.post('/signup',userCtrl.singnup);

userRouter.post('/forgotpassword',authCtrl.forgotPassword);

module.exports = userRouter;