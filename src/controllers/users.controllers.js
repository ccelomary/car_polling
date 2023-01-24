const { allUsers, addUser } = require("../services/users.services");

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
module.exports = {
  all,
  add,
};
