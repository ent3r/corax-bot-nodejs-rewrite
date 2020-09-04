import { Collection, Client, MessageEmbed } from "discord.js";

import { resolve } from "path";

import { readdirSync } from "fs";

import Command from "./typings/Command";
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
  command: Command
): void => {
  if (command.config.disabled) {
    return;
  }
  if (!command.config.name) {
    logger.warn("Command missing name");
    return;
  }
  collection.set(command.config.name.toLowerCase(), command);
};

/**
 *Loads commands from `folder` and returns a new collection
 *
 * @param {string} [folder="./commands/"] The folder to be searched
 * @returns {Promise<Collection<string, ICommand>>} A promise for a collection of all the commands found
 */
const loadCommands = async (
  folder = "./commands/"
): Promise<{
  commands: Client["commands"];
  commandGroups: Client["commandGroups"];
}> => {
  const CommandCollection = new Collection<string, Command>();
  const CommandGroups: Client["commandGroups"] = [];
  const ungroupedCommands = new CommandGroup(
    {
      name: "Ungrouped",
      description: "Commands that are not in a particular group",
    },
    []
  );

  // Goes through a folder and finds all .js and .ts files
  const files = readdirSync(folder).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
  );

  logger.debug(`Found files while loading commands: ${files}`);

  // For every file
  for (const file of files) {
    // Require it, making sure to add in the folder it is in
    const commands: CommandGroup | Command | void = await require(resolve(
      folder,
      file
    ));

    logger.debug(`Required file ${file}`);
    // Check if a command file contains multiple commands, indicated by class Commands
    // and add each of them to the collection if it is. Otherwise just add a single one
    if (commands instanceof CommandGroup) {
      CommandGroups.push(commands);

      commands.commands.forEach((command) => {
        addCommand(CommandCollection, command);
      });
    } else if (commands instanceof Command) {
      addCommand(CommandCollection, commands);

      ungroupedCommands.commands.push(commands);
    } else {
      continue;
    }
  }

  CommandGroups.push(ungroupedCommands);

  // Then return the new collection of commands
  logger.info(
    `Finished loading commands: ${CommandCollection.map(
      (command) => command.config.name
    )}`
  );
  return { commands: CommandCollection, commandGroups: CommandGroups };
};

const loadHelpPages = (commandGroups: CommandGroup[]): Client["helpPages"] => {
  const HelpPages: Client["helpPages"] = new Collection();

  const allGroupsEmbed = new MessageEmbed({
    title: "Help menu",
    description: "These are all the commands available",
    color: 8194685,
  });

  commandGroups.forEach((group) => {
    const description = `${
      group.help.description
    }\nCommands in this category: ${group.commands
      .map((command) => `\`${command.config.name}\``)
      .join(", ")}`;
    allGroupsEmbed.addField(group.help.name, description);
  });

  HelpPages.set("__default__", allGroupsEmbed);

  commandGroups.forEach((group) => {
    group.commands.forEach((command) => {
      const embed = new MessageEmbed({
        title: command.config.name,
        color: 8194685,
      });

      let description = `${command.config.help.description}\nUsage: \`${command.config.name} ${command.config.help.usage}\``;
      if (command.config.aliases) {
        description += `\nAliases: ${command.config.aliases
          .map((alias) => `\`${alias}\``)
          .join(", ")}`;
      }
      if (command.config.help.arguments) {
        description += `\n\nArguments:\n${command.config.help.arguments
          .map(
            (argument) =>
              `- \`${
                argument.required ? `<${argument.name}>` : `[${argument.name}]`
              }\`\n\t${argument.description}\n\tRequired: ${
                argument.required ? "Yes" : "No"
              }`
          )
          .join("\n\n")}`;
      } else {
        description += "\n\nCommand has no arguments configured";
      }

      if (command.config.subcommands) {
        description += "\n\n**Subcommands:**";
        command.config.subcommands.forEach((subcommand) => {
          embed.addField(
            subcommand.config.name,
            `${subcommand.config.help.description}\nUsage: \`${command.config.name} ${subcommand.config.name} ${subcommand.config.help.usage}\``
          );
        });
      }

      embed.setDescription(description);

      HelpPages.set(command.config.name, embed);
    });
  });

  return HelpPages;
};

/**
 *Sets all the cooldowns for a command
 *
 * @param {Client} client The client object
 */
const setCooldowns = (client: Client): void => {
  // Make the cooldown collection that will be added to the client later
  const cooldowns = new Collection<string, Collection<string, number>>();

  // For every command, add it to the collection. Using it's name as the key
  client.commands.forEach((command) => {
    cooldowns.set(command.config.name, new Collection());
  });
  logger.debug("Added cooldowns for commands");

  // Add the cooldown collection to the client
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
): Command | null => {
  // Try to find a command, and if we can't find it by the name provided by the user, check if it was an alias.
  return (
    commandCollection.get(commandOrAlias) ||
    commandCollection.find(
      // These are the criteria that will be tested
      (cmd) =>
        // The command has to have the aliases property
        {
          /* The command has to have the aliases property*/
          return (
            cmd.config.aliases &&
            // It has to be longer than 0
            cmd.config.aliases.length !== 0 &&
            // And it has to include the name provided
            cmd.config.aliases.includes(commandOrAlias)
          );
        }
    )
  );
};

export { loadCommands, setCooldowns, getCommand, loadHelpPages };
