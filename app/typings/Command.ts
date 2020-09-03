import { CommandOptions, CommandFunction, ICommand } from ".";

// Export the class that is used. This will then be used as new Command();
export default class Command implements ICommand {
  constructor(public config: CommandOptions, public run: CommandFunction) {}
}
