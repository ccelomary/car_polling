const { client } = require("../config/db.config.js");

const OPPORTUNITIES_USERS_TableQuery = `CREATE TABLE IF NOT EXISTS opportunities_users (
  user_id integer REFERENCES users(userid), 
  opportunity_id integer REFERENCES opportunities(opportunity_id),
  PRIMARY KEY (user_id, opportunity_id)
)`;

const opportinitiesUsersTable = async () => {
  try {
    await client.query(OPPORTUNITIES_USERS_TableQuery);
    console.log("OPPORTUNITIES TO USERS CREATED");
  } catch (e) {
    console.log("ERROR HAPPENS WHILE CREATING OPPORTUNITIES_USERS TABLE TO DB");
  }
};

module.exports = opportinitiesUsersTable;
