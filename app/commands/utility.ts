import CommandGroup from "../typings/CommandGroup";
import Command from "../typings/Command";

import { Client, Message, MessageEmbed } from "discord.js";

const commands = new CommandGroup(
  { name: "Utility", description: "Different utility commands, like ping" },
  [
    new Command(
      {
        name: "reverse",
        help: {
          description: "Reverses a given string",
          category: "Utility",
          usage: "<string>",
          arguments: [
            {
              name: "input",
              description: "The input string you want reversed.",
              required: true,
            },
          ],
        },
      },
      (client: Client, message: Message, args: string[]): void => {
        // Combines the arguments into one string, splits it by each character, reverses it, and joins it back
        message.channel.send(args.join(" ").split("").reverse().join(""));
      }
    ),
    new Command(
      {
        name: "words",
        aliases: ["wordcount", "countwords"],
        help: {
          description: "Counts the amount of words in a message",
          category: "Utility",
          usage: "<string>",
          arguments: [
            {
              name: "string",
              description: "The string you want to get words counted in.",
              required: true,
            },
          ],
        },
      },
      (client: Client, message: Message, args: string[]): void => {
        // Joins the arguments, splits them by spaces (to remove substrings, so every word is its own), and then counts them
        message.channel.send(args.join(" ").split(" ").length);
      }
    ),
    new Command(
      {
        name: "ping",
        aliases: ["delay"],
        cooldown: 5,
        help: {
          description: "Displays the ping to discord",
          category: "Utility",
          usage: "",
        },
      },
      async (
        client: Client,
        message: Message,
        _args: string[]
      ): Promise<void> => {
        // Create a new embed. This is the embed that will be edited, and it is therefore saved
        const embed = new MessageEmbed({
          title: "Pinging...",
        }).setColor("#FFCC00");

        // Send the embed, and with the returned message object
        message.channel.send(embed).then((m) => {
          // Change the embed to contain the correct values
          embed
            .setTitle("Pong!")
            .setColor("#00FF00")
            .setFooter(
              message.author.username,
              message.author.displayAvatarURL()
            )
            .setTimestamp(new Date())
            .addField(
              "Round trip latency",
              `${Math.floor(
                m.createdAt.getTime() - message.createdAt.getTime()
              )}ms`
            )
            .addField(
              "Discord websocket ping",
              `${Math.round(client.ws.ping)}ms`
            );
          // And then edit the message we sent with this new embed
          m.edit(embed);
        });
        // Return because why not
        return;
      }
    ),
  ]
);

module.exports = commands;
