import { Client, Message } from "discord.js";
import Command, { ICommand } from "./Command";
import CommandGroup from "./CommandGroup";
import { Collection } from "discord.js";

// Idk how this works, but it does work. It adds commands and cooldowns to the client, without removing anything else
declare module "discord.js" {
  export interface Client {
    commands: Collection<string, ICommand>;
    commandGroups: Array<CommandGroup>;

    helpPages: Collection<string, MessageEmbed>;

    cooldowns: Collection<string, Collection<string, number>>;
  }
}

// How the arguments for a command looks
interface IArguments {
  name: string;
  description: string;
  required: boolean;
}

// The interface that handles everything that has to do with command config shit. Like name, aliases, etc
export interface CommandOptions {
  name: string;
  aliases?: string[] | undefined[];
  disabled?: boolean;
  guildOnly?: boolean;
  cooldown?: number;
  subcommands?: Collection<string, Command>;
  help: {
    description: string;
    category?: string;
    arguments?: Array<IArguments>;
    usage: string;
  };
}

// How the function that is used for all commands look. This includes variables and return value
export type CommandFunction = (
  client: Client,
  message: Message,
  args: string[]
) => any | Promise<any>;

export interface CommandGroupHelp {
  name: string;
  description: string;
}
