import Command from "./Command";
import { CommandGroupHelp } from ".";

//? A group of commands, or quite simply: An array
export default class CommandGroup {
  constructor(public help: CommandGroupHelp, public commands: Array<Command>) {}
}
