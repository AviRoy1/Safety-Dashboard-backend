const UserModel = require("./model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { sendToken } = require("../../utils/sendToken");

exports.addUser = async (req, res, next) => {
  try {
    const { username, password, client } = req.body;
    const olduser = await UserModel.findOne({ username: username });
    if (olduser) {
      res.send("user name already used !!");
    }

    const salt = await bcrypt.genSalt(10);
    const encyptPass = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      username: username,
      password: encyptPass,
    });
    res.send("Successfully add new user!!");
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username }).select(
      "+password"
    );
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // const comparePassword = await bcrypt.compare(password, user.password);
    // if (!comparePassword) {
    //   return res.status(401).json({ message: "Invalid username or password" });
    // }
    sendToken(res, user, `Welcome back, ${user.username}`, 200);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    if (!req.user) {
      res.send("You are not logged in");
    }
    const { password } = req.body;
    const user = req.user;
    if (!user) {
      res.send("No user found");
    }

    const salt = await bcrypt.genSalt(10);
    const encyptPass = await bcrypt.hash(password, salt);
    user.password = encyptPass;
    await user.save();

    res.send("Successfully change password !!");
  } catch (e) {
    next(e);
  }
};

exports.changeRole = async (req, res, next) => {
  try {
    const { id, role } = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
      res.send("User not found");
    }
    user.role = role;
    await user.save();
    res.send("Successfully change user role");
  } catch (e) {
    next(e);
  }
};

exports.fetchAllUser = async (req, res, next) => {
  try {
    const users = await UserModel.find({ status: "active" }).sort({
      createdAt: -1,
    });
    res.send(users);
  } catch (e) {
    next(e);
  }
};
