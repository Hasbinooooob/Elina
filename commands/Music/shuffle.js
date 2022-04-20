const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "shuffle",
  aliases: ["shf"],
  category: "🎶 Music",
  memberpermissions: [],
  description: "Shuffle Playing Song",
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
      return message.reply({allowedMentions: {repliedUser: true},embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join Voice Channel To Shuffle Song`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Nothing Playing In Voice Channel`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.reply({allowedMentions: {repliedUser: true},embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel}`)]}).then((msg) => {
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

    queue.shuffle()

    message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(
`Song Shuffled By <@${message.author.id}>`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })
  },
};
