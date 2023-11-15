const mongoose = require("mongoose");

const VaolationSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const ViolationModel = mongoose.model("violationType", VaolationSchema);

module.exports = ViolationModel;
