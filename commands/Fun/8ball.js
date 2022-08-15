const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { EightBall } = require("discord-gamecord")
module.exports = {
  name: "8ball",
  aliases: [],
  category: "Fun",
  description: "Return A Answer Of Question!",
  usage: "8ball <Question>",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {
    const text = args.join(" ")
    if (!text) return message.reply({allowedMentions: false, embeds: [new MessageEmbed().setTitle("Please give the quetion").setColor(ee.color)]}).then((msg) => {
        setTimeout(() => {
            msg.delete()
        }, 5000);
    })
    new EightBall({
      message: message,
      question: text,
      slash_command: false,
      embed: {
        title: '🎱 8Ball',
        color: ee.color
      }
    }).startGame();
  }
};