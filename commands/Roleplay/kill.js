const { Client, Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const client = require('aflb');
const anime = new client();
const fetch = require("node-fetch")
module.exports = {
  name: "kill",
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
    let image = await fetch("https://api.waifu.pics/sfw/kill").then((res) =>  res.json())
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user;
    if(!user) return message.reply({embeds: [new MessageEmbed().setDescription("`Please mention someone`").setColor(ee.color)], allowedMentions: {repliedUser: true}})
    if(user === message.author) return message.reply({embeds: [new MessageEmbed().setDescription("`Please mention someone`").setColor(ee.color)]})
    message.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setImage(image.url).setAuthor({name: `${message.author.username} has killed ${user.username}`}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})]})
    } catch (error) {
        message.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`${error.message}`)]})
        console.log(error.stack)
    }
  },
};