const LocationModel = require("./location");
const ReportModel = require("./model");
const StatusModel = require("./statusModel");
const TagModel = require("./tagModel");
const ViolationModel = require("./violationTypeModel");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const ejs = require("ejs");

const readFileAsync = promisify(fs.readFile);

exports.addReport = async (req, res, next) => {
  try {
    const {
      clientId,
      camname,
      location,
      status,
      violationType,
      tags,
      imagepath,
      assigned,
    } = req.body;
    // console.log(req.body);
    const newReport = await ReportModel.create({
      client: clientId,
      camname: camname,
      location: location,
      violationType: violationType,
      tags: tags,
      status: status,
      imagepath: imagepath,
      assigned: assigned,
    });
    const isTagPresent = await TagModel.findOne({ name: tags });
    if (!isTagPresent) {
      await TagModel.create({ name: tags });
    }
    const isLocationPresent = await LocationModel.findOne({
      name: location,
    });
    if (!isLocationPresent) {
      await LocationModel.create({ name: location });
    }
    const isStatusPresent = await StatusModel.findOne({
      name: status,
    });
    if (!isStatusPresent) {
      await StatusModel.create({ name: status });
    }
    const isViolationPresent = await ViolationModel.findOne({
      name: violationType,
    });
    if (!isViolationPresent) {
      await ViolationModel.create({ name: violationType });
    }
    return res
      .status(200)
      .json({ reports: newReport, message: "Add successfully" });
  } catch (e) {
    next(e);
  }
};

exports.findAllReports = async (req, res, next) => {
  try {
    const allReports = await ReportModel.find({}).populate("client");
    return res.status(200).json({ reports: allReports });
  } catch (e) {
    next(e);
  }
};

exports.editReport = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { id, statusCurrent, tagCurrent, assignCurrent } = req.body;
    let curReport = await ReportModel.findById(id);
    if (statusCurrent) {
      curReport.status = statusCurrent.label;
    }
    if (tagCurrent) {
      curReport.tags = tagCurrent.label;
    }
    if (assignCurrent) {
      curReport.assigned = assignCurrent.label;
    }
    await curReport.save();
    const allReports = await ReportModel.find({}).populate("client");
    return res.status(200).json({ reports: allReports });
  } catch (e) {
    next(e);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { id, comment } = req.body;
    let curReport = await ReportModel.findById(id);
    curReport.comments.push({
      user: "User1",
      message: comment,
      time: new Date(),
    });
    await curReport.save();
    const allReports = await ReportModel.find({}).populate("client");
    return res.status(200).json({ reports: allReports });
  } catch (e) {
    next(e);
  }
};

exports.findReports = async (req, res, next) => {
  try {
    const { curLocation, curStatus, curTag, curViolation, startTime, endTime } =
      req.body;
    // console.log(req.body);
    let matchQuery = {};

    if (startTime && endTime) {
      matchQuery.createdAt = {
        $gte: new Date(startTime),
        $lte: new Date(endTime),
      };
    }
    if (curLocation !== null) {
      matchQuery["location"] = curLocation.label;
    }
    if (curStatus !== null) {
      // console.log(curStatus.label);
      matchQuery["status"] = curStatus.label;
    }
    if (curTag !== null) {
      matchQuery["tags"] = curTag.label;
    }
    if (curViolation !== null) {
      matchQuery["violationType"] = curViolation.label;
    }
    const allReports = await ReportModel.aggregate([
      {
        $match: matchQuery,
      },
    ]);
    return res.status(200).json({ reports: allReports });
  } catch (error) {
    next(error);
  }
};

exports.fetchAllTags = async (req, res, next) => {
  try {
    const allTags = await TagModel.find();
    return res.status(200).json({ tags: allTags });
  } catch (e) {
    next(e);
  }
};

exports.fetchAllStatus = async (req, res, next) => {
  try {
    const allStatus = await StatusModel.find();
    return res.status(200).json({ status: allStatus });
  } catch (e) {
    next(e);
  }
};

exports.fetchAllLocatios = async (req, res, next) => {
  try {
    const allLocations = await LocationModel.find();
    return res.status(200).json({ locations: allLocations });
  } catch (e) {
    next(e);
  }
};

exports.fetchAllViolationTyps = async (req, res, next) => {
  try {
    const allViolationTyps = await ViolationModel.find();
    return res.status(200).json({ violations: allViolationTyps });
  } catch (e) {
    next(e);
  }
};

exports.downloadReports = async (req, res, next) => {
  try {
    const {
      location,
      status,
      tag,
      violationType,
      startDate,
      endDate,
      startTime,
      endTime,
    } = req.query;

    // Date & time format - date= yyyy-mm-dd, time=hh:mm or hh:mm:ss
    const matchQuery = {};

    if (startDate && endDate && startTime && endTime) {
      const startDateTime = `${startDate}T${startTime}`;
      const endDateTime = `${endDate}T${endTime}`;

      matchQuery.createdAt = {
        $gte: new Date(startDateTime),
        $lte: new Date(endDateTime),
      };
    }

    if (location) matchQuery.location = location;
    if (status) matchQuery.status = status;
    if (tag) matchQuery.tags = tag;
    if (violationType) matchQuery.violationType = violationType;

    const reports = await ReportModel.aggregate([{ $match: matchQuery }]);

    const templatePath = path.join(
      __dirname,
      "templates",
      "report-template.ejs"
    );
    const templateContent = await readFileAsync(templatePath, "utf-8");
    const compiledTemplate = ejs.compile(templateContent)({ reports });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(compiledTemplate);

    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=reports.pdf");

    res.send(pdfBuffer);
  } catch (e) {
    next(e);
  }
};
