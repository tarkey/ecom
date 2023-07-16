const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateDbId = require("../utils/validatemongoDbId");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newblog = await Blog.create(req.body);
    res.json(newblog);
  } catch (error) {
    throw new Error(error);
  }
});
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});
const getaBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const getallBlogs = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find();
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateDbId(blogId);
  try {
    const blog = await Blog.findById(blogId);
    const loginuserId = req?.user?.id;
    const isLiked = blog?.isLiked;
    const alreadyDiskliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginuserId.toString()
    );
    if (alreadyDiskliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginuserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginuserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginuserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});
const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateDbId(blogId);
  try {
    const blog = await Blog.findById(blogId);
    const loginuserId = req?.user?.id;
    const isDisLiked = blog?.isDisliked;
    const alreadyliked = blog?.likes?.find(
      (userId) => userId?.toString() === loginuserId.toString()
    );
    if (alreadyliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginuserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginuserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginuserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getaBlog,
  getallBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
};
