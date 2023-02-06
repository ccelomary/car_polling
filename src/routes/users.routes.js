const { Router } = require("express");
const {
  all,
  add,
  profile,
  update,
} = require("../controllers/users.controllers.js");
const jwtVerification = require("../middlewares/jwtVerification.js");
const userRouter = new Router();

userRouter.get("/all", all);
userRouter.post("/add", add);
userRouter.get("/profile", [jwtVerification], profile);
userRouter.put("/update", [jwtVerification], update);

module.exports = userRouter;
