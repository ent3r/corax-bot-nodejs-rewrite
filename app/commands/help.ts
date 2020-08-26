import { Client, Message } from "discord.js";
import Command from "../typings/Command";

const help = (client: Client, message: Message, args: Array<string>): void => {
  return;
};

module.exports = new Command({ name: "help", aliases: ["info"] }, help);
