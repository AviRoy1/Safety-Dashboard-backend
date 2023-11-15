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

// router.post("/add-comment", addComment);

module.exports = router;
