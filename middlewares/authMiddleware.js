const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

const authMiddleware = asynchandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      }
    } catch (error) {
      throw new Error("Not Authorized");
    }
  } else {
    throw new Error("Authorization header is not present");
  }
});

module.exports = { authMiddleware };
