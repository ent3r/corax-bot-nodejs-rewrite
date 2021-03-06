import { Client, Message } from "discord.js";

// Make sure we have the model used to store server settings
import { ServerConfig, Error } from "../models";

// We need the parser in order to parse incoming messages
import * as parser from "discord-command-parser";
import { DMChannel } from "discord.js";

import * as ms from "ms";
import logger from "../handlers/logging";
import { getCommand } from "../util";

import { randomBytes } from "crypto";

/**
 *Handles an incoming message
 *
 * @param {Client} client the discord.js client
 * @param {Message} message the incoming message
 * @returns {Promise<void>}
 */
const onMessage = async (client: Client, message: Message): Promise<void> => {
  try {
    // Try to find the server config in the database
    let serverConfig = await ServerConfig.findOne({
      serverID: message.guild.id,
    });

    // But if it couldn't be found
    if (!serverConfig) {
      // Make a new one
      serverConfig = new ServerConfig({
        serverID: message.guild.id,
      });

      // And add it to the database
      try {
        await serverConfig.save();
        logger.info(`Created config for guild ${message.guild.id}`);
      } catch {
        (error) => logger.warn(error);
      }
    }

    // Then get the prefix, using cb; as a default if it couldn't be found
    const prefix = serverConfig.prefix || "cb;";

    // Parse the message
    const parsed: any = parser.parse(message, prefix);

    // If there was an error after parsing it
    if (parsed.error) {
      // Log it and then return
      logger.debug(parsed.error);
      return;
    }

    // Get the command. If the command couldnt' be found, check to see if the command has any aliases and then use that.
    const command = getCommand(client.commands, parsed.command.toLowerCase());

    // If the command wasn't found, it most likely doesn't exist. Return
    if (!command) return;

    // Checks if a command is marked as guildOnly and the command is sent in a DM. If it is, return
    if (command.config.guildOnly && message.channel instanceof DMChannel) {
      message.channel.send("This command does not work in DMs");
      return;
    }

    /*
  // Checks if there are no passed arguments, and if the command provides a usage
  if (parsed.arguments.length === 0 && command.config.help.arguments) {
    message.channel.send(
      `Missing required arguments. Usage: \`${prefix}${parsed.command} ${command.config.help.usage}\``
    );
    return;
  }
  */

    // A big feature that checks if the command has a cooldown set. If it has, it checks if the
    // user that ran the command is currently in the cooldown
    if (command.config.cooldown) {
      // Get the current time (in miliseconds since unix epoch), all the current cooldowns for a command,
      // and how long a cooldown is in miliseconds.
      const now = Date.now();
      const timestamps = client.cooldowns.get(command.config.name);
      const cooldownAmount = command.config.cooldown * 1000;

      // If the author's id is in the cooldown thing, that means they are currently in cooldown or just was
      if (timestamps.has(message.author.id)) {
        // Get when the cooldown was set, and add how long it was going to last, so we get when it will expire
        const expirationTime =
          timestamps.get(message.author.id) + cooldownAmount;

        // If the now time is less than the expiration time, that means they are still under cooldown
        if (now < expirationTime) {
          // Get how long it is until the cooldown is done
          const timeLeft = expirationTime - now;
          // Send a message telling the author that they are under cooldown, and how long is left
          message.channel.send(
            `Command is under cooldown. Please wait another ${ms(timeLeft, {
              long: true,
            })} before running this command again`
          );
          return;
        }
      }

      // If they are not in the cooldown, get the commands cooldowns, and set the current time
      client.cooldowns.get(command.config.name).set(message.author.id, now);
      // Make a timeout to automatically delete the timeout when it has expired
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    // Use a try catch block in case something happens
    try {
      // Run the command
      await command.run(client, message, parsed.arguments);
    } catch {
      (err) => console.warn(err);
    }
  } catch {
    (err) => {
      const errorID = randomBytes(20).toString("hex");
      logger.warn(`${errorID}:\n${err}`);
      Error.create({
        errorID: errorID,
        serverID: message.guild.id,
        command: message.content,
        errorMessage: err,
      })
        .then((_) => {
          message.channel.send(
            `Oh no! An error has occured! Please provide this ID if you are going to debug: ${errorID}`
          );
        })
        .catch((err) => {
          throw err;
        });
    };
  }
};

export default onMessage;
