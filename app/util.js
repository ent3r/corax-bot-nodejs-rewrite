const { Collection } = require("discord.js");

const { resolve } = require("path");

const { readdirSync } = require("fs");

/**
 *Goes through checks to make sure a command is valid, and adds it to a collection if it is
 *
 * @param {Collection} collection the collection the command should be added to
 * @param {Object} command the command itself
 * @returns null
 */
const addCommand = (collection, command) => {
  if (command.disabled) {
    return;
  }
  if (!command.name) {
    throw new Error("Missing command name");
  }
  if (!command.run) {
    throw new Error("Missing run function for command");
  }
  collection.set(command.name, command);
};

/**
 *Loads all the commands in the ./commands/ folder
 *
 * @param {String} [folder="./commands/"] What folder to use. Defaults to "./commands/"
 */
const loadCommands = (folder = "./commands/") => {
  const Commands = new Collection();

  const files = readdirSync(folder).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
  );

  for (let file of files) {
    let commands = require(resolve(folder, file));

    if (commands.hasMultiple) {
      commands.commands.forEach((command) => {
        addCommand(Commands, command);
      });
    } else {
      addCommand(Commands, commands);
    }
  }
  return Commands;
};

module.exports = {
  loadCommands: loadCommands,
};
