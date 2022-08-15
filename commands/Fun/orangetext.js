const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
module.exports = {
  name: "orangetext",
  aliases: [],
  category: "Fun",
  memberpermissions: [],
  description: "Colors the Text woth Orange Color",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        const text = args.join(" ");
        if (!text) {
          return message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`You need to enter some text`")]})
        }
        message.channel.send(`\`\`\`fix\n${text}\n\`\`\``);
    } catch (error) {
      console.log(error.stack);
    }
  },
};