
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = require("./app");
const env = require("dotenv");
env.config({ path: "./config.env" });


const port = process.env.PORT;
const dbpass = process.env.DB_PASSWORD;
console.log(process.env.NODE_ENV);

mongodburl = `mongodb+srv://myowunna2412:${dbpass}@newmongotours.hveyidb.mongodb.net/myTourdb?retryWrites=true&w=majority`;


mongoose.connect(mongodburl).then((con) => {
  console.log("DB connects Successful");
});

// const tesTour = new Tour({
//   name: "Taunggyi",
//   rating: 5,
//   price: 500,
// });

// tesTour
//   .save()
//   .then((doc) => console.log("<<<<>>>>", doc))
//   .catch((err) => console.log("Err", err));

// if (process.env.NODE_ENV == "development") {
//   console.log(app.use(morgan("tiny")));
// }

app.listen(port, () => {
  console.log(`Sever is Running on port ${port}`);
});

