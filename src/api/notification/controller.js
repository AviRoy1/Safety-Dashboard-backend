const NotificationModel = require("./model");

exports.markAllSeen = async (req, res, next) => {
  try {
    const allNotifications = await NotificationModel.find({ status: "unseen" });
    for (let i = 0; i < allNotifications.length; i++) {
      let curNoti = allNotifications[i];
      curNoti.status = "seen";
      await curNoti.save();
    }
    return res.status(200).json({ message: "Done!!" });
  } catch (e) {
    next(e);
  }
};

exports.fetchUnseenNoti = async (req, res, next) => {
  try {
    const allNotifications = await NotificationModel.find({ status: "unseen" });

    return res.status(200).json({ notification: allNotifications });
  } catch (e) {
    next(e);
  }
};
