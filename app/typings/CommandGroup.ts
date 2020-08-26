import Command from "./Command";

//? A group of commands, or quite simply: An array
export default class CommandGroup {
  constructor(public commands: Array<Command>) {}
}
