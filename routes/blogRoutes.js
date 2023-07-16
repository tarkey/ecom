const express = require("express");
const router = express.Router();
const { createBlog, updateBlog } = require("../controller/blogCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
router.post("/", authMiddleware, createBlog);
router.put("/:id", updateBlog);

module.exports = router;
