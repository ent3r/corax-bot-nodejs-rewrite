//? Loading dependencies
import { resolve } from "path";
import * as dotenv from "dotenv";

//? Using dotenv to get .env file variables while in developer mode
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    // This is set to development.env instead of ../development.env because
    // it uses the root folder as a base, not the folder the file resides in
    path: resolve("development.env"),
  });
}

//? Loading discord.js related dependencies
import { Client } from "discord.js";
import { loadCommands, setCooldowns } from "./util";
import { message, guildCreate } from "./events/index";

//? Setup services and connections. In this case just mongodb
require("./handlers/mongodb");

//? Create the client, and disable the option for it to mention @everyone
const client = new Client({
  disableMentions: "everyone",
});

//? Load all the commands in use by the bot, and add them to a collection managing delays and cooldowns
loadCommands(resolve(__dirname, "commands"))
  .then((commands) => {
    client.commands = commands;
    setCooldowns(client);
  })
  .catch((err) => console.error(err));

//? Makes sure a document with server settings gets created when the bot joins a new server
client.on("guildCreate", (guild) => {
  guildCreate(client, guild);
});

//? Handle the message event in its own file
client.on("message", (msg) => {
  message(client, msg);
});

//? When the bot is ready and logged in, console.log it
client.once("ready", () => {
  console.log(`Bot logged in as ${client.user.tag} (${client.user.id})`);
});

//? Login the bot using process.env
client.login(process.env.DISCORD_TOKEN);
