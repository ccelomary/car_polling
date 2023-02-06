const { loginService } = require("../services/auth.services.js");
const login = async (req, res) => {
  const token = await loginService(req.body);
  if (token) {
    res.status(200).json({
      status: 200,
      message: "Logged in successfully",
      token: `Bearer ${token}`,
    });
  } else {
    res.status(403).json({
      message: "Invalid email or password",
      status: 403,
    });
  }
};

module.exports = {
  login,
};
