//? Import the model used for server settings
import configModel from "../models/serversettings";

//? Import Client and Guild to be used for typing
import { Client, Guild } from "discord.js";
import logger from "../handlers/logging";

const guildCreate = (client: Client, guild: Guild): void => {
  logger.info(`Joined new server: ${guild.name} (${guild.id})`);
  //? Make a new server config
  const serverConfig = new configModel({
    server_id: guild.id,
  });

  //? And save it to the database
  serverConfig.save((err) => {
    logger.warn(err);
  });
  logger.debug("Saved config to database");
};

//? Export the function
export default guildCreate;
