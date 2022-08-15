const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const fetch = require("node-fetch")
module.exports = {
  name: "joke",
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
        let joke = await fetch(`https://api.popcat.xyz/joke`)
        .then(res => res.json())
        .then(json => {
            message.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle(`Joke!`)
                    .setDescription(`\`${json.joke}\``)
                    .setColor(ee.color)
                ]
            })
        })
    } catch (error) {
      console.log(error.stack);
    }
  },
};