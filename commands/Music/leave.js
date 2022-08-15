const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "leave",
  aliases: [],
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
    const {channel} = message.member.voice;
    if (!channel)
      return message.reply({allowedMentions: {repliedUser: true},embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join Voice Channel`)
      ]})
        .then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
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
        return message.reply({ allowedMentions: false,embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel}`)]})
          .then((msg) => {
            setTimeout(() => {
              msg.delete()
            }, 5000);
          });
        await distube.voices.create(channel).connection.destroy()
          message.reply({embeds: [new MessageEmbed()
              .setColor(ee.color)
              .setDescription(`Leaving ${channel}`)
              .setFooter({text: `requested by ${message.author.tag}`})
            ]})
  },
};
