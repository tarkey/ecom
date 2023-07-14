const express = require("express");
const { createProduct, getaProduct } = require("../controller/productCtrl");
const router = express.Router();
router.post("/", createProduct);
router.post("/:id", getaProduct);
module.exports = router;
