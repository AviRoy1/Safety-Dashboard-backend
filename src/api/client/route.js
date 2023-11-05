const router = require("express").Router();
const { isAuthenticated } = require("../../middlewares/auth");
const { addClient, addStackholder } = require("./controller");

router.post("/add-client", addClient);
router.post("/add-stockholder", addStackholder);

module.exports = router;
