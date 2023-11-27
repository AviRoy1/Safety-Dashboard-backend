const router = require("express").Router();
const { isAuthenticated } = require("../../middlewares/auth");
const {
  addTicket,
  addComment,
  getAllTickets,
  changeTicketStatusToProgress,
  changeTicketStatusToResolved,
} = require("./controller");

router.post("/add-ticket", addTicket);
router.post("/add-comment", addComment);
router.get("/tickets", getAllTickets);
router.put("/status/in-progress", changeTicketStatusToProgress);
router.put("/status/resolved", changeTicketStatusToResolved);

module.exports = router;
