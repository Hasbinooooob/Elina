const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { TwoZeroFourEight } = require('leaf-utils');
module.exports = {
  name: "2048",
  aliases: [],
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
        await TwoZeroFourEight({
            message: message,
            slash_command: false,
            time: 300000,
            embed: {
                title: "2048",
                color: ee.color,
            },
            left: {
                label: " ",
                style: "SECONDARY",
                emoji: "◀️",
            },
            up: {
                label: " ",
                style: "PRIMARY",
                emoji: "⬆️",
            },
            down: {
                label: " ",
                style: "PRIMARY",
                emoji: "⬇️",
            },
            right: {
                label: " ",
                style: "SECONDARY",
                emoji: "▶️",
            },
            winMessage: "GG, You win",
            loseMessage: "You lose",
            authorOnly: "Only <@{{author}}> can use this button!",
        });
    } catch (error) {
      console.log(error.stack);
    }
  },
};