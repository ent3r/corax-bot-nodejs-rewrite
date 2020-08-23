import { Client, Message } from "discord.js";

//? Make sure we have the model used to store server settings
import configModel from "../models/serversettings";

//? We need the parser in order to parse incoming messages
import * as parser from "discord-command-parser";
import { DMChannel } from "discord.js";

import * as ms from "ms";

/**
 *Handles an incoming message
 *
 * @param {Client} client the discord.js client
 * @param {Message} message the incoming message
 * @returns {Promise<void>}
 */
const onMessage = async (client: Client, message: Message): Promise<void> => {
  //? Try to find the server config in the database
  let serverConfig = await configModel.findOne({
    server_id: message.guild.id,
  });

  //? But if it couldn't be found
  if (!serverConfig) {
    //? Make a new one
    serverConfig = new configModel({
      server_id: message.guild.id,
    });

    //? And add it to the database
    serverConfig.save((err) => {
      console.log(err);
    });
  }

  //? Then get the prefix, using cb; as a default if it couldn't be found
  const prefix = serverConfig.prefix || "cb;";

  //? Parse the message
  const parsed: any = parser.parse(message, prefix);

  //? If there was an error after parsing it
  if (parsed.error) {
    //? Log it and then return
    console.log(parsed.error);
    return;
  }

  //? Get the command
  const command =
    client.commands.get(parsed.command) ||
    client.commands.find(
      (cmd) => cmd.config.aliases && cmd.config.aliases.includes(parsed.command)
    );

  if (!command) return;

  if (command.config.guildOnly && message.channel instanceof DMChannel) {
    message.channel.send("This command does not work in DMs");
    return;
  }

  if (!parsed.arguments && command.config.help.arguments) {
    message.channel.send(
      `Missing required arguments. Usage: ${command.config.help.usage}`
    );
    return;
  }

  if (command.config.cooldown) {
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.config.name);
    const cooldownAmount = command.config.cooldown * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = expirationTime - now;
        message.channel.send(
          `Command is under cooldown. Please wait another ${ms(timeLeft, {
            long: true,
          })} before running this command again`
        );
        return;
      }
    }

    client.cooldowns.get(command.config.name).set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  //? Use a try catch block in case something happens
  try {
    //? Run the command
    await command.run(client, message, parsed.arguments);
  } catch {
    (err: any) => console.warn(err);
  }
};

export default onMessage;
