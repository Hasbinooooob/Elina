const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { NPMSearch } = require('leaf-utils');
module.exports = {
  name: "npm",
  aliases: [],
  category: "Info",
  memberpermissions: [],
  description: "search npm",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        await NPMSearch({
                    message: message,
                    slash_command: false,
                    args: args,
                    embedColor: ee.color,
                    query: 'Give me a package name to search',
                    noResult: 'I can\'t find this package',
                })
    } catch (error) {
      console.log(error.stack);
    }
  },
};