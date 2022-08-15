const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const fetch = require("node-fetch")
module.exports = {
  name: "maid",
  aliases: [],
  category: "Fun",
  memberpermissions: [],
  description: "random maid images",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        const waifu = await fetch("https://api.waifu.im/random/?selected_tags=maid").then(res => res.json())
        waifu.images.filter((i) => {
          let button = new MessageButton()
          .setLabel("Source")
          .setStyle("LINK")
          .setURL(i.source)
          message.reply({embeds: [new MessageEmbed().setImage(i.url).setColor(ee.color).setFooter({text: `request by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})], components: [new MessageActionRow().addComponents([button])]})
        })
    } catch (error) {
      console.log(error.stack);
    }
  },
};