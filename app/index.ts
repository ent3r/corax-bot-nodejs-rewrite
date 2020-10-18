//! Loading the logger all the way at the start so logging is ready at the beginning
import logger from "./handlers/logging";
logger.warn(`Logging initialized. Bot starting. Date: ${new Date()}`);

logger.debug("Starting to load dependencies");
// Loading dependencies
import { resolve } from "path";
import * as dotenv from "dotenv";

// Using dotenv to get .env file variables while in developer mode
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    // This is set to development.env instead of ../development.env because
    // it uses the root folder as a base, not the folder the file resides in
    path: resolve("development.env"),
  });
  logger.info("Loaded dotenv file");
}

// Loading discord.js related dependencies
import { Client } from "discord.js";
import { message, guildCreate } from "./events/index";
import disconnect from "./handlers/disconnect";

import guildDelete from "./events/guildDelete";
import loader from "./loader";
logger.debug("Dependencies loaded");

// Create the client, and disable the option for it to mention @everyone
const client = new Client({
  disableMentions: "everyone",
});
logger.debug("Created Client");

// Makes sure a document with server settings gets created when the bot joins a new server
client.on("guildCreate", (guild) => {
  guildCreate(client, guild);
});

client.on("guildDelete", (guild) => {
  guildDelete(client, guild);
});

// Handle the message event in its own file
client.on("message", (msg) => {
  message(client, msg);
});

// When the bot is ready and logged in, logger.info it
client.once("ready", () => {
  logger.info(`Bot logged in as ${client.user.tag} (${client.user.id})`);
});

// Handle closing signals
process.once("SIGTERM", (signal) => {
  disconnect(signal, client);
});

process.once("SIGINT", (signal) => {
  disconnect(signal, client);
});

// Load all everyting in use by the bot
loader(client)
  .then(_ => client.login(process.env.DISCORD_TOKEN))
  .catch((err) => {
    throw err;
    process.exit(1);
  });
