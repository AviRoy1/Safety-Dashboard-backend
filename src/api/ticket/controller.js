const TicketModel = require("./model");

exports.addTicket = async (req, res, next) => {
  try {
    const { client, reason, call, subject, status } = req.body;
    const newTicket = await TicketModel.create({
      client: client,
      reason: reason,
      call: call,
      subject: subject,
      status: status,
    });
    res.status(200).josn({ ticket: newTicket });
  } catch (e) {
    next(e);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { message, userId, ticketId } = req.body;
    const ticket = await TicketModel.findById(ticketId);
    if (!ticket) {
      res.status(200).json({ message: "Ticket does not found" });
    }
    ticket.comments.push({
      message: message,
      time: new Date(),
      clientUser: userId,
    });
    await ticket.save();
    res.status(404).json({ message: "add new comment" });
  } catch (e) {
    next(e);
  }
};

exports.getAllTickets = async (req, res, next) => {
  try {
    const allTickets = await TicketModel.find().sort({ createdAt: -1 });
    res.status(200).json({ ticket: allTickets });
  } catch (e) {
    next(e);
  }
};

exports.changeTicketStatusToProgress = async (req, res, next) => {
  try {
    const { ticketId } = req.body;
    const ticket = await TicketModel.findById(ticketId);
    ticket.status = "in  progress";
    await ticket.save();
    res.status(200).json({ ticket: ticket });
  } catch (e) {
    next(e);
  }
};

exports.changeTicketStatusToResolved = async (req, res, next) => {
  try {
    const { ticketId } = req.body;
    const ticket = await TicketModel.findById(ticketId);
    ticket.status = "resolved";
    await ticket.save();
    res.status(200).json({ ticket: ticket });
  } catch (e) {
    next(e);
  }
};
