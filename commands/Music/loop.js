const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "loop",
  aliases: [],
  category: "🎶 Music",
  memberpermissions: " ",
  description: "lopp Playing Song",
  usage: "[command]  \noff = disabled loop \n song = Repeat song\n queue = Repeat Queue",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const { channel } = message.member.voice;

    //if member not connected return error
    if (!channel)
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Please Join Voice Channel To Loop Song`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.channel
        .send({embeds: [new MessageEmbed()
          .setColor(ee.color).setDescription(
      `Nothing Playing In Voice Channel To Loop`)]})
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
      return message.channel
        .send({embeds: [new MessageEmbed()
          .setColor(ee.color).setDescription(
      `Please Join My Voice Channel ${message.guild.me.voice.channel.name}`
    )]})
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

        let queue = distube.getQueue(message.guild.id)
        if(!queue) return message.reply({embeds: [new MessageEmbed().setDescription("** Nothing Playing Right Now **").setColor(ee.wrongcolor)], allowedMentions: {repliedUser: true}}).then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 8000);
        })

        let value = args[0]
        if(!value) return message.reply({allowedMentions: {repliedUser: true}, content: "`usage: E!loop <option>\n option: 0: off\n1: song\n2: queue`"})

        switch ( value ) {
          case "0":
            distube.setRepeatMode(message, 0)
          message.channel.send({embeds: [new MessageEmbed()
            .setDescription("Loop Mode is set to `Off`")
            .setColor(ee.color)
            .addField("Requested", message.author, true)
          ]}).then((msg) => {
            setTimeout(() => {
              msg.delete()
            }, 5000);
          })
            
            break;

            case "1":
              distube.setRepeatMode(message, 1)
              message.channel.send({embeds: [new MessageEmbed()
                .setDescription("Loop Mode is set to `Song`")
                .setColor(ee.color)
                .addField("Requested", message.author, true)
              ]}).then((msg) => {
                setTimeout(() => {
                  msg.delete()
                }, 5000);
              })

            break;

            case "2":
              distube.setRepeatMode(message, 2)
              message.channel.send({embeds: [new MessageEmbed()
                .setDescription("Loop Mode is set to `Queue`")
                .setColor(ee.color)
                .addField("Requested", message.author, true)
              ]}).then((msg) => {
                setTimeout(() => {
                  msg.delete()
                }, 5000);
              })

            break;

            case "off":
              distube.setRepeatMode(message, 0)
              message.channel.send({embeds: [new MessageEmbed()
                .setDescription("Loop Mode is set to `Off`")
                .setColor(ee.color)
                .addField("Requested", message.author, true)
              ]}).then((msg) => {
                setTimeout(() => {
                  msg.delete()
                }, 5000);
              })

            break;

            case "song":
              distube.setRepeatMode(message, 1)
              message.channel.send({embeds: [new MessageEmbed()
                .setDescription("Loop Mode is set to `Song`")
                .setColor(ee.color)
                .addField("Requested", message.author, true)
              ]}).then((msg) => {
                setTimeout(() => {
                  msg.delete()
                }, 5000);
              })

            break;

            case "queue":
              distube.setRepeatMode(message, 2)
              message.channel.send({embeds: [new MessageEmbed()
                .setDescription("Loop Mode is set to `Queue`")
                .setColor(ee.color)
                .addField("Requested", message.author, true)
              ]}).then((msg) => {
                setTimeout(() => {
                  msg.delete()
                }, 5000);
              })

            break;


            
        
          default:
            console.log(value)
            break;
        }

        
    
  },
};
