const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "pause",
  aliases: ['break'],
  category: "Music",
  memberpermissions: [],
  description: "Pause Playing Song",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message.member.voice;

    //if member not connected return error
    if (!channel)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color).setDescription(`Please Join Voice Channel To Pause Song`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color).setDescription(`Nothing Playing In Voice Channel`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color).setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel.name}`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })

    let queue = distube.getQueue(message.guild.id)
    if(!queue.songs.length) return message.reply({embeds: [new MessageEmbed().setDescription("** Nothing Playing Right Now **").setColor(ee.wrongcolor)], allowedMentions: {repliedUser: true}}).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 8000);
    })


    // if already paushed
    if (queue.paused)  return message.reply({embeds: [new MessageEmbed()
.setColor(ee.color)
.setDescription(`Song Already Paushed....`)]})
    

queue.pause()

    message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color).setDescription(`Song Paushed By <@${message.author.id}>`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 10000);
    })
  },
};
