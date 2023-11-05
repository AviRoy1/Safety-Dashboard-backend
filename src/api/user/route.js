const router = require("express").Router();
const {
  addUser,
  login,
  changePassword,
  changeRole,
  fetchAllUser,
} = require("./controller");
const { isAuthenticated } = require("../../middlewares/auth");

router.post("/add-user", addUser);
router.post("/login", login);
router.get("/all-user", isAuthenticated, fetchAllUser);
router.post("/change-password", isAuthenticated, changePassword);
router.post("/change-role", isAuthenticated, changeRole);

module.exports = router;
