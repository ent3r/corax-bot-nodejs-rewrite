import CommandGroup from "../typings/CommandGroup";
import Command from "../typings/Command";

import { Client, Message } from "discord.js";

import configModel from "../models/serversettings";
import logger from "../handlers/logging";

import { get } from "lodash";

const commands = new CommandGroup([
  new Command(
    {
      name: "config",
      help: {
        description: "Sets up config stuff",
        usage: "<get | set>",
        category: "Utility",
        arguments: [
          { name: "get | set | show", required: true },
          { name: "value", required: false },
        ],
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
          const path = args[1];
          configModel
            .findOne({ server_id: message.guild.id })
            .then((document) => {
              if (!document) {
                message.channel.send(
                  "The config for this server seems to be missing! Please try running the command again (It should have been created after you ran that command)"
                );
                return;
              }
              if (path) {
                message.channel.send(
                  `\`${path}\` => \`${get(document.toJSON(), path) || " "}\``
                );
              } else {
                message.channel.send(
                  `Entire config:\n\`\`\`json\n${JSON.stringify(
                    document.toJSON(),
                    (key, value) => {
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
  ),
]);

module.exports = commands;
