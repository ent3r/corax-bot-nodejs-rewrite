// eslint-disable-next-line
const { Client, Message } = require("discord.js");

//? Make sure we have the model used to store server settings
const configModel = require("../models/serversettings");

//? We need the parser in order to parse incoming messages
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
    //? Try to find the server config in the database
    let serverConfig = await configModel.findOne({
      server_id: message.guild.id,
    });

    //? But if it couldn't be found
    if (!serverConfig) {
      //? Make a new one
      serverConfig = new configModel({
        server_id: message.guild.id,
      });

      //? And add it to the database
      serverConfig.save((err) => {
        console.log(err);
      });
    }

    //? Then get the prefix, using cb; as a default if it couldn't be found
    const prefix = serverConfig.prefix || "cb;";

    //? Parse the message
    const parsed = parser.parse(message, prefix);

    //? If there was an error after parsing it
    if (parsed.error) {
      //? Log it and then return
      console.log(parsed.error);
      return;
    }

    //? If the comand doesn't exist, return
    if (!client.commands.has(parsed.command)) return;

    //? Get the command
    const command = client.commands.get(parsed.command);

    //? Use a try catch block in case something happens
    try {
      //? Run the command
      command.run(client, message, parsed.arguments);
    } catch {
      (err) => console.warn(err);
    }
  },
};
