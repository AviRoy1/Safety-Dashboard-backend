const mongoose = require("mongoose");
const colors = require("colors");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb server issue ${error}`.bgRed.white);
  }
};
