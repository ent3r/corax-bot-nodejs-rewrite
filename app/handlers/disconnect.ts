import { Client } from "discord.js";
import * as mongoose from "mongoose";
import logger from "./logging";
import { cache } from "./cache";

// Export the function that will be ran when we get a shutdown signal. This includes:
// - Logging out of discord
// - Disconnecting from MongoDB
export default function disconnect(
  signal: NodeJS.Signals,
  client: Client
): void {
  logger.warn(`Recieved ${signal}! Closing connections... `);
  try {
    // Log out from discord, and close the bot
    client.destroy();
    logger.info("Discord.js disconnected... ");
    // Close the connections to the database
    mongoose.disconnect();

    cache.flushAll();
    cache.close();
    logger.info("Cache flushed and closed");
  } catch (err) {
    // Oops, something happened. Just exit
    logger.error(`An error occured while closing.\n${err}`);
    process.exit(1);
  }
  // Everything worked cleanly, exit with code 0
  logger.warn("Everything closed successfully. Exiting with code 0");
  process.exit(0);
}
