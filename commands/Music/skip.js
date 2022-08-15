const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
module.exports = {
  name: "skip",
  aliases: [],
  category: "Music",
  memberpermissions: [],
  description: "skip Playing Song",
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
        .setDescription(`please Join Voice Channel To skip Song`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })
    if (!message.guild.me.voice.channel)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Nothing Playing In Voice Channel`)
      ]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color).setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel}`)]
      }).then((msg) => {
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
    if(queue.songs.length === 1) {
      queue.stop()
      message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`skip By <@${message.author.id}>`)
      ]}).then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
      })
    }
    else {
      queue.skip()
    message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`skip By <@${message.author.id}>`)
    ]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })

    }
  },
};
