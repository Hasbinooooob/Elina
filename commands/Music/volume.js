const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
module.exports = {
  name: "volume",
  aliases: [],
  category: "Music",
  memberpermissions: [],
  description: "Manage Volume Of Playing Song",
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
        .setColor(ee.color).setDescription(`Please Join Voice Channel to change volume`)]})
        .then((msg) => {
          setTimeout(() => {
          msg.delete()
        }, 5000);
        });
    if (!message.guild.me.voice.channel)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color).setDescription(`Nothing Playing In Voice Channel`)]}).then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color).setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel.name}`)]}).then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    if (!args[0])
      return message.reply({allowedMentions: false ,embeds: [new MessageEmbed()
.setColor(ee.color)
.setDescription(
  `Please Enter Valid Volume Number , The Number Must Between 0 to 100`)]}).then((msg) => {
    setTimeout(() => {
      msg.delete()
    }, 5000);
  })

  if(isNaN(args[0])) return message.reply({allowedMentions: false ,embeds: [new MessageEmbed()
    .setColor(ee.color)
    .setDescription(
      `Please Enter Valid Volume Number , The Number Must Between 0 to 100`)]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
      })
      let queue = distube.getQueue(message.guildId)
      if(!queue) return message.reply({allowedMentions: false, embeds: [new MessageEmbed().setColor(ee.color).setDescription("Nothing to Play")]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
      })
      queue.setVolume(args[0])
    message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color)
.setDescription(
`Song Volume Increased ${args[0]}% By <@${message.author.id}>`
)]}).then((msg) => {
  setTimeout(() => {
    msg.delete()
  }, 5000);
      });
  },
};
