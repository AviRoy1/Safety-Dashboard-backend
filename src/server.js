const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const color = require("colors");
const dotenv = require("dotenv");
const appRoutes = require("./routes");
const cookieParser = require("cookie-parser");
// const { fetchAllStatus } = require("./api/report/constroller");

const { connectDB } = require("./config/DB");
const ReportModel = require("./api/report/model");
const TagModel = require("./api/report/tagModel");
const LocationModel = require("./api/report/location");
const StatusModel = require("./api/report/statusModel");
const ViolationModel = require("./api/report/violationTypeModel");

dotenv.config();
const app = express();

// set security HTTP headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// async function fetchAllStatus() {
//   try {
//     const allReports = await ReportModel.find();
//     for (let i = 0; i < allReports.length; i++) {
//       let curReport = allReports[i];

//       const isTagPresent = await TagModel.findOne({
//         name: curReport.tags,
//       });
//       if (!isTagPresent) {
//         await TagModel.create({ name: curReport.tags });
//       }
//       const isLocationPresent = await LocationModel.findOne({
//         name: curReport.location,
//       });
//       if (!isLocationPresent) {
//         await LocationModel.create({ name: curReport.location });
//       }
//       const isStatusPresent = await StatusModel.findOne({
//         name: curReport.status,
//       });
//       if (!isStatusPresent) {
//         await StatusModel.create({ name: curReport.status });
//       }
//       const isViolationPresent = await ViolationModel.findOne({
//         name: curReport.violationType,
//       });
//       if (!isViolationPresent) {
//         await ViolationModel.create({
//           name: curReport.violationType,
//         });
//       }
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// fetchAllStatus();

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
