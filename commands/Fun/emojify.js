const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { Emojify } = require('discord-gamecord');
module.exports = {
  name: "emojify",
  aliases: [],
  category: "Fun",
  memberpermissions: [],
  description: "",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        let text = args.join(" ")
        let emo = await Emojify(text)
        message.reply({content: emo})
    } catch (error) {
      console.log(error.stack);
    }
  },
};