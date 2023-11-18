const fs = require("fs");
const env = require("dotenv");
const  mongoose  = require("mongoose");
const Tour = require("./models/tourmodel");
const express = require("express");
env.config({ path: "./config.env" });

const app = express();
const dbpass = process.env.DB_PASSWORD;
console.log(process.env.NODE_ENV);


mongodburl = `mongodb+srv://myowunna2412:${dbpass}@newmongotours.hveyidb.mongodb.net/myTourdb?retryWrites=true&w=majority`;


mongoose.connect(mongodburl).then((con) => {
  console.log("DB connects Successful");
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`,'utf-8'));
console.log(tours);
const importData = async () =>{
    try{
        await Tour.insertMany(tours);
        console.log("Data successfully Loaded");
    } catch(err){
        console.log(err);
    }
};

importData();