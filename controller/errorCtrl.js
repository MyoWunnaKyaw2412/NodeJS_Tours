const AppError = require("../utils/apperror");

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  console.log("ErrCtrl>>>>>>>>>>>>>>>>>>>>>>>>.");
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const sendErrorDev = (err, res) => {
    console.log("<<<<<SEDev>>>>>>>>");
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      err: err,
      errorStack: err.stack,
    });
  };

  const sendErrProd = (err, res) => {
     return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };

  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV == "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == "production") {
    console.log("<<<<<<<SEProd>>>>>>>");
    if (err.name == "JsonWebTokenError" || err.name == "TokenExpiredError") {
      if (err.message == "invalid singature") {
        err = new AppError("Invalid Token.Please login again.", 401);
      }
      if (err.message == "jwt expired") {
        err = new AppError("Token Expired.Please login again.", 401);
      }
    }
    sendErrProd(err, res);
  }
};
