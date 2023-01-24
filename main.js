const { connectDB } = require("./src/config/db.config.js");
const userRouter = require("./src/routes/users.routes.js");
const createUserTable = require("./src/models/user.models.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/users", userRouter);

app.listen(8000, () => {
  console.log("APP IS RUNING");
  connectDB().then((isConnected) => {
    if (isConnected) {
      //createUserTable();
    }
  });
});
