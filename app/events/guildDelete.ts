// Import the model used for server settings
import { ServerConfig } from "../models";

// Import Client and Guild to be used for typing
import { Client, Guild } from "discord.js";
import logger from "../handlers/logging";

/**
 *Does all the nessecary actions when the bot is removed from a guild
 *
 * @param {Client} client The discord client
 * @param {Guild} guild the guild that was joined
 */
const guildDelete = async (client: Client, guild: Guild): Promise<void> => {
  logger.info(`Left server: ${guild.name} (${guild.id})`);

  try {
    await ServerConfig.deleteOne({ serverID: guild.id });
  } catch {
    (err) => {
      logger.warn(err);
    };
  }
};

// Export the function
export default guildDelete;
