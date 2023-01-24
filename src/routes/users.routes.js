const { Router } = require("express");
const { all, add } = require("../controllers/users.controllers.js");

const userRouter = new Router();

userRouter.get("/all", all);
userRouter.post("/add", add);

module.exports = userRouter;
