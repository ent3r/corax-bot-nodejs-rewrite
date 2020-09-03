import { Client, Message } from "discord.js";
import Command from "../typings/Command";
import { getCommand } from "../util";
import { CommandFunction } from "../typings";

const help: CommandFunction = (
  client: Client,
  message: Message,
  args: string[]
): void => {
  if (!args[0]) {
    message.channel.send(client.helpPages.get("__default__"));
  } else {
    const command = getCommand(client.commands, args[0].toLowerCase());
    if (!command) {
      message.channel.send("Could not find a help page for that command.");
      return;
    }
    const helpPage = client.helpPages.get(command.config.name);

    message.channel.send(helpPage);
  }
};

module.exports = new Command(
  {
    name: "help",
    aliases: ["info"],
    help: {
      description: "Prints out help pages",
      usage: "[group]",
      arguments: [
        {
          name: "command",
          description: "A command to view help on.",
          required: false,
        },
      ],
    },
  },
  help
);
