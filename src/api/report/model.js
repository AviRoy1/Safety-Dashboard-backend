const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: "client",
    },
    camname: { type: String },
    location: { type: String },
    violationType: { type: String },
    tags: { type: String },
    assigned: { type: String },
    status: { type: String },
    videopath: { type: String },
    imagepath: { type: String },
    live: { type: String, enum: ["yes", "no"] },
    comments: [
      {
        // user: { type: mongoose.Types.ObjectId, ref: "user" },
        user: { type: String },
        message: { type: String },
        time: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const ReportModel = mongoose.model("report", reportSchema);

module.exports = ReportModel;
