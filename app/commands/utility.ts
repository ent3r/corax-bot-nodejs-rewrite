import CommandGroup from "../typings/CommandGroup";
import Command from "../typings/Command";

import { Client, Message } from "discord.js";

const commands = new CommandGroup([
  new Command(
    {
      name: "reverse",
      help: {
        description: "Reverses a given string",
        category: "Utility",
        usage: "<string>",
        arguments: [{ name: "input", required: true }],
      },
    },
    (client: Client, message: Message, args: Array<string>): void => {
      message.channel.send(args.join(" ").split("").reverse().join(""));
    }
  ),
]);

module.exports = commands;
