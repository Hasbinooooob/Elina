const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

module.exports = {
  name: "ping",
  description: "check ping bot",
  type: 1,
  memberpermissions: [],
  defaultPermission: true,
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      interaction.followUp({embeds: [new MessageEmbed().setColor("F037A5").setDescription("🏓 Pinging...")]}).then( msg =>{
        const ping = new MessageEmbed()
        .setTitle(':ping_pong: Pong!')
        .setDescription(`> > 🎈 Ping ${Date.now() - interaction.createdTimestamp}ms`)
        .setColor('F037A5')
        .setTimestamp()
        msg.edit({embeds: [ping]});
    })
    } catch (error) {
      console.log(error.stack)
      interaction.followUp({content: `\`${error.message}\``})
    }
  },
};