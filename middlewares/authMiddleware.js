const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

const authMiddleware = asynchandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;

        next();
      }
    } catch (error) {
      throw new Error("Not Authorized");
    }
  } else {
    throw new Error("Authorization header is not present");
  }
});
const isAdmin = asynchandler(async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user.role !== "admin") {
    throw new Error("Not allowed as not admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
