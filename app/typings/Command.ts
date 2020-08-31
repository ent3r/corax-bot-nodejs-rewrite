import { CommandOptions, CommandFunction } from ".";

// The interface that is used for typing and stuff in the code
export interface ICommand {
  config: CommandOptions;
  run: CommandFunction;
}

// Export the class that is used. This will then be used as new Command();
export default class Command {
  constructor(public config: CommandOptions, public run: CommandFunction) {}
}
