const {
  AddOpportunity,
  JoinOpportunity,
  LeaveOpportunity,
  UserOpportunitiesService,
  SearchOpportunity,
  DeleteOpportunity,
  JoinedOpportunities,
} = require("../services/opportunities.services.js");

const Add = async (req, res) => {
  const isCreated = await AddOpportunity(req.user, req.body);
  if (isCreated) {
    res.status(201).json({
      status: 201,
      message: "OPPORTINUTY CREATED",
    });
  } else {
    res.status(400).json({
      status: 400,
    });
  }
};

const Join = async (req, res) => {
  const isJoined = await JoinOpportunity(req.user, +req.params.id);
  if (isJoined) {
    res.status(201).json({
      status: 201,
      message: "YOU JOINED",
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "YOU ARE UNABLE TO JOIN",
    });
  }
};

const Leave = async (req, res) => {
  const isLeft = await LeaveOpportunity(req.user, +req.params.id);
  if (isLeft) {
    res.status(201).json({
      status: 201,
      message: "YOU LEFT",
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "YOU ARE UNABLE TO LEAVE",
    });
  }
};

const UserOpportunities = async (req, res) => {
  const opportinities = await UserOpportunitiesService(req.user);
  if (opportinities) {
    return res.status(200).json({
      status: 200,
      opportinities,
      message: "Success!",
    });
  }
  res.status(400).json({
    status: 400,
    message: "Inavlid data",
  });
};

const Search = async (req, res) => {
  const opportunities = await SearchOpportunity(req.body);
  if (opportunities) {
    return res.status(200).json({
      status: 200,
      opportunities,
      message: "Success!",
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

const Delete = async (req, res) => {
  const isDeleted = await DeleteOpportunity(req.user.userid, +req.params.id);
  if (isDeleted) {
    return res.status(201).json({
      status: 201,
      message: "Car polling opportunity is deleted",
    });
  }
  res.status(400).json({
    status: 400,
    message: "Invalid data",
  });
};

const Joined = async (req, res) => {
  const opportunities = await JoinedOpportunities(req.user.userid);
  if (opportunities) {
    return res.status(200).json({
      status: 200,
      opportunities,
      message: "success",
    });
  }
  res.status(500).json({
    status: 500,
    message: "Something went wrong",
  });
};

module.exports = {
  Add,
  Join,
  Leave,
  UserOpportunities,
  Search,
  Delete,
  Joined,
};
