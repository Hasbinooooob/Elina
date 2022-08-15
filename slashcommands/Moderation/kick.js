const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu  } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
module.exports = {
  name: "kick",
  description: "kick a member from server",
  type: 1,
  defaultMemberPermissions: ["KICK_MEMBERS"],
  options: [
    {
        name: "member",
        description: "member to kick",
        type: "USER",
        required: true
    },
    {
        name: "reason",
        description: "reason of the kick",
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
    try {
        if(!interaction.guild.me.permissions.has(["KICK_MEMBERS"])) return interaction.followUp({embeds: [{description: "I don't have permission `Kick Members`!", color: ee.color}]})
        let user = interaction.options.getUser("member")
        let member = interaction.guild.members.cache.get(user.id)
        let reason = interaction.options.getString("reason")
        if(!reason) {
            reason = "no reason"
        }
        if(member.id === client.user.id) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("** you can't kick my self! **").setTimestamp()]})
        if(member.id === interaction.user.id) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("** you can't kick yourself! **").setTimestamp()]})
        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`** Your Role is Not High To kick this User **`)]})
        if(member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`**My Role is Not High To kick this User!**`)]})
        if(!member.kickable) return interaction.followUp({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`I can't kick this user`)]})    
        await member.kick(reason)
        interaction.followUp({embeds: [new MessageEmbed()
            .setThumbnail(member.displayAvatarURL({dynamic: true}))
            .setColor(ee.color)
            .setDescription(`<@${member.user.id}> Kicked From Server\nreason: \`${reason}\``)
            .setFooter({text: `kicked by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
        ]})
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