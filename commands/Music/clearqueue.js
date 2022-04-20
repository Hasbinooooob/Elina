const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
var { getData, getPreview, getTracks } = require("spotify-url-info");

module.exports = {
  name: "clearqueue",
  aliases: [],
  category: "Music",
  memberpermissions: "",
  description: "clear the queue",
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
        .setDescription(`Please Join Voice Channel To clear queue`)
      ]})
        .then((msg) => {

          setTimeout(() => {

            msg.delete()
          }, 5000);
        });

    //if they are not in the same channel, return error only check if connected
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


    // if don't have persm
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) return message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`I am Not Allowed In Voice Channel`)]
    }).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 5000);

        });


        let queue = distube.getQueue(message)

        if(!queue) return

        queue.queues.delete();
        message.reply({
            embeds: [new MessageEmbed()
              .setColor(ee.color)
              .setTimestamp()
              .setDescription("Queue has been: `Cleared`")
              .setFooter({text: `Requested by: ${message.author.tag}`,iconURL: message.author.displayAvatarURL({dynamic: true})})]
        }).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })
  },
};
