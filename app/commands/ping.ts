import Command from "../typings/Command";
import { Client, Message, MessageEmbed } from "discord.js";

const run = async (client: Client, message: Message, _args: Array<string>) => {
  const embed = new MessageEmbed({
    title: "Pinging...",
  }).setColor("#FFCC00");

  message.channel.send(embed).then((m) => {
    embed
      .setTitle("Pong!")
      .setColor("#00FF00")
      .setFooter(message.author.username, message.author.displayAvatarURL())
      .setTimestamp(new Date())
      .addField(
        "Round trip latency",
        `${Math.floor(m.createdAt.getTime() - message.createdAt.getTime())}ms`
      )
      .addField("Discord websocket ping", `${Math.round(client.ws.ping)}ms`);

    m.edit(embed);
  });
  return;
};

const command = new Command(
  {
    name: "ping",
    aliases: [],
  },
  run
);

module.exports = command;

// module.exports = {
//   name: "ping",
//   aliases: [],
//   category: "utils",
//   description: "Returns latency and API ping",
//   usage: "",
//   /**
//    *Shows channel ping
//    *
//    * @param {Client} client the client object
//    * @param {Message} message the whole message
//    * @param {Array} _args arguments (Not used here)
//    * @returns void
//    */
// };
