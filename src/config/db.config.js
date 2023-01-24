const { Client } = require("pg");
require("dotenv").config();
const client = new Client();

const connectDB = async () => {
  try {
    await client.connect();
    console.log("OUR APPLICATION IS CONNECTED TO DATABASE!");
    return true;
  } catch (e) {
    console.log("APPLICATION ARE UNABLE TO CONNECT TO THE DATABASE");
    return false;
  }
};
module.exports = {
  client,
  connectDB,
};
