const catchAsync = require("../utils/catchAsync");
const User = require("../models/usermodels");
const appError = require("../utils/apperror");
const APIFeatures = require("../utils/apifeatures");
const sendMail = require("../utils/nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const env = require("dotenv");
const AppError = require("../utils/apperror");
env.config({ path: "./config.env" });

signtoken = (userid) => {
  jwt.sign(
    {
      id: userid._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRED_IN,
    }
  );
};
exports.protect = catchAsync(
  async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new appError("You must have to login to view all tours", 401)
      );
    }
    console.log(">>>>>>><<<<<<<");
    // 2) Verification Token
    const decodetoken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    console.log(decodetoken);

    // 3) Check if user still exists

    const user = await User.findById(decodetoken.id);
    console.log(user);
    if (!user) {
      return next(new appError("Invaild token"), 404);
    }
  
    req.user = user;
    next();
  },
  (exports.allowOnly = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You don't have permission to perform this action!", 403)
        );
      }
      next();
    };
  }),
  (exports.forgotPassword = catchAsync(async (req, res, next) => {
    //1) Check token and get user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("User with this email doesn't exist"));
    }
    //2) Generate random token
    const { resetToken, passwordResetToken, passwordResetExpired } =
      createPasswordResetToken();

    //2.1) Save the token to the database
    await User.findByIdAndUpdate(user._id, {
      passwordResetToken: passwordResetToken,
      passwordResetExpired: passwordResetExpired,
    });

    // 3. Send it to user's email
    await sendMail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message: `http://localhost:8000/api/v1/users/resetpassword/${resetToken}.`,
    });
    res.status(200).json({
      status: "success",
      resetToken,
    });
    // exports.resetToken = (req,res,next) => {};
  })),
  (exports.resetToken = catchAsync(async (req, res, next) => {
    //  1) Check the token and get user
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpired: { $gt: Date.now() },
    });

    //  2) If the token is expired and there is a user, set the new password
    if (!user) {
      return next(new AppError("Token expired or Invalid", 404));
    }

    //  3) Update changePasswordAt property for the user
    (user.password = req.body.password),
      (user.passwordConfirm = req.body.passwordConfirm),
      (user.createPasswordResetToken = undefined),
      (user.passwordResetExpired = undefined),
      await user.save();

    //  4) Log the user in and send JWT
    const token = signtoken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  }))
);
const createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  console.log(resetToken);

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpired = Date.now() + 10 * 60 * 1000;

  return { resetToken, passwordResetToken, passwordResetExpired };
};
