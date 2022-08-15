const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const fetch = require("node-fetch")
module.exports = {
  name: "randomcolor",
  aliases: [],
  category: "Fun",
  memberpermissions: [],
  description: "random color",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      let color = await fetch(`https://api.popcat.xyz/randomcolor`).then((c) => c.json())
      let embed = new MessageEmbed()
      .setColor(ee.color)
      .setImage(color.image)
      .addFields({name: "❱ Name", value: `\`${color.name}\``, inline: true})
      .addFields({name: "❱ Hex color", value: `\` ${color.hex} \``, inline: true})
      message.reply({embeds: [embed]})
    } catch (error) {
      console.log(error.stack);
    }
  },
};