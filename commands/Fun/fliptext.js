const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const flip = require("flip-text");
module.exports = {
  name: "fliptext",
  aliases: [],
  category: "Fun",
  memberpermissions: [],
  description: "Flip some text",
  usage: "[command] [text]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        if (args.length < 1) {
            return message.channel.send("Please enter some text to flip");
          }
          args.reverse();
          var flipped = [];
          args.forEach((arg) => {
            flipped.push(flip(arg));
          });
          message.channel.send({content: flipped.join(" ")});
    } catch (error) {
      console.log(error.stack);
    }
  },
};