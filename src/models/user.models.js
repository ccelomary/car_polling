const { client } = require("../config/db.config.js");

const UserTableQuery = `CREATE TABLE IF NOT EXISTS users (
    UserId serial PRIMARY KEY,
    Name VARCHAR (50) NOT NULL,
    Surname VARCHAR (50) NOT NULL,
    Password VARCHAR (200) NOT NULL,
    Email VARCHAR (50) NOT NULL,
    Phone VARCHAR (50)
)`;

const userTable = async () => {
  try {
    await client.query(UserTableQuery);
    console.log("USER CREATED");
  } catch (e) {
    console.log("ERROR HAPPENS WHILE CREATING USER TABLE TO DB");
    console.log(e);
  }
};

module.exports = userTable;
