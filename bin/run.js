"use strict";
const slackClient = require("../server/slackClient");
const service = require("../server/service");
const http = require("http");

const server = http.createServer(service);

const token  = "xoxb-306510887395-fJ0N1Q5d48Pnx5kbPJpMCU1f";
const logLevel = "verbose";
const rtm = slackClient.init(token, logLevel);
rtm.start();
slackClient.addAuthenticatedHandler(rtm, () => {
    server.listen(4090)
})
//server.listen(4090);

server.on("listening", function() {
  console.log(
    `SLAC BOT IS LISTENING ON ${server.address().port} in ${service.get(
      "env"
    )} mode.`
  );
});
