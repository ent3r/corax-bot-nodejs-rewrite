import { Client, Message } from "discord.js";
import Command from "../typings/Command";

const help = (client: Client, message: Message, args: Array<string>): void => {
  const helpPage = client.helpPages.get(args[0].toLowerCase());

  if (!helpPage && args[0].toLowerCase()) {
    message.channel.send("Could not find a help page for that category");
  } else if (!helpPage && !args[0].toLowerCase()) {
    message.channel.send(client.helpPages.get("all"));
  } else {
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
