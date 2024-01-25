const GmailToken = require("./gmailToken");

exports.getTokenString = async () => {
  const result = await GmailToken.findOne({ id: 1 });
  return result;
};
exports.updateString = async (tokenString) => {
  const result = await GmailToken.findOneAndUpdate(
    { id: 1 },
    { $set: { tokenString } },
    { new: true, upsert: true }
  );
  console.log(result);
  return result;
};
