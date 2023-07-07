const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User alrady exists");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const finduser = await User.findOne({ email });
  if (finduser && (await finduser.isPasswordMatched(password))) {
    res.json(finduser);
  } else {
    throw new Error("Invalid credentials");
  }
});

module.exports = { createUser, loginUserCtrl };
