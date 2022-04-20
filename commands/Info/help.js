const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config/config.json").prefix;

module.exports = {
  name: 'help',
    aliases: ["h"],
    category: 'Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show Info Of a Channel',
    usage: "[command] ",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {



    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      

      const embed = new MessageEmbed()
        .setAuthor("How can i help you ?", client.user.displayAvatarURL(), "https://discord.com/api/oauth2/authorize?client_id=878172039171694612&permissions=1099511627775&scope=applications.commands%20bot")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
        )
        .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        .setColor("F037A5");
      return message.channel.send({embeds: [embed]});
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send({embeds: [embed]});
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage ? command.usage : "none usage for this command")
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter({text: `Requested by ${message.author.tag}`,iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        .setColor("F037A5");
      return message.reply({embeds: [embed]});
    }
  },
};