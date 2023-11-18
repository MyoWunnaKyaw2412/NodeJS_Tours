const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter");
const bookingmodel = require("./routers/bookingRouter");
const tourRouter = require("./routers/tourRouter");
const reqTime = require("./middleware/reqTime");
const app = express();
const AppError = require("./utils/apperror");
const globalErrorHandler = require("./controller/errorCtrl");

const myLogger = (req, res, next) => {
  console.log("Hello From Middleware");
  next();
};
app.use(express.json());
app.use(reqTime);
app.use(myLogger);
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.end({
    message: "Hello from server",
  });
});
app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/users",userRouter);

app.all("*", (req, res, next) => {

  
  next(new AppError(`Can't find ${req.originalUrl} on this sever`, 404));
  // res.status(404).json({
  //   status: "Fail",
  //   message: `Can't find ${req.originalUrl}on this sever`
  //   })
});
app.use(globalErrorHandler);
// app.use("/api/v1/tours/booking",bookingRouter);
// app
// .route("/api/v1/tours/:id")
// .get(getOnetour)
// .patch(updateOnetour)
// .delete(delOnetour)

// app
// .route("/api/v1/tours")
// .get(getAlltour)
// .post(addNewtour)

// app.get("/api/v1/tours/:id", getOnetour),
// app.delete("/api/v1/tours/:id", delOnetour),
// app.patch("/api/v1/tours/:id", updateOnetour),

// app.post("/api/v1/tours", addNewtour),
// app.get("/api/v1/tours", getAlltour),

// app.get("/", check );

module.exports = app;
