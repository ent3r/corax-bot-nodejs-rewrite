const guildCreate = require("./guildCreate");
const { onMessage } = require("./message");

module.exports = {
  guildCreate: guildCreate,
  message: onMessage,
};
