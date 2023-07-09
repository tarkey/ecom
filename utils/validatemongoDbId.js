const mongoose = require("mongoose");
const validateDbId = (id) => {
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    throw new Error("Not a valid id");
  }
};

module.exports = validateDbId;
