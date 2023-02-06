const { client } = require("../config/db.config.js");
const bcrypt = require("bcrypt");
const convertArrayToQueryValues = require("../helpers/convertArrayToQueryValues.js");

const allUsers = async () => {
  const getUsersQuery = `SELECT * FROM users`;
  const { rows: users } = await client.query(getUsersQuery);
  return users;
};

const addUser = async ({ Name, Surname, Password, Email, Phone }) => {
  const addUserQuery = `INSERT INTO users (Name, Surname, Password, Email, Phone) 
    VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)`;
  try {
    const hashedPasswod = await bcrypt.hash(Password, +process.env.SALT);
    await client.query(addUserQuery, [
      Name,
      Surname,
      hashedPasswod,
      Email,
      Phone || null,
    ]);
    return true;
  } catch (e) {
    return false;
  }
};

const updateUser = async (user, { Name, Surname, Password, Email, Phone }) => {
  if (Password) {
    Password = await bcrypt.hash(Password, +process.env.SALT);
  }
  const [keys, values] = convertArrayToQueryValues(
    [
      ["Name", Name],
      ["Surname", Surname],
      ["Password", Password],
      ["Email", Email],
      ["Phone", Phone],
    ],
    ([key, value], index) => [`${key}=\$${index + 1}::text`, value]
  );
  const UPDATE_USER_QUERY = `UPDATE users SET ${keys.join(
    ","
  )} WHERE userid=\$${keys.length + 1}::integer`;
  try {
    await client.query(UPDATE_USER_QUERY, [...values, user.userid]);
    return true;
  } catch (e) {
    return false;
  }
};
module.exports = {
  allUsers,
  addUser,
  updateUser,
};
