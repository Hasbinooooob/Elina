const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const distube = require("../../utils/distubeClient");


module.exports = {
  name: "play",
  description: "Play a song",
  memberpermissions: [],
  options: [
      {
          name: "query",
          type: "STRING",
          description: "Provide a name or url the song",
          required: true
      }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {

    
    const { channel } = interaction.member.voice;

    if(!channel) return interaction.followUp({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join Voice Channel To Play Song`)
      ]})

      if(interaction.guild.me.voice.channel &&
        channel.id != interaction.guild.me.voice.channel.id) return interaction.followUp({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel}`)]})

            let song = interaction.options.getString("query", true)

            interaction.followUp({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Searching ${song}`)]}).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })

        distube.play(channel, song, {
          member: interaction.member,
          textChannel: interaction.channel,
            })

   
    

  },
};