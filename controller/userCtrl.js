const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
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
    res.json({
      _id: finduser?._id,
      firstname: finduser?.firstname,
      lastname: finduser?.lastname,
      email: finduser?.email,
      mobile: finduser?.mobile,
      token: generateToken(finduser?.id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error();
  }
});
const getaUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error("User not found");
  }
});

const deleteaUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    throw new Error("User not found");
  }
});
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (error) {
    throw new Error("User not found");
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateUser,
};
