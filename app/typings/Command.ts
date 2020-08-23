import { CommandOptions, CommandFunction } from ".";

export interface ICommand {
    config: CommandOptions,
    run: CommandFunction
}

export default class Command {
  constructor(public config: CommandOptions, public run: CommandFunction) {}
}
