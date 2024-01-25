const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const mail = require("express").Router();

const CLIENT_ID =
  "406430181104-6gs5fpvocscoie2juea1mui7t26pkcmu.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04RGjZ6SwBjx5CgYIARAAGAQSNwF-L9IrzzfJTFj3ouLVvoXvjptXd-InDHZXxTQQsh1UrRyNycjYn2zbIK0YvXVZHb8-pXHbOmw";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

mail.post("/send", async (req, res, next) => {
  try {
    const { user, subject, body } = req.body;

    const accessToken = await oauth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ravijit512@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "NODE <ravijit512@gmail.com>",
      to: user,
      subject: subject,
      text: body,
    };

    const result = await transport.sendMail(mailOptions);
    res.send({ msg: "DONE!!" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = { mail };
