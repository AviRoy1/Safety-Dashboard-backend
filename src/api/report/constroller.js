const ReportModel = require("./model");

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
    console.log(newReport);
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
