import CommandGroup from "../typings/CommandGroup";
import Command from "../typings/Command";

import { Client, Message } from "discord.js";

const base64encode = (input: string): string => {
  // Create buffer object, specifying utf8 as encoding
  const bufferObj = Buffer.from(input, "utf8");

  // Encode the Buffer as a base64 string
  return bufferObj.toString("base64");
};

const base64decode = (input: string): string => {
  // Create a buffer from the string
  const bufferObj = Buffer.from(input, "base64");

  // Encode the Buffer as a utf8 string
  return bufferObj.toString("utf8");
};

const commands = new CommandGroup({ name: "Encodings", description: "Different encodings, like Base64"}, [
  new Command(
    {
      name: "base64",
      aliases: ["b64"],
      help: {
        description: "Base64 encode or decode text",
        category: "encodings",
        usage: "<encode | decode> <...string>",
        arguments: [
          { name: "encode | decode", required: true },
          { name: "...string", required: true },
        ],
      },
    },
    (client: Client, message: Message, args: Array<string>): void => {
      if (!["decode", "encode"].includes(args[0].toLowerCase())) {
        message.channel.send(
          `Unrecongnized option \`${args[0]}\`. Must be either of \`encode\` or \`decode\``
        );
        return;
      }
      switch (args[0].toLowerCase()) {
        case "encode": {
          message.channel.send(
            base64encode(args.splice(1, args.length - 1).join(" "))
          );
          break;
        }
        case "decode": {
          message.channel.send(
            base64decode(args.splice(1, args.length - 1).join(" "))
          );
          break;
        }
      }
    }
  ),
]);

module.exports = commands;
