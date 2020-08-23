import { Collection } from "discord.js";

import { resolve } from "path";

import { readdirSync } from "fs";

import { ICommand } from "./typings/Command";

/**
 *Goes through checks to make sure a command is valid, and adds it to a collection if it is
 *
 * @param {Collection} collection the collection the command should be added to
 * @param {Object} command the command itself
 * @returns null
 */
const addCommand = (collection: Collection<string, any>, command: ICommand) => {
  if (command.config.disabled) {
    return;
  }
  if (!command.config.name) {
    throw new Error("Missing command name");
  }
  collection.set(command.config.name, command);
};


const loadCommands = async (folder = "./commands/"): Promise<Collection<string, ICommand>> => {
  const Commands = new Collection<string, ICommand>();

  //? Goes through a folder and finds all .js and .ts files
  const files = readdirSync(folder).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
  );

  //? For every file
  for (const file of files) {
    //? Require it, making sure to add in the folder it is in
    const commands = await require(resolve(folder, file));

    //? If there are multiple commands in one file
    if (commands.hasMultiple) {
      //? Go through each command and add it
      commands.commands.forEach((command) => {
        addCommand(Commands, command);
      });

      //? And if not
    } else {
      //? Just add it
      addCommand(Commands, commands);
    }
  }

  //? Then return the new collection of commands
  return Commands;
};

export { loadCommands };
