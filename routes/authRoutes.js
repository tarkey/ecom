const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  handleLogout,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/allUsers", authMiddleware, isAdmin, getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", handleLogout);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", authMiddleware, deleteaUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
