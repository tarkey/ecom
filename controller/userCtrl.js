const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const asyncHandler = require("express-async-handler");
const validateDbId = require("../utils/validatemongoDbId");
const { generateRefreshToken } = require("../config/refreshToken");

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
    const refreshToken = await generateRefreshToken(finduser?._id);
    const updateUser = await User.findByIdAndUpdate(
      finduser?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 2,
    });
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
    validateDbId(id);
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
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(
      _id,
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
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({ message: "blocked user successfully" });
  } catch (error) {
    throw new Error(error);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json({ message: "unblocked user successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateUser,
  blockUser,
  unblockUser,
};
