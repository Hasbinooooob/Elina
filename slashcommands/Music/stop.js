const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Modal, TextInputComponent } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
const distube = require("../../utils/distubeClient")
module.exports = {
  name: "stop",
  description: "stop the music",
  type: 1,
  options: [],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
    const { channel } = interaction.member.voice;
    if (!channel)
      return interaction.followUp({allowedMentions: {repliedUser: true},embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join Voice Channel To Play Song`)
      ]})
        .then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
    if (
        interaction.guild.me.voice.channel &&
      channel.id != interaction.guild.me.voice.channel.id
    )
      return interaction.followUp({ allowedMentions: false, embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join My Voice Channel ${interaction.guild.me.voice.channel}`)]})
        .then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
    if (!interaction.guild.me.permissionsIn(interaction.member.voice.channel).has("CONNECT")) return interaction.followUp({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`I am Not Allowed In Voice Channel`)]
    }).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 5000);
        });

    let queue = distube.getQueue(message.guild.id)
    if(!queue.songs.length) return message.reply({embeds: [new MessageEmbed().setDescription("** Nothing Playing Right Now **").setColor(ee.wrongcolor)], allowedMentions: {repliedUser: true}}).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 8000);
    })
    queue.stop()
    interaction.followUp({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`\`Music has been Stopped by\` <@${interaction.user}>`)
    ]}).then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000);
    })
    } catch (error) {
      console.log(error.stack);
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`ERROR | An error occurred!`)
            .setDescription(`\`${error.message}\``),
        ],
      });
    }
  },
}