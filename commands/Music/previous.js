const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, Modal, TextInputComponent} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const distube = require("../../utils/distubeClient")
module.exports = {
  name: "previous",
  aliases: ["prev"],
  category: "Music",
  memberpermissions: [],
  description: "Plays the previous song in the queue.",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        const { channel } = message.member.voice;
    if (!channel)
      return message.reply({allowedMentions: {repliedUser: true},embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join Voice Channel To Previous Song`)
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
      const queue = distube.getQueue(message.guild.id)
      if(!queue) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setColor(ee.color).setDescription("`There is nothing in the queue right now!`")]})
      if(queue.previousSongs.length === 0) return message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription("There are no **Previous** songs")], allowedMentions: {repliedUser: true}})
      await distube.previous(message.guild.id).then(() => {
        message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`Song has been: Previous")]})
      })
    } catch (error) {
      console.log(error.stack);
    }
  },
};