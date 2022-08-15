const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { WouldYouRather } = require("discord-gamecord")
module.exports = {
  name: "wouldyourather",
  aliases: ["wyr"],
  category: "Mini Games",
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
        new WouldYouRather({
            message: message,
            slash_command: false,
            embed: {
              title: 'Would You Rather',
              color: ee.color,
            },
            thinkMessage: '**Thinking...**',
            buttons: { option1: 'Option 1', option2: 'Option 2' },
            othersMessage: 'You are not allowed to use buttons for this message!',
          }).startGame();
    } catch (error) {
      console.log(error.stack);
    }
  },
};