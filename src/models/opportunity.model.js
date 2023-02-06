const { client } = require("../config/db.config.js");

const OpportunityTableQuery = `CREATE TABLE IF NOT EXISTS opportunities (
    opportunity_id serial PRIMARY KEY,
    Departure_time TIMESTAMP NOT NULL UNIQUE,
    Expected_arrival_time TIMESTAMP NOT NULL,
    Origin VARCHAR (50) NOT NULL,
    Days_available Integer,
    Destination VARCHAR (50) NOT NULL,
    Available_seats Integer NOT NULL,
    Owner_id integer REFERENCES users(userId),
    createdAt timestamp default current_timestamp,
    Notes VARCHAR(200)
)`;

const opportunityTable = async () => {
  try {
    await client.query(OpportunityTableQuery);
    console.log("opportunity CREATED");
  } catch (e) {
    console.log("ERROR HAPPENS WHILE CREATING OPPORTUNITY TABLE TO DB");
  }
};

module.exports = opportunityTable;
