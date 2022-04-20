const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "queue",
  aliases: [],
  category: "🎶 Music",
  memberpermissions: " ",
  description: "Show Queue of Current Song",
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
        .setColor(ee.color).setDescription(`Please Join Voice Channel`)]}).then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color).setDescription(`Nothing Playing In Voice Channel`)]}).then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });

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
        });

    //get the queue
    let queue = distube.getQueue(message.guild.id);

    if(!queue) return message.reply({embeds: [new MessageEmbed().setDescription("** Nothing Playing Right Now **").setColor(ee.wrongcolor)], allowedMentions: {repliedUser: true}}).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 8000);
    })

    message.channel.send({embeds: [new MessageEmbed()
      .setColor(ee.color).setDescription("Current queue:\n" + queue.songs.map((song, id) => `**${id + 1}**. \`${song.name}\` - \`${song.formattedDuration}\``).slice(0, 10).join("\n"))]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 10000);
      })

  },
};
