const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
module.exports = {
  name: "autoplay",
  aliases: [],
  category: "Music",
  memberpermissions: "",
  description: "Toggles autoplay",
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
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) return message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`I am Not Allowed In Voice Channel`)]
    }).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 5000);
        });
        let queue = distube.getQueue(message.guild.id)
        if(!queue) return message.reply({embeds: [new MessageEmbed().setDescription(`** There is nothing in the queue right now! **`).setColor(ee.color)]})
       let autoplay = queue.toggleAutoplay()
        message.reply({
            embeds: [new MessageEmbed()
              .setColor(ee.color)
              .setTimestamp()
              .setDescription(`Autoplay:\`${autoplay ? '✅' : '❌'}\``)
              .setFooter({text: `Requested by: ${message.author.tag}`,iconURL: message.author.displayAvatarURL({dynamic: true})})]
        }).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 7000);
        })
  },
};
