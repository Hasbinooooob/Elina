const slash = []
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const {Client} = require("discord.js")
let table = new ascii("");
table.setHeading("Slash", "Load status");
/**
 * @param {Client} client
 */
module.exports = (client) => {
  try {
    readdirSync("./slashcommands/").forEach((dir) => {
      const commands = readdirSync(`./slashcommands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );
      for (let file of commands) {
        let pull = require(`../slashcommands/${dir}/${file}`)
        if (pull.options) {
          pull.options
            .filter((g) => g.type === "SUB_COMMAND")
            .forEach((sub) => {
              client.subcmd.set(sub.name, sub);
            });
        }
        if (pull.name) {
          client.slashCommands.set(pull.name, pull);
          table.addRow(file, "Ready");
          slash.push(pull)
        } else {
          table.addRow(
            file,
            `error -> missing a help.name, or help.name is not a string.`
          );
          continue;
        }
        
      }
    });
    console.log(table.toString().green);

    client.on("ready", async () => {
      await client.application.commands.set(slash)
    })
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
};
