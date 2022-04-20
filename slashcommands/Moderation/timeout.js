const { Client, CommandInteraction, MessageEmbed, Formatters } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
const ms = require("ms");

module.exports = {
  name: "timeout",
  description: "timeout a member",
  memberpermissions: ["MODERATE_MEMBERS"],
  options: [
      {
          name: "user",
          description: "the selected member",
          type: "USER",
          required: true
      },
      {
          name: "time",
          description: "the time the member will be timeout",
          type: "STRING",
          required: true
      },
      {
          name: "reason",
          description: "the reason for the timeout",
          type: "STRING",
          required: false
      }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {

      let user = interaction.options.getUser("user")
      let time = interaction.options.getString('time')
      let reason = interaction.options.getString("reason")
      if(!reason) {
          reason = "no reason provided"
      }
      let member = interaction.guild.members.cache.get(user.id)
      if(member.id === client.user.id) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("** you can't timeout me **").setTimestamp()]})
      if(member.id === interaction.user.id) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("** you can't timeout yourself **").setTimestamp()]})
      if(member.id === interaction.guild.ownerId) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("** you can't timeout owner server **").setTimestamp()]})

      let msTime = ms(time)
      if(!msTime) return interaction.followUp({content: "Please specify a valid time!"})

      if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("Your Role is Not High To timeout this User")]})

      member.timeout(msTime, reason).then(async () => {
    interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`${user} has been timeout\n time: \`${time}\`\n reason: \`${reason}\``)]})
      })

  },
};