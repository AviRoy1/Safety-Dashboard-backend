const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    clientName: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    projectTime: { Number },
    backupTime: { Number },
    stackHolders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    alert: {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      phoneNumber: { String },
      email: { String },
    },
    configuration: {
      // aimodel: {
      //   weightspath: { String },
      //   confidence: { String },
      // },
      camerasettings: {
        camname: { String },
        camip: { String },
        location: { String },
        status: { String },
        roi: [
          {
            bbox1: { String },
            rules1: { String },
          },
        ],
        whatsapp: { Boolean },
        email: { Boolean },
      },
    },
  },
  { timestamps: true }
);

const ClientModel = mongoose.model("client", clientSchema);

module.exports = ClientModel;
