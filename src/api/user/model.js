const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    type: {
      type: String,
      enum: ["internal", "customer"],
    },
    client: {
      type: mongoose.Types.ObjectId,
      ref: "client",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: [
        "support",
        "developer",
        "admin",
        "superuser",
        "supervisor",
        "superuser",
      ],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });
};

userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
