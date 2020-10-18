import { Collection, Message, Client } from "discord.js";
import { resolve } from "path";

import { getCommand } from "../util";
import { ISubcommand, ICommand, ICommandGroup } from "../typings";
import CommandGroup from "../typings/CommandGroup";
import Command from "../typings/Command";
import Subcommand from "../typings/Subcommand";

const ctfCommandGroupCommands: Array<ICommand> = [];

// #region CTFTime Commands

const ctftimeSubcommands = new Collection<string, ISubcommand>();

ctftimeSubcommands.set(
  "team",
  new Subcommand(
    {
      name: "team",
      help: {
        description: "Shows top 10 scores for a given team",
        usage: "<teamID | teamName>",
      },
    },
    (client: Client, message: Message, _args: string[]): void => {
      message.channel.send("TEAM SCORES HERE");
    }
  )
);

const ctftime = new Command(
  {
    name: "ctftime",
    subcommands: ctftimeSubcommands,
    help: { usage: "", description: "CTFTime commands" },
  },
  (client: Client, message: Message, args: string[]): void => {
    if (!args[0]) {
      getCommand(client.commands, "help").run(client, message, ["ctftime"]);
    } else {
      const subcommand = ctftimeSubcommands.get(args[0]);
      if (!subcommand) {
        message.channel.send(
          `Unknown subcommand ${args[0]}. Run \`help ctftime\` to see all subcommands`
        );
        return;
      }
      subcommand.run(client, message, args.slice(1, args.length));
    }
  }
);

// #endregion
ctfCommandGroupCommands.push(ctftime);

const ctfCommandGroup: ICommandGroup = new CommandGroup(
  { name: "CTF", description: "All CTF related commands" },
  ctfCommandGroupCommands
);

module.exports = ctfCommandGroup;
