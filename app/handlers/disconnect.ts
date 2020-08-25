import { Client } from "discord.js";
import { configAndCacheDB, ctfDB } from "./mongodb";
import * as mongoose from "mongoose";

export default function disconnect(
  signal: NodeJS.Signals,
  client: Client
): void {
  process.stdout.write("Recieved SIGTERM signal! Closing connections... ");
  try {
    client.destroy();
    process.stdout.write("Discord.js disconnected... ");
    configAndCacheDB.close();
    ctfDB.close();
    mongoose.disconnect();
    process.stdout.write("Mongoose disconnected... ");
  } catch {
    process.stdout.write("ERROR! EXITING!");
    process.exit(1);
  }
  process.stdout.write("Everything closed successfully. Closing process");
  process.exit(0);
}
