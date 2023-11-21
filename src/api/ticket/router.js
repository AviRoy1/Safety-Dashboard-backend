const router = require("express").Router();
const { isAuthenticated } = require("../../middlewares/auth");
const {
  addTicket,
  addComment,
  getAllTickets,
  changeTicketStatus,
} = require("./controller");

router.post("/add-ticket", addTicket);
router.post("/add-comment", addComment);
router.get("/tickets", getAllTickets);
router.put("/status", changeTicketStatus);

module.exports = router;
