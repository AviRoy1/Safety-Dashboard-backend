const gmr = require("express").Router();
const { google } = require("googleapis");
const dayjs = require("dayjs");
const { v4: uuid } = require("uuid");
const { OAuth2Client } = require("google-auth-library");
let CLIENT_ID =
    "406430181104-vmkv3e7e1gfsefhej5dri3hdiben2f14.apps.googleusercontent.com",
  CLIENT_SECRET = "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";

const dotenv = require("dotenv");
const { updateString, getTokenString } = require("./gmailToken-controller");
dotenv.config();

const REDIRECT_URL = `http://localhost:8100/api/v1/meet/google/redirect`;

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const scopes = ["https://www.googleapis.com/auth/calendar"];

gmr.get("/authorize", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
  res.redirect(authUrl);
});

gmr.get("/google/redirect", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    await updateString(JSON.stringify(tokens));

    res.send("Authorization completed.");
  } catch (error) {
    console.error("Error during token exchange:", error);
    res.send("Error");
  }
});

async function refreshAccessToken() {
  try {
    const tokenJ = await getTokenString();
    const tokens = JSON.parse(tokenJ.toObject().tokenString);
    oauth2Client.setCredentials(tokens);
    const refreshedTokens = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(refreshedTokens.credentials);
    const newTokens = oauth2Client.credentials;
    console.log("Token Refreshed");
    // Save the refreshed tokens to the token file
    await updateString(JSON.stringify(newTokens));
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

gmr.post("/schedule-meeting", async (req, res) => {
  const { user, startDate, startTime, endDate, endTime } = req.body;
  try {
    const tokenJ = await getTokenString();
    const tokens = JSON.parse(tokenJ.toObject().tokenString);
    const expirationTime = tokens.expiry_date;
    console.log(expirationTime);
    // if (expirationTime <= Date.now()) {
    console.log("running");
    await refreshAccessToken();
    // }

    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });
    await calendar.events.insert({
      calendarId: "primary",
      auth: oauth2Client,
      conferenceDataVersion: 1,
      requestBody: {
        summary: "Scheduled Meeting",
        location: "Online",
        creator: "Avijit",
        start: {
          dateTime: dayjs(new Date(`${startDate}T${startTime}`)).toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: dayjs(new Date(`${endDate}T${endTime}`)).toISOString(),
          timeZone: "Asia/Kolkata",
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: user,
      },
    });

    res.send({
      msg: "Meeting scheduled successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { gmr };
