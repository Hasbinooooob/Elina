const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
module.exports = {
  name: "play",
  aliases: ["p"],
  category: "Music",
  memberpermissions: "",
  description: "Play Song in Discord",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel)
      return message.reply({allowedMentions: {repliedUser: true},embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join Voice Channel To Play Song`)
      ]})
        .then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.reply({ allowedMentions: false,embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel}`)]})
        .then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
    if (!args.length)
      return message.reply({allowedMentions: false,embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`Please Enter Song Name to Play Song`)
    ]}).then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) return message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`I am Not Allowed In Voice Channel`)]
    }).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 5000);
        });
        if (args.length) {
          message.channel
            .send({embeds: [new MessageEmbed()
              .setColor(ee.color)
              .setDescription(`Searching ${args.join(" ")}`)]}).then((msg) => {
              setTimeout(() => {
                msg.delete()
              }, 5000);
            });
        }
        let songs = args.join(" ")
        distube.play(channel, songs, {
          member: message.member,
          textChannel: message.channel,
        })
  },
};
