const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const color = require("colors");
const dotenv = require("dotenv");
const appRoutes = require("./routes");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/DB");

dotenv.config();
const app = express();

// set security HTTP headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.use("/api/v1", appRoutes);

connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port - ${process.env.PORT}`.bgWhite.red);
});
