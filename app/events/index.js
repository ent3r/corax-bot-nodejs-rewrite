//? Require the two events, and then module.exports them. This is to make it easier to import only the needed functions
const guildCreate = require("./guildCreate");
const { onMessage } = require("./message");

module.exports = {
  guildCreate: guildCreate,
  message: onMessage,
};
