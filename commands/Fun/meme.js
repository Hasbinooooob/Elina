const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { Meme } = require("leaf-utils")
module.exports = {
  name: "meme",
  aliases: [],
  category: "Fun",
  memberpermissions: [],
  description: "Meme command",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        await Meme({
            message: message,
            slash_command: false,
            footer: true,
            time: 300000,
            label: {
                firstlabel: 'Next',
                secondlabel: 'Stop',
            },
            emojis: {
                firstbutton: '↪️',
                secondbutton: '🛑',
            },
            colors: {
                firstbutton: 'PRIMARY',
                secondbutton: 'DANGER',
            },
            embedColor: ee.color,
            authorOnly: 'Only <@{{author}}> can use these buttons!',
        })
    } catch (error) {
      console.log(error.stack);
    }
  },
};