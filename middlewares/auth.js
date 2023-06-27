const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");
const userService = require("../services/userService");

const checkLogInToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      const error = new Error("NEED_ACCESS_TOKEN", 401);
      return res.status(error.statusCode).json({ message: error.message });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await userService.getUserById(decoded.id);

    if (!user) {
      const error = new BaseError("INVALID_USER", 401);
      return res.status(error.statusCode).json({ message: error.message });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "INVALID_TOKEN",
    });
  }
};

const optionalCheckLogInToken = async (req, res, next) => {
  if (req.headers.authorization) {
    return checkLogInToken(req, res, next);
  }
  next();
};

module.exports = {
  checkLogInToken,
  optionalCheckLogInToken,
};
