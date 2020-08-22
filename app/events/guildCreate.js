//? Require the model used for server settings
const configModel = require("../models/serversettings");

//? Export a function
module.exports = (client, guild) => {
  //? Make a new server config
  const serverConfig = new configModel({
    server_id: guild.id,
  });

  //? And save it to the database
  serverConfig.save((err) => {
    console.log(err);
  });
};
