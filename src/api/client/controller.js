const { default: mongoose } = require("mongoose");
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
    const client = await ClientModel.findById(
      mongoose.Types.ObjectId(clientId)
    );
    if (!client) {
      res.status(404).json({ message: "No such client found !" });
    }
    client.stackHolders.push(newUser._id);
    console.log(client);
    await client.save();
    res.send("Add user successfully !");
  } catch (e) {
    next(e);
  }
};
