const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const ticketSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: "client",
    },
    type: { type: String },
    message: { type: String },
    status: { type: String, enum: ["seen", "unseen"], default: "unseen" },
  },
  { timestamps: true }
);
const NotificationModel = mongoose.model("notification", ticketSchema);

module.exports = NotificationModel;
