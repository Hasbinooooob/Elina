const { Client, Message, MessageEmbed, Collection } = require('discord.js');

const {Fight} = require("weky")

module.exports = {
  name: "say",
  aliases: [],
  category: "Fun",
  description: "",
  usage: "[Command] [TEXT]",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {

    let text = args.join(" ")
    if(!text) {
        text = "** **"
    }
        message.delete()
        message.channel.send(text)
    




  }
};