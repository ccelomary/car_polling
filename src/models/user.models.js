const { client } = require("../config/db.config.js");

const UserTableQuery = `CREATE TABLE IF NOT EXISTS users (
    UserId serial PRIMARY KEY,
    Name VARCHAR (50) NOT NULL,
    Surname VARCHAR (50) NOT NULL,
    Password VARCHAR (200) NOT NULL,
    Email VARCHAR (50) NOT NULL UNIQUE,
    Phone VARCHAR (50),
    Join_opportunities INTERGER REFERENCES opportunities(opportunity_id)
)`;

const userTable = async () => {
  try {
    await client.query(UserTableQuery);
    console.log("USER CREATED");
  } catch (e) {
    console.log("ERROR HAPPENS WHILE CREATING USER TABLE TO DB");
  }
};

module.exports = userTable;
