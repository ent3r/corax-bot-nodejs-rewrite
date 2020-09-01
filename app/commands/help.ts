import { Client, Message } from "discord.js";
import Command from "../typings/Command";

const help = (client: Client, message: Message, args: Array<string>): void => {
  if (!args[0]) {
    message.channel.send(client.helpPages.get("__default__"));
  } else {
    const helpPage = client.helpPages.get(args[0].toLowerCase());
    if (!helpPage) {
      message.channel.send(
        "Could not find a help page for that command.\n**Tip:** Commands use their full names for help pages, not aliases. Run `help` in order to see all commands"
      );
      return;
    }
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
