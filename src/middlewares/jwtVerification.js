const jwt = require("jsonwebtoken");
const { client } = require("../config/db.config.js");
const jwtVerification = async (req, res, next) => {
  const GET_USER_BY_ID = "SELECT * FROM users WHERE userid=$1::integer";
  const token = req.header("Authorization");
  try {
    const { userid } = jwt.verify(token.split(" ")[1], process.env.JWTSECRET);
    const { rows: users } = await client.query(GET_USER_BY_ID, [userid]);
    if (!users.length) throw Error("No user found");
    const { password, ...rest } = users[0];
    req.user = rest;
    next();
  } catch (e) {
    res.status(401).json({
      status: 401,
      message: "UNOTHROIZED",
    });
  }
};

module.exports = jwtVerification;
