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
    reason: { type: String },
    call: { type: String },
    file: {
      filename: { type: String },
      url: { type: String },
    },
    subject: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    comments: [
      {
        message: { type: String },
        time: { type: Date },
        clientUser: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
  },
  { timestamps: true }
);
const TicketModel = mongoose.model("ticket", ticketSchema);

module.exports = TicketModel;
