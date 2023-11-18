const fs = require("fs");
const bcrypt = require("bcrypt");
const User = require("../models/usermodels");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/apperror");
const data = fs.readFileSync(`${__dirname}/../data/users.json`, "utf-8");
const users = JSON.parse(data);
const jwt = require ("jsonwebtoken");
const env = require("dotenv");
env.config({ path: "../config.env" });

 signtoken = (userid) => {
  jwt.sign(
    {
      id: userid._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRED_IN,
    });
}

exports.signin = async(req, res) => {

  const user = await User.findById(req.body.user)
    // const email = req.params.email;
    // console.log(req.params);
    // var tour;
    // var tour = tours.filter((el)=>el.id == id);
    // const user = users.find((el) => el.email == email);
    // for (var i = 0; i < tours.length; i++)
    // if (id == tours[i]["id"]){
    //   tour = tour[i];
    //   console.log(tour)
    // }
    console.log(user);
    if (!user) {
      return res.status(200).json({
        status: "Fail",
        message: "User doesn't exist",
      });
    }
    res.status(200).json({
      status: "200",
      requestAt : req.reqTime,
      user,
    });
};
exports.register = (req,res) => {
  console.log(req.body);

  const newUser = User.create(req.body);
  res.status(200).json({
    status: "Success",
    message: "Tour has been added Successfullly",
    user: newUser,
  });
}
exports.checkBody =(req,res,next)=> {
    console.log(req.body);
    console.log(">>>>This is checkBody middleware<<<<<");

    if (!req.body.id || !req.body.email){
        return res.status(400).json({
            status : "Fail",
            message : "Enter email and password"
        });
    }
    next();
}

exports.singnup = catchAsync(async(req,res) => {

  const hashpassword = await bcrypt.hash(req.body.password,10);
 
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword,
    passwordConfirm: hashpassword,
  });
  // let token = signtoken(newUser._id);
  let token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRED_IN,
    });
  console.log(token);
  res.status(201).json({
    status: "success",
    data : {
        user : newUser,
        token: token
    }
})
});

exports.login = catchAsync(async(req,res,next) => {

  console.log(req.body.email);

  const user = await User.findOne({email:req.body.email}).select("+password");
  console.log(">>>>>>>>>>");
    console.log(user);

    if(!user){
      return next(new AppError("User not register",404))
    };
  
    
  const compare = await bcrypt.compare(req.body.password,user.password);
  // let token = signtoken(user._id);
  let token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRED_IN,
    });
  console.log(token);
  if (compare == true){
    res.status(200).send({
        status: "Success",
        message: "Login Successsfully",
        user:user,
        token:token
    })
  }else{
    res.status(500).send({
        status: "Fail",
        message: "Login Failed,Please try again"
    })
  }
   
})
  
