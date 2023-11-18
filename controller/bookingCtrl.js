// const fs = require("fs");
// const booking = require("../models/bookingmodel");
// const data = fs.readFileSync(`${__dirname}/../data/booking.json`, "utf-8");
// const tourbooking = JSON.parse(data);

// exports.addNewbooking = (req,res) => {
//     console.log(req.body);
//     try{
//         const newbooking = booking.create(req.body);

//     res.status(200).json({
//         status: "Success",
//         message: "Booking has been added Successfully",
//         tourbooking: newbooking,
//     })
//     }catch(err){
//         res.status(401).json({
//             status: "Fail",
//             message: `${err.message}`,
//         })
//     }
// }