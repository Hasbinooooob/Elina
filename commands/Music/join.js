const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
var { getData, getPreview, getTracks } = require("spotify-url-info");

module.exports = {
  name: "join",
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

    //if member not connected return error
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


    
    
    // if don't have persm
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) return message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`I am Not Allowed In Voice Channel`)]
    }).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 5000);

        });

        await distube.voices.create(channel).join().then(async () => {
          message.reply({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Joined ${channel}`)
            .setFooter({text: `requested by ${message.author.tag}`})
          ]})
        })
    
  },
};
