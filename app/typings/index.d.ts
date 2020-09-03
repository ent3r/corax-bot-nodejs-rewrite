import { Client, Message } from "discord.js";
import CommandGroup from "./CommandGroup";
import { Collection } from "discord.js";
import Subcommand from "./Subcommand";
import Command from "./Command";

// Idk how this works, but it does work. It adds commands and cooldowns to the client, without removing anything else
declare module "discord.js" {
  export interface Client {
    commands: Collection<string, ICommand>;
    commandGroups: CommandGroup[];

    helpPages: Collection<string, MessageEmbed>;

    cooldowns: Collection<string, Collection<string, number>>;
  }
}

// How the arguments for a command looks
export interface CommandArguments {
  name: string;
  description: string;
  required: boolean;
}

// How the function that is used for all commands look. This includes variables and return value
export type CommandFunction = (
  client: Client,
  message: Message,
  args: string[]
) => any | Promise<any>;

// #region Base command stuff

export interface BaseCommandHelp {
  description: string;
  usage: string;
}

export interface BaseCommandOptions {
  name: string;
  disabled?: boolean;
  guildOnly?: boolean;
  help: BaseCommandHelp;
}

// #endregion

// #region Normal command

interface CommandHelp extends BaseCommandHelp {
  arguments?: CommandArguments[];
  category?: string;
}

// The interface that handles everything that has to do with command config shit. Like name, aliases, etc
export interface CommandOptions extends BaseCommandOptions {
  aliases?: string[];
  cooldown?: number;
  subcommands?: Collection<string, Subcommand>;
  help: CommandHelp;
}

// The interface that is used for typing and stuff in the code
export interface ICommand {
  config: CommandOptions;
  run: CommandFunction;
}

// #endregion

// #region Subcommand

export interface SubcommandOptions extends BaseCommandOptions {
  hidden: boolean;
}

export interface ISubcommand {
  config: BaseCommandOptions;
  run: CommandFunction;
}

// #endregion

// #region CommandGroup

export interface CommandGroupHelp {
  name: string;
  description: string;
}

export interface ICommandGroup {
  help: CommandGroupHelp;
  commands: Command[];
}

// #endregion
