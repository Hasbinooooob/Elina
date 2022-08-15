const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
module.exports = {
  name: "greentext",
  aliases: [],
  category: "Fun",
  memberpermissions: [],
  description: "Colors the Text woth Green Color",
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
        let msg = "";
    for (let i = 0; i < args.length; i++) {
      msg += args[i].toUpperCase().split("").join(" ") + " ";
    }
    message.channel.send(msg)
    } catch (error) {
      console.log(error.stack);
    }
  },
};