const express = require("express");
const tourRouter = express.Router();
const tourCtrl = require("../controller/tourCtrl");
const authCtrl = require("../controller/authCtrl");

tourRouter
  .route("/")
  .get(authCtrl.protect,authCtrl.allowOnly("admin","lead_guide","user"), tourCtrl.getAlltour)
  .post(tourCtrl.addNewtour);

tourRouter
  .route("/top-5-cheap")
  .get(tourCtrl.aliasTopTours, tourCtrl.getAlltour);
// tourRouter.param("tourid",tourCtrl.checkID)

tourRouter
  .route("/:tourid")
  .get(tourCtrl.getOnetour)
  .patch(tourCtrl.updateOnetour)
  .delete(tourCtrl.delOnetour);

tourRouter.post("/", tourCtrl.getone);

module.exports = tourRouter;
