const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateUser,
} = require("../controller/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/allUsers", getallUser);
router.get("/:id", authMiddleware, getaUser);
router.delete("/:id", authMiddleware, deleteaUser);
router.put("/:id", authMiddleware, updateUser);
module.exports = router;
