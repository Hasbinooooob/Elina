const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
module.exports = {
  name: "seek",
  aliases: [],
  category: "Music",
  memberpermissions: " ",
  description: "seek Playing Song",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join Voice Channel To Play Song`)]}
      ).then((msg) => {
        setTimeout(() => {
          msg.delete()
      }, 5000);
    })
    if (!message.guild.me.voice.channel)
      return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Nothing Playing In Voice Channel`)]} 
      ).then((msg) => {
        setTimeout(() => {
          msg.delete()
      }, 5000);
    })
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel.send({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel}`)]}
      ).then((msg) => {
        setTimeout(() => {
          msg.delete()
      }, 5000);
    })
    if(args[0]) return
    let queue = distube.getQueue(message.guild.id);
     let seektime = queue.currentTime + Number(args[0]) * 1000;
     if (seektime >= queue.songs[0].duration * 1000) seektime = queue.songs[0].duration * 1000 - 1;
     distube.seek(queue , Number(seektime))
    message.channel.send({embeds: [new MessageEmbed()
      .setColor(ee.color).setDescription(
`Song Forward to ${Number(args[0])} Seconds \n By <@${message.author.id}>`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })
  },
};
