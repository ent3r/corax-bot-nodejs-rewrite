import { Client, Message } from "discord.js";
import { ICommand } from "./Command";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, ICommand>;
    cooldowns: Collection<string, Collection<string, number>>;
  }
}

interface IArguments {
  name: string;
  required: boolean;
}

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

export type CommandFunction = (
  client: Client,
  message: Message,
  args: string[]
) => any | Promise<any>;
