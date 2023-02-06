const { allUsers, addUser, updateUser } = require("../services/users.services");

const all = async (req, res) => {
  const users = await allUsers();
  res.status(200).json({
    status: 200,
    users: users,
  });
};

const add = async (req, res) => {
  const isAdded = await addUser(req.body);
  if (isAdded) {
    res.status(201).json({
      status: 201,
      message: "User Created",
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "INVALID DATA",
    });
  }
};

const profile = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

const update = async (req, res) => {
  const isUpdated = await updateUser(req.user, req.body);
  if (isUpdated) {
    return res.status(201).json({
      message: "user updated!!",
      status: 201,
    });
  }
  res.status(400).json({
    message: "user didn't updated!!",
    status: 400,
  });
};
module.exports = {
  all,
  add,
  profile,
  update,
};
