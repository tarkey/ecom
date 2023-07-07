const { mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("Db connected sucessfully");
  } catch (error) {
    console.log("Db connection failed", error);
  }
};

module.exports = dbConnect;
