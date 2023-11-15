const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const StatusModel = mongoose.model("status", statusSchema);

module.exports = StatusModel;
