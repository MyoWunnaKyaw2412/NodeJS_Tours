const fs = require("fs");
const Tour = require("../models/tourmodel");
const APIFeatures = require("../utils/apifeatures");
const { json } = require("express");
const data = fs.readFileSync(`${__dirname}/../data/tours-simple.json`, "utf-8");
const tours = JSON.parse(data);
const AppError = require("../utils/apperror"); 
const catchAsync = require("../utils/catchAsync");
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "price";
  next();
  console.log(this.aliasTopTours);
};
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);

  console.log(tours.length);

  if (req.params.tourid * 1 > tours.length) {
    res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.check = (req, res) => {
  res.end("Hello From Express");
};

exports.getOnetour = catchAsync(async (req, res) => {
  const tour = await Tour.findById(req.params.tourid);
  tour = xxxx;
  // const id = req.params.id;
  // console.log(req.params);
  // var tour;
  // var tour = tours.filter((el)=>el.id == id);
  // const tour = tours.find((el) => el.id == id);>>>>////>>>>

  // for (var i = 0; i < tours.length; i++)
  // if (id == tours[i]["id"]){
  //   tour = tour[i];
  //   console.log(tour)
  // }
  console.log(tour);
  if (!tour) {
    return res.status(200).json({
      status: "Fail",
      message: "Tour doesn't exist",
    });
  }
  res.status(200).json({
    status: "200",
    // requestAt: req.reqTime,
    tour,
  });
  next(new AppError(err.message,401));
});

exports.delOnetour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.tourid);
    res.status(204).json({
      status: "200",
      message: "Tour has been deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      messsage: "Smoething went wrong",
    });
  }
};

exports.updateOnetour = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.tourid, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Success",
      message: "Tour has been updated successfully",
      tours: newTour,
    });
  } catch (err) {
    res.status(401).json({
      status: "Fail",
      message: "Something went wrong",
      error: err,
    });
  }

  // console.log(req.body);
  // const id = req.params.id;
  // var tour = tours.find((el) => el.id == id);

  // res.status(200).json({
  //   status: "Success",
  //   message: "Updated one tour succesfully",
  // });

  // var uptour = {
  //   duration: req.body.duration,
  // };
};

exports.addNewtour = async (req, res) => {
  console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);

    res.status(200).json({
      status: "Success",
      message: "Tour has been added Successfullly",
      tours: newTour,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: `${err.message} ${err.name}`,
    });
  }
  // const newtour = req.body;
  // tours.push(newtour);

  // fs.writeFile(
  //   `${__dirname}/../data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     if (err) {
  //       return res.status(500).json({
  //         status: "fail",
  //         message: "Something went wrong when adding data to database",
  //       });
  //     }
  //     return res.status(200).json({
  //       status: "Success",
  //       message: "Successful added a tour to database",
  //       tours: newtour,
  //     });
  //   }
  // );
};

//<-------------------Filtering and Sorting----------------->
exports.getAlltour = catchAsync(async (req, res,next) => {
 
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .limit()
      .sort()
      .paginate();
    const tours = await features.query;
    
    // res.end("Welcome to Express")]
    res.status(200).json({
      status: "200",
      resulst: tours.length,
      tours: tours,
    });
    next(new AppError(err.message,401))
    // console.log(err);
    // res.status(404).json({
    //   status: "Fail",
    //   message: err,  
    // });
});

exports.checkTour = (req, res, next) => {
  console.log(req.body);
  console.log("------->>>>>This is checkTour Middleware<<<<<-------");
};

exports.getone = catchAsync(async(req,res) => {
const tour = await Tour.findOne(req.params.tourid);
// const id = req.params.id;
// console.log(req.params);
// var tour;
// var tour = tours.filter((el)=>el.id == id);
// const tour = tours.find((el) => el.id == id);>>>>////>>>>

// for (var i = 0; i < tours.length; i++)
// if (id == tours[i]["id"]){
//   tour = tour[i];
//   console.log(tour)
// }
console.log(tour);
if (!tour) {
  return res.status(200).json({
    status: "Fail",
    message: "Tour doesn't exist",
  });
}
res.status(200).json({
  status: "200",
  // requestAt: req.reqTime,
  tour,
});
next(new AppError(err.message,401));
});