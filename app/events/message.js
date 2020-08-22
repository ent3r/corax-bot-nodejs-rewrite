// eslint-disable-next-line
const { Client, Message } = require("discord.js");

const configModel = require("../models/serversettings");

const parser = require("discord-command-parser");

module.exports = {
  /**
   *Handles an incoming message
   *
   * @param {Client} client the discord.js client
   * @param {Message} message the incoming message
   * @returns none
   */
  onMessage: async (client, message) => {
    let serverConfig = await configModel.findOne({
      server_id: message.guild.id,
    });

    if (!serverConfig) {
      serverConfig = new configModel({
        server_id: message.guild.id,
      });
      serverConfig.save((err) => {
        console.log(err);
      });
    }

    const prefix = serverConfig.prefix || "cb;";

    const parsed = parser.parse(message, prefix);
    if (parsed.error) {
      console.log(parsed.error);
      return;
    }

    if (!client.commands.has(parsed.command)) return;

    const command = client.commands.get(parsed.command);
    try {
      command.run(client, message, parsed.arguments);
    } catch {
      (err) => console.warn(err);
    }
  },
};
