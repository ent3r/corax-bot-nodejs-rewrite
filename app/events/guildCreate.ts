// Import the model used for server settings
import { ServerConfig } from "../models";

// Import Client and Guild to be used for typing
import { Client, Guild } from "discord.js";
import logger from "../handlers/logging";


/**
 *Does all the nessecary actions when the bot joins a guild
 *
 * @param {Client} client The discord client
 * @param {Guild} guild the guild that was joined
 */
const guildCreate = (client: Client, guild: Guild): void => {
  logger.info(`Joined new server: ${guild.name} (${guild.id})`);
  // Make a new server config
  const serverConfig = new ServerConfig({
    serverID: guild.id,
  });

  // And save it to the database
  serverConfig.save((err) => {
    logger.warn(err);
  });
  logger.debug("Saved config to database");
};

// Export the function
export default guildCreate;
