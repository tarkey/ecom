const User = require("../models/userModel");

const createUser = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;

  const findUser = await User.find({ email: email });
  if (!findUser) {
    const newUser = User.create(req.body);
    res.json(newUser);
  } else {
    console.log("User already exist");
    res.json({
      msg: "User Alredy Exists",
    });
  }
};

module.exports = { createUser };
