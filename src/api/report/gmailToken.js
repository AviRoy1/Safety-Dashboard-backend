const mongoose = require("mongoose");

const { Schema } = mongoose;

const GmailTokenSchema = new Schema(
  {
    id: Number,
    tokenString: String,
  },
  { timestamps: true }
);

const GmailTokenModel = mongoose.model("gmailtoken", GmailTokenSchema);

module.exports = GmailTokenModel;
