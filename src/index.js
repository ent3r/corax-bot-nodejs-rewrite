const { resolve } = require("path");
const dotenv = require("dotenv");

const { Client } = require("discord.js");

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

client.once("ready", () => {
  console.log(`Bot logged in as ${client.user.tag} (${client.user.id})`);
});

client.login(process.env.DISCORD_TOKEN);
