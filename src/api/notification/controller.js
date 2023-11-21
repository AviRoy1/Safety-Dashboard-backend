const NotificationModel = require("./model");

exports.markAllSeen = async (req, res, next) => {
  try {
    const allNotifications = await NotificationModel.find({ status: "unseen" });
    for (let i = 0; i < allNotifications.length; i++) {
      let curNoti = allNotifications[i];
      curNoti.status = "seen";
      await curNoti.save();
    }
    res.status(200).josn({ message: "Done!!" });
  } catch (e) {
    next(e);
  }
};

exports.fetchUnseenNoti = async (req, res, next) => {
  try {
    const allNotifications = await NotificationModel.find({ status: "unseen" });

    res.status(200).josn({ notification: allNotifications });
  } catch (e) {
    next(e);
  }
};
