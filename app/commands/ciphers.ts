import CommandGroup from "../typings/CommandGroup";
import Command from "../typings/Command";

const rot = function rot(inputString: any, rotAmount: number) {
  return inputString.replace(/[a-z]/gi, function (c: any) {
    return String.fromCharCode(
      (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + rotAmount) ? c : c - 26
    );
  });
};

const commands = new CommandGroup([
  new Command(
    {
      name: "rot13",
      aliases: ["rot", "r13"],
      help: {
        description: "Shows all possible ROT13 encodings on a string",
        usage: "<string-to-be-rot'ed>",
      },
    },
    async (client, message, args) => {
      let _arguments = args.join(" ");
      if (_arguments.startsWith("`") && _arguments.endsWith("`")) {
        _arguments = _arguments.substring(1, _arguments.length - 1);
      }
      const outputArray: Array<any> = [];
      for (let i = 0; i < 26; i++) {
        outputArray.push({ i: i, rotString: rot(_arguments, i) });
      }
      let output = "";
      for (const object of outputArray) {
        output += `${object.i}: ${object.rotString}\n`;
      }
      await message.channel.send(`\`\`\`${output}\`\`\``);
    }
  )
]);

module.exports = commands;
