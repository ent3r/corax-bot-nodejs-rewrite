import { CommandFunction, BaseCommandOptions, ISubcommand } from ".";

export default class Subcommand implements ISubcommand {
  constructor(public config: BaseCommandOptions, public run: CommandFunction) {}
}
