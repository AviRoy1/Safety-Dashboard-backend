const router = require("express").Router();
const { isAuthenticated } = require("../../middlewares/auth");
const { markAllSeen, fetchUnseenNoti } = require("./controller");

router.get("/unseen", fetchUnseenNoti);
router.put("/status", markAllSeen);

module.exports = router;
