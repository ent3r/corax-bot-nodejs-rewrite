import { Client, Message } from "discord.js";
import Command from "../typings/Command";

const help = (client: Client, message: Message, args: Array<string>): void => {
  if (!args[0]) {
    message.channel.send(client.helpPages.get("all"));
  } else {
    const helpPage = client.helpPages.get(args[0].toLowerCase());
    if (!helpPage) {
      message.channel.send("Could not find a help page for that category");
      return;
    }
    message.channel.send(helpPage);
  }
};

module.exports = new Command(
  {
    name: "help",
    aliases: ["info"],
    help: { description: "Prints out help pages", usage: "[ group ]" },
  },
  help
);
