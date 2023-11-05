const jwt = require("jsonwebtoken");
const User = require("../api/user/model.js");
const dotenv = require("dotenv");

dotenv.config();

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Not Logged In", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = await User.findById(decoded._id);
    console.log(req.user);
    // console.log(req.user.name);
    next();
  } catch (e) {
    next(e);
  }
};
