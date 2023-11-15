const LocationModel = require("./location");
const ReportModel = require("./model");
const StatusModel = require("./statusModel");
const TagModel = require("./tagModel");
const ViolationModel = require("./violationTypeModel");

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
    console.log(req.body);
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
    console.log(req.body);
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
    console.log(req.body);
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
    const { curLocation, curStatus, curTag, curViolation } = req.body;
    console.log(req.body);
    let matchQuery = {};
    if (curLocation !== null) {
      matchQuery["location"] = curLocation.label;
    }
    if (curStatus !== null) {
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
