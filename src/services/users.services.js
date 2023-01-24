const { client } = require("../config/db.config.js");

const allUsers = async () => {
  const getUsersQuery = `SELECT * FROM users`;
  const { rows: users } = await client.query(getUsersQuery);
  return users;
};

const addUser = async ({ Name, Surname, Password }) => {
  const addUserQuery = `INSERT INTO users (Name, Suranme, Password) 
    VALUES ($1::text, $2::text, $3::text)`;
  try {
    await client.query(addUserQuery, [Name, Surname, Password]);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  allUsers,
  addUser,
};
