const { client } = require("../config/db.config.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const loginService = async ({ email, password }) => {
  const findUserQuery = "SELECT * FROM users Where email=$1::text";
  const { rows: users } = await client.query(findUserQuery, [email]);
  const isEqual = await bcrypt.compare(password, users[0].password);
  if (!users.length || !isEqual) return null;
  const { password: pass, ...rest } = users[0];
  const token = jwt.sign(rest, process.env.JWTSECRET);
  return token;
};

module.exports = {
  loginService,
};
