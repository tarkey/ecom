const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getaBlog,
  getallBlogs,
  likeBlog,
} = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
router.post("/", authMiddleware, createBlog);
router.put("/likes", authMiddleware, isAdmin, likeBlog);
router.put("/:id", updateBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
router.get("/", getallBlogs);
router.get("/:id", getaBlog);

module.exports = router;
