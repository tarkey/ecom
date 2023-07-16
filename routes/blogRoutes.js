const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getaBlog,
  getallBlogs,
} = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
router.post("/", authMiddleware, createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
router.get("/", getallBlogs);
router.get("/:id", getaBlog);

module.exports = router;
