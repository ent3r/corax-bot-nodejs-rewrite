import { Client, Message } from "discord.js";
import { ICommand } from "./Command";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, ICommand>;
  }
}

export interface CommandOptions {
  name: string;
  aliases?: string[] | undefined[];
  disabled?: boolean;
  help?: {
    description?: string;
    category?: string;
    usage?: string;
  };
}

export type CommandFunction = (
  client?: Client,
  message?: Message,
  args?: string[]
) => any | Promise<any>;
