const router = require("express").Router();
const { gmr } = require("./api/report/meeting-controller");
const { mail } = require("./api/report/sendMail-controller");

// user APIs
router.use("/user", require("./api/user/route"));
router.use("/client", require("./api/client/route"));
router.use("/report", require("./api/report/route"));
router.use("/notification", require("./api/notification/router"));
router.use("/meet", gmr);
router.use("/mail", mail);

module.exports = router;
