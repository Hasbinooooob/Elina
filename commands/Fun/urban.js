const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, Modal, TextInputComponent} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { Urban } = require("klaymon")
module.exports = {
  name: "urban",
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
        const query = args.join(" ")
        if(!query) return message.reply({embeds: [new MessageEmbed().setDescription(`\`Please enter a search query!\``).setColor(ee.color)], allowedMentions: {repliedUser: true}})
              await Urban({ 
                message: message, 
                query: query, 
                embed: {
                    timestamp: true, 
                    color: ee.color,
                },
                notFound: "`Query not found`", 
            })
    } catch (error) {
      console.log(error.stack);
    }
  },
};