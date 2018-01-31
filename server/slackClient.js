"use strict";

const RtmClient = require("@slack/client").RtmClient;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS;
const RTM_EVENTS = require("@slack/client").RTM_EVENTS;
let rtm = null;

function handleAuthentication(rtmStartData) {
  console.log(
    `Logged in as ${rtmStartData.self.name} of team ${
      rtmStartData.team.name
    }, but not yet connected to a channel`
  );
}

function handleMessage(message) {
    console.log(message);
    rtm.sendMessage("This is a test message", "D8ZU7QG2U", function messageSent() {
        // optional callback 
    })
}

function addAuthenticatedHandler(rtm, handler) {
   rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel) {
   rtm = new RtmClient(token, { logLevel: logLevel });
  addAuthenticatedHandler(rtm, handleAuthentication);
  rtm.on(RTM_EVENTS.MESSAGE, handleMessage)
  return rtm;
};

module.exports.addAuthenticatedHandler = addAuthenticatedHandler
