const router = require("express").Router();
const {
  addReport,
  addComment,
  findAllReports,
  editReport,
  findReports,
  fetchAllTags,
  fetchAllStatus,
  fetchAllLocatios,
  fetchAllViolationTyps,
  downloadReports,
} = require(`./constroller`);
const { isAuthenticated } = require("../../middlewares/auth");

router.post("/add-report", addReport);
router.get("/allreports", findAllReports);
router.post("/editreport", editReport);
router.post("/addComment", addComment);
router.post("/find-reports", findReports);
router.get("/locations", fetchAllLocatios);
router.get("/tags", fetchAllTags);
router.get("/status", fetchAllStatus);
router.get("/violationtypes", fetchAllViolationTyps);
router.get("/violationtypes", fetchAllViolationTyps);
router.get("/download-pdf", downloadReports);

// router.post("/add-comment", addComment);

module.exports = router;
