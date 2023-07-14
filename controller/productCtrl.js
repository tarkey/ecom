const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const allproducts = await Product.find();
    res.json(allproducts);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createProduct, getaProduct, getAllProducts };
