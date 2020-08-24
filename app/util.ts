import { Collection, Client } from "discord.js";

import { resolve } from "path";

import { readdirSync } from "fs";

import Command, { ICommand } from "./typings/Command";
import CommandGroup from "./typings/CommandGroup";

import logger from "./handlers/logging";

/**
 *Goes through checks to make sure a command is valid, and adds it to a collection if it is
 *
 * @param {Collection} collection the collection the command should be added to
 * @param {Object} command the command itself
 * @returns {void}
 */
const addCommand = (
  collection: Collection<string, any>,
  command: ICommand
): void => {
  if (command.config.disabled) {
    return;
  }
  if (!command.config.name) {
    logger.warn("Command missing name");
    return;
  }
  collection.set(command.config.name, command);
};

/**
 *Loads commands from `folder` and returns a new collection
 *
 * @param {string} [folder="./commands/"] The folder to be searched
 * @returns {Promise<Collection<string, ICommand>>} A promise for a collection of all the commands found
 */
const loadCommands = async (
  folder = "./commands/"
): Promise<Collection<string, ICommand>> => {
  const CommandCollection = new Collection<string, ICommand>();

  //? Goes through a folder and finds all .js and .ts files
  const files = readdirSync(folder).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
  );

  logger.debug(`Found files while loading commands: ${files}`);

  //? For every file
  for (const file of files) {
    //? Require it, making sure to add in the folder it is in
    const commands = await require(resolve(folder, file));

    logger.debug(`Required file ${file}`);
    //? Check if a command file contains multiple commands, indicated by class Commands
    //? and add each of them to the collection if it is. Otherwise just add a single one
    if (commands instanceof CommandGroup) {
      commands.commands.forEach((command) => {
        addCommand(CommandCollection, command);
      });
    } else if (commands instanceof Command) {
      addCommand(CommandCollection, commands);
    } else {
      continue;
    }
  }

  //? Then return the new collection of commands
  logger.info(
    `Finished loading commands: ${CommandCollection.map(
      (command) => command.config.name
    )}`
  );
  return CommandCollection;
};

/**
 *Sets all the cooldowns for a command
 *
 * @param {Client} client The client object
 */
const setCooldowns = (client: Client): void => {
  const cooldowns = new Collection<string, Collection<string, number>>();
  client.commands.forEach((command) => {
    cooldowns.set(command.config.name, new Collection());
  });
  logger.debug("Added cooldowns for commands");
  client.cooldowns = cooldowns;
};

/**
 *Gets a command from a Collection
 *
 * @param {Collection<string, Command>} commandCollection The collection with the commands to be searched for
 * @param {any} commandOrAlias A command name or alias for a command
 * @returns {Command} A command object
 */
const getCommand = (
  commandCollection: Collection<string, Command>,
  // eslint-disable-next-line
  commandOrAlias: any
): Command =>
  commandCollection.get(commandOrAlias) ||
  commandCollection.find(
    (cmd) =>
      cmd.config.aliases &&
      cmd.config.aliases.length !== 0 &&
      cmd.config.aliases.includes(commandOrAlias)
  );

export { loadCommands, setCooldowns, getCommand };
