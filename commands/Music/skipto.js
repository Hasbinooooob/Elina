const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, Modal, TextInputComponent} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const distube = require("../../utils/distubeClient")
module.exports = {
  name: "skipto",
  aliases: ["jump"],
  category: "Music",
  memberpermissions: [],
  description: "",
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
            .setDescription(`Please Join Voice Channel`)
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
            let queue = distube.getQueue(message.guild.id)
            if(!queue) return message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`There is nothing in the queue right now!`")], allowedMentions: {repliedUser: true}})
            if(isNaN(args[0])) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setColor(ee.color).setDescription("`Please enter a valid number!`")]})
            if(queue.songs.length > args[0]) return
            await distube.jump(message.guild.id, parseInt(args[0])).then((q) => {
                message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`\`Skipto: ${args[0]}\``)]})
            })
    } catch (error) {
      console.log(error.stack);
    }
  },
};