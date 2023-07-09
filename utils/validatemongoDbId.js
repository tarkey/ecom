const mongoose = require("mongoose");
const validateDbId = (req, res) => {
  const valid = mongoose.Types.ObjectId.isValid();
  if (!valid) {
    throw new Error("Not a valid id");
  }
};

module.exports = validateDbId;
