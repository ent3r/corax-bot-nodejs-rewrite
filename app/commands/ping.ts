import Command from "../typings/Command";
import { Client, Message, MessageEmbed } from "discord.js";

//? Create the function that will be used for the command
const run = async (client: Client, message: Message, _args: Array<string>): Promise<void> => {
  //? Create a new embed. This is the embed that will be edited, and it is therefore saved
  const embed = new MessageEmbed({
    title: "Pinging...",
  }).setColor("#FFCC00");

  //? Send the embed, and with the returned message object
  message.channel.send(embed).then((m) => {
    //? Change the embed to contain the correct values
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
    //? And then edit the message we sent with this new embed
    m.edit(embed);
  });
  //? Return because why not
  return;
};

//? Here we make a new Command, sets its config options, and then exports that
const command = new Command(
  {
    name: "ping",
    aliases: [],
  },
  run
);

//? We use CommonJS syntax here to be able to require it in our command handler
module.exports = command;
