const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { NeverHaveIEver } = require("weky")
module.exports = {
  name: "neverhaveiever",
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
      await NeverHaveIEver({
        message: message,
        embed: {
          title: 'Never Have I Ever',
          color: ee.color,
          footer: 'Mini Games',
          timestamp: true
        },
        thinkMessage: 'I am thinking',
        othersMessage: 'Only <@{{author}}> can use the buttons!',
        buttons: { optionA: 'Yes', optionB: 'No' }
      });
    } catch (error) {
      console.log(error.stack);
    }
  },
};