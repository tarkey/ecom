const { mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.DB_URL);
    console.log("Db connected sucessfully");
  } catch (error) {
    console.log("Db connection failed");
  }
};

module.exports = dbConnect;
