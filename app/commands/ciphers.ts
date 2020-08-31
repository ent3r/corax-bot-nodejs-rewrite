import CommandGroup from "../typings/CommandGroup";
import Command from "../typings/Command";

//* From stackoverflow: https://stackoverflow.com/a/617685/9088682
const rot = function rot(inputString: any, rotAmount: number) {
  return inputString.replace(/[a-z]/gi, function (c: any) {
    return String.fromCharCode(
      (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + rotAmount) ? c : c - 26
    );
  });
};

//? Make the initial command group
const commands = new CommandGroup(
  { name: "Ciphers", description: "Different cipher commands, like Rot13" },
  [
    //? Make a new command
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
        //? Turn all the args back into one
        let _arguments = args.join(" ");
        //? Remove all trailing and leading backticks `
        if (_arguments.startsWith("`") && _arguments.endsWith("`")) {
          _arguments = _arguments.substring(1, _arguments.length - 1);
        }

        //? Create the array that stores the ROTed strings, along with their rot amount
        const outputArray: Array<any> = [];
        for (let i = 0; i < 26; i++) {
          outputArray.push({ i: i, rotString: rot(_arguments, i) });
        }

        //? Create the output string
        let output = "";

        //? Add the ROTed strings to the output string
        for (const object of outputArray) {
          output += `${object.i}: ${object.rotString}\n`;
        }
        //? Send the final string, wrapping it in backticks to make it look better
        await message.channel.send(`\`\`\`${output}\`\`\``);
      }
    ),
  ]
);

module.exports = commands;
