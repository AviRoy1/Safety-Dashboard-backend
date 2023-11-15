const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const LocationModel = mongoose.model("location", LocationSchema);

module.exports = LocationModel;
