import { Client, Message } from "discord.js";
import { ICommand } from "./Command";

//? Idk how this works, but it does work. It adds commands and cooldowns to the client, without removing anything else
declare module "discord.js" {
  export interface Client {
    commands: Collection<string, ICommand>;
    cooldowns: Collection<string, Collection<string, number>>;
  }
}

//? How the arguments for a command looks
interface IArguments {
  name: string;
  required: boolean;
}

//? The interface that handles everything that has to do with command config shit. Like name, aliases, etc
export interface CommandOptions {
  name: string;
  aliases?: string[] | undefined[];
  disabled?: boolean;
  guildOnly?: boolean;
  cooldown?: number;
  help?: {
    description: string;
    category?: string;
    arguments?: Array<IArguments>;
    usage: string;
  };
}

//? How the function that is used for all commands look. This includes variables and return value
export type CommandFunction = (
  client: Client,
  message: Message,
  args: string[]
) => any | Promise<any>;
