const { resolve } = require("path");
const dotenv = require("dotenv");

const { Client } = require("discord.js");
const parser = require("discord-command-parser");

const { loadCommands } = require("./util");

const prefix = "cb;";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    // This is set to development.env instead of ../development.env because
    // it uses the root folder as a base, not the folder the file resides in
    path: resolve("development.env"),
  });
}

const client = new Client({
  disableMentions: "everyone",
});

//? Load all the commands in use by the bot
client.commands = loadCommands(resolve(__dirname, "commands"));

client.on("message", (message) => {
  const parsed = parser.parse(message, prefix);
  if (parsed.error) {
    console.log(parsed.error);
    return;
  }
  const command = client.commands.get(parsed.command);
  if (!command) return;
  command.run(client, message, parsed.arguments);
});

client.once("ready", () => {
  console.log(`Bot logged in as ${client.user.tag} (${client.user.id})`);
});

client.login(process.env.DISCORD_TOKEN);
