import Command from "../typings/Command";

import { Client, Message } from "discord.js";

import configModel from "../models/serversettings";
import logger from "../handlers/logging";

import { get } from "lodash";

const command = new Command(
  {
    name: "config",
    help: {
      description: "Sets up config stuff",
      usage: "<get | set>",
      category: "Utility",
      /*arguments: [
        { name: "get | set", required: true },
        { name: "value", required: false },
      ],*/
    },
  },
  async (
    client: Client,
    message: Message,
    args: Array<string>
  ): Promise<void> => {
    const mode = args[0];

    switch (mode) {
      case "get": {
        // Get the path the user wanted
        const path = args[1];

        // Find the config for the current server
        configModel
          .findOne({ server_id: message.guild.id })
          .then((document) => {
            // Make sure we know if the document doesn't exist, and give the user a proper error
            if (!document) {
              message.channel.send(
                "The config for this server seems to be missing! Please try running the command again (It should have been created after you ran that command)"
              );
              return;
            }

            // If the user provided a path, use that path and return its value
            if (path) {
              message.channel.send(
                `\`${path}\` => \`${get(document.toJSON(), path) || " "}\``
              );
            } else {
              // There was no path provided. By default this means that it should just show the entire config
              message.channel.send(
                `Entire config:\n\`\`\`json\n${JSON.stringify(
                  document.toJSON(),
                  (key, value) => {
                    // Filter out the version and id keys
                    if (!["__v", "_id"].includes(key)) {
                      return value;
                    } else {
                      return undefined;
                    }
                  },
                  2
                )}\n\`\`\``
              );
            }
          })
          // Make sure we catch any errors and handle them correctly
          .catch((error) => {
            logger.warn(error);
            message.channel.send(
              `Oh no! An error occured while fetching your server config! Please try again. \`${error}\``
            );
          });
        break;
      }
    }
  }
);

module.exports = command;
