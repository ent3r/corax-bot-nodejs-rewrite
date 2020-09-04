import { Client } from "discord.js";
import * as mongoose from "mongoose";

// Export the function that will be ran when we get a shutdown signal. This includes:
// - Logging out of discord
// - Disconnecting from MongoDB
export default function disconnect(
  signal: NodeJS.Signals,
  client: Client
): void {
  process.stdout.write("Recieved SIGTERM signal! Closing connections... ");
  try {
    // Log out from discord, and close the bot
    client.destroy();
    process.stdout.write("Discord.js disconnected... ");
    // Close the connections to the database
    mongoose.disconnect();
    process.stdout.write("Mongoose disconnected... ");
  } catch {
    // Oops, something happened. Just exit
    process.stdout.write("ERROR! EXITING!");
    process.exit(1);
  }
  // Everything worked cleanly, exit with code 0
  process.stdout.write("Everything closed successfully. Closing process");
  process.exit(0);
}
