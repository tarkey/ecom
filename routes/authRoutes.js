const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
} = require("../controller/userCtrl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/allUsers", getallUser);
module.exports = router;
