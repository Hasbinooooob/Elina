const { Client, Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const anime = require("discord-images")
module.exports = {
  name: "nervous",
  aliases: [],
  category: "Roleplay",
  memberpermissions: [],
  cooldown: 5,
  description: "",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
    message.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setImage(await anime.nervous()).setAuthor({name: `${message.author.username} is nervous`}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})]})
    } catch (error) {
        message.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`${error.message}`)]})
        console.log(error.stack)
    }
  },
};