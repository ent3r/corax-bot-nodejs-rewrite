const { resolve } = require("path");
const dotenv = require("dotenv");

const { Client } = require("discord.js");
const { loadCommands } = require("./util");

const { onMessage } = require("./events/message");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    // This is set to development.env instead of ../development.env because
    // it uses the root folder as a base, not the folder the file resides in
    path: resolve("development.env"),
  });
}

// Setup services and connections. In this case just mongodb
require("./handlers/mongodb");

const client = new Client({
  disableMentions: "everyone",
});

client.prefix = "cb;";

//? Load all the commands in use by the bot
client.commands = loadCommands(resolve(__dirname, "commands"));

client.on("message", (message) => {
  onMessage(client, message);
});

client.once("ready", () => {
  console.log(`Bot logged in as ${client.user.tag} (${client.user.id})`);
});

client.login(process.env.DISCORD_TOKEN);
