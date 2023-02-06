require("dotenv").config();
const { connectDB } = require("./src/config/db.config.js");
const userRouter = require("./src/routes/users.routes.js");
const authRouter = require("./src/routes/auth.routes.js");
const OpportunitiesRoute = require("./src/routes/opportunities.routes.js");
const opportunityTable = require("./src/models/opportunity.model.js");
const opportinitiesUsersTable = require("./src/models/opportunities_users.model.js");
const createUserTable = require("./src/models/user.models.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//MIDDLEWARE
app.use(bodyParser.json());

// ROUTES
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/opportunities", OpportunitiesRoute);
// APP RUN
app.listen(8000, () => {
  console.log("APP IS RUNING");
  connectDB().then((isConnected) => {
    if (isConnected) {
      createUserTable();
      opportunityTable();
      opportinitiesUsersTable();
    }
  });
});
