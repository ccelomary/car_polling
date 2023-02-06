const { Router } = require("express");
const { login } = require("../controllers/auth.controller.js");
const authRouter = new Router();

authRouter.post("/login", login);

module.exports = authRouter;
