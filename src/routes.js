const router = require("express").Router();

//  user apis
router.use("/user", require("./api/user/route"));
router.use("/client", require("./api/client/route"));
router.use("/report", require("./api/report/route"));
router.use("/notification", require("./api/notification/router"));

module.exports = router;
