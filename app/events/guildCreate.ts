//? Require the model used for server settings
import configModel from "../models/serversettings";

import { Client, Guild } from "discord.js";

const guildCreate = (client: Client, guild: Guild): void => {
  //? Make a new server config
  const serverConfig = new configModel({
    server_id: guild.id,
  });

  //? And save it to the database
  serverConfig.save((err) => {
    console.log(err);
  });
};

//? Export a function
export default guildCreate;
