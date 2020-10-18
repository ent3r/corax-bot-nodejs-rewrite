import { resolve } from "path";
import { Client } from "discord.js";

import { loadCommands, loadHelpPages, setCooldowns } from "./util";
import { initCache } from "./handlers/cache";
import initMongo from "./handlers/mongodb";

export default (client: Client): Promise<void> =>
  Promise.all([
    loadCommands(resolve(__dirname, "./commands")),
    initCache(),
    initMongo(),
  ])
    .then((results) => {
      client.commands = results[0].commands;
      client.commandGroups = results[0].commandGroups;
      return loadHelpPages(client.commandGroups);
    })
    .then((helpPages) => {
      client.helpPages = helpPages;
      return setCooldowns(client.commands);
    })
    .then((cooldowns) => {
      client.cooldowns = cooldowns;
    });
