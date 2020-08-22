const configModel = require("../models/serversettings");

module.exports = (client, guild) => {
  const serverConfig = new configModel({
    server_id: guild.id,
  });
  serverConfig.save((err) => {
    console.log(err);
  });
};
