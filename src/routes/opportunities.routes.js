const {
  Add,
  Join,
  Leave,
  UserOpportunities,
  Search,
  Delete,
  Joined,
} = require("../controllers/opportunities.controller.js");
const { Router } = require("express");
const jwtVerification = require("../middlewares/jwtVerification.js");

const OpportunitiesRoute = new Router();

OpportunitiesRoute.post("/add", [jwtVerification], Add);
OpportunitiesRoute.put("/join/:id", [jwtVerification], Join);
OpportunitiesRoute.put("/leave/:id", [jwtVerification], Leave);
OpportunitiesRoute.get("/user", [jwtVerification], UserOpportunities);
OpportunitiesRoute.get("/search", [jwtVerification], Search);
OpportunitiesRoute.get("/joined", [jwtVerification], Joined);
OpportunitiesRoute.delete("/delete/:id", [jwtVerification], Delete);
module.exports = OpportunitiesRoute;
