const { client } = require("../config/db.config.js");
const convertArrayToQueryValues = require("../helpers/convertArrayToQueryValues.js");
const AddOpportunity = async (
  user,
  {
    Departure_time,
    Expected_arrival_time,
    Origin,
    Days_available,
    Destination,
    Available_seats,
    Notes,
  }
) => {
  const ADD_OPPORTUNITY_QUERY = `INSERT INTO opportunities (Departure_time, Expected_arrival_time, Origin, Days_available, Destination, Available_seats, Owner_id,  Notes) VALUES ($1::timestamp, $2::timestamp, $3::text, $4::integer, $5::text, $6::integer, $7::integer, $8::text)`;
  try {
    await client.query(ADD_OPPORTUNITY_QUERY, [
      Departure_time,
      Expected_arrival_time,
      Origin,
      Days_available,
      Destination,
      Available_seats,
      user.userid,
      Notes || null,
    ]);
    return true;
  } catch (e) {
    return false;
  }
};

const getOpportunityById = async (id) => {
  const GET_OPPORTINUTY_BY_ID = `SELECT * FROM opportunities where opportunity_id=$1::integer`;
  const resp = await client.query(GET_OPPORTINUTY_BY_ID, [id]);

  if (!resp.rows.length) return null;
  return resp.rows[0];
};

const checkUserJoined = async (user_id, opportunity_id) => {
  const QUERY =
    "SELECT * FROM opportunities_users WHERE user_id=$1::integer AND opportunity_id=$2::integer";
  const { rows } = await client.query(QUERY, [user_id, opportunity_id]);
  return !!rows.length;
};

const JoinOpportunity = async (user, opportinity_id) => {
  try {
    const opportunity = await getOpportunityById(opportinity_id);
    if (
      !opportunity ||
      opportunity.owner_id === user.userid || // user cannot join the his opportunity
      !opportunity.available_seats || // user cannot join full opportunity
      (await checkUserJoined(user.userid, opportinity_id))
    ) {
      return false;
    }
    const UPDATE_OPPORTUNITIES_QUERY =
      "UPDATE opportunities SET Available_seats=$1::integer WHERE opportunity_id=$2::integer";
    const INSERT_INTO_UOT =
      "INSERT INTO opportunities_users (user_id, opportunity_id) VALUES ($1::integer, $2::integer)";
    await client.query(UPDATE_OPPORTUNITIES_QUERY, [
      opportunity.available_seats - 1,
      opportinity_id,
    ]);
    await client.query(INSERT_INTO_UOT, [user.userid, opportinity_id]);
    return true;
  } catch (e) {
    return false;
  }
};

const LeaveOpportunity = async (user, opportinity_id) => {
  try {
    const opportunity = await getOpportunityById(opportinity_id);
    if (!opportunity || !(await checkUserJoined(user.userid, opportinity_id)))
      return false;
    const UPDATE_OPPORTUNITIES_QUERY =
      "UPDATE opportunities SET Available_seats=$1::integer WHERE opportunity_id=$2::integer";
    const DELETE_ROW_QUERY =
      "DELETE FROM opportunities_users WHERE user_id=$1::integer AND opportunity_id=$2::integer";
    await client.query(UPDATE_OPPORTUNITIES_QUERY, [
      opportunity.available_seats + 1,
      opportinity_id,
    ]);
    await client.query(DELETE_ROW_QUERY, [user.userid, opportinity_id]);
    return true;
  } catch (e) {
    return false;
  }
};

const UserOpportunitiesService = async (user) => {
  const OPPORTINUTIES_QUERY =
    "SELECT * FROM opportunities WHERE owner_id=$1::integer";
  try {
    const { rows: opportinities } = await client.query(OPPORTINUTIES_QUERY, [
      user.userid,
    ]);
    return opportinities;
  } catch (e) {
    return null;
  }
};

const SearchOpportunity = async ({ origin, destination, departure_time }) => {
  const [keys, values] = convertArrayToQueryValues(
    [
      ["origin", origin],
      ["Destination", destination],
      ["Departure_time", departure_time],
    ],
    ([key, value], index) => {
      if (key === "Departure_time")
        return [`${key}>=\$${index + 1}::timestamp`, value];
      return [`${key}=\$${index + 1}::text`, value];
    }
  );

  try {
    const SEARCH_QUERY = `SELECT * FROM opportunities WHERE ${keys.join(
      " AND "
    )};`;
    const { rows: opportunities } = await client.query(SEARCH_QUERY, values);
    return opportunities;
  } catch (e) {
    return null;
  }
};

const DeleteOpportunity = async (user_id, opportunity_id) => {
  const opportunity = await getOpportunityById(opportunity_id);
  const DELETE_QUERY =
    "DELETE FROM opportunities WHERE opportunity_id=$1::integer;";
  if (!opportunity || opportunity.owner_id !== user_id) {
    return false;
  }
  try {
    await client.query(DELETE_QUERY, [opportunity_id]);
    return true;
  } catch (e) {
    return false;
  }
};

const JoinedOpportunities = async (user_id) => {
  const JOINED_OPPORTUNITIES_BY_USER = `SELECT * FROM opportunities_users JOIN opportunities ON (opportunities.opportunity_id = opportunities_users.opportunity_id)
   WHERE opportunities_users.user_id=$1::integer ;`;
  try {
    const { rows: opportunities } = await client.query(
      JOINED_OPPORTUNITIES_BY_USER,
      [user_id]
    );

    return opportunities.map((opportunity) => {
      const { user_id, ...rest } = opportunity;
      return rest;
    });
  } catch (e) {
    return null;
  }
};
module.exports = {
  AddOpportunity,
  JoinOpportunity,
  LeaveOpportunity,
  UserOpportunitiesService,
  SearchOpportunity,
  DeleteOpportunity,
  JoinedOpportunities,
};
