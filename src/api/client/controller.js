const UserModel = require("../user/model");
const ClientModel = require("./model");

exports.addClient = async (req, res, next) => {
  try {
    const { clientName, projectTime, backupTime } = req.body;
    const newClient = await ClientModel.create({
      clientName: clientName,
      projectTime: projectTime,
      backupTime: backupTime,
    });
    res.send("Add New Client successfully !");
  } catch (e) {
    next(e);
  }
};

exports.addStackholder = async (req, res, next) => {
  try {
    const { clientId, username, password } = req.body;
    const newUser = await UserModel.create({
      client: clientId,
      username: username,
      password: password,
    });
    const client = await ClientModel.findById(clientId);
    client.stackHolders.push(newUser._id);
    await client.save();
    res.send("Add successfully !");
  } catch (e) {
    next(e);
  }
};
