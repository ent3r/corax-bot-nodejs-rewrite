// eslint-disable-next-line
const { Client, Message } = require("discord.js");

const parser = require("discord-command-parser");

module.exports = {
  /**
   *Handles an incoming message
   *
   * @param {Client} client the discord.js client
   * @param {Message} message the incoming message
   * @returns none
   */
  onMessage: (client, message) => {
    const parsed = parser.parse(message, client.prefix);
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
