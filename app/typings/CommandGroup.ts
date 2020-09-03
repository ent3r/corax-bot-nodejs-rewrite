import Command from "./Command";
import { CommandGroupHelp, ICommandGroup } from ".";

// A group of commands, or quite simply: An array
export default class CommandGroup implements ICommandGroup {
  constructor(public help: CommandGroupHelp, public commands: Command[]) {}
}
