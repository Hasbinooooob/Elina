const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
const moment = require("moment")
module.exports = {
  name: "role",
  description: "role",
  type: 1,
  memberpermissions: [],
  options: [
    {
        name: "info",
        description: "get role information",
        type: "SUB_COMMAND",
        options: [
            {
                name: "role",
                description: "selected a role",
                type: "ROLE",
                required: true
            }
        ]
    },
    {
      name: "give",
      description: "gives a role to member",
      type: "SUB_COMMAND",
      options: [
        {
          name: "member",
          description: "member to give role",
          type: "USER",
          required: true,
        },
        {
          name: "role",
          description: "the role to give",
          type: "ROLE",
          required: true
        }
      ]
    },
    {
      name: "remove",
      description: "removes a role form a member",
      type: "SUB_COMMAND",
      options: [
        {
          name: "member",
          description: "member to remove role",
          type: "USER",
          required: true,
        },
        {
          name: "role",
          description: "the role to remove",
          type: "ROLE",
          required: true
        }
      ]
    }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
        let sub = interaction.options.getSubcommand()
        switch (sub) {
            case "info":
                let roles = interaction.options.getRole("role")
                let role = interaction.guild.roles.cache.get(roles.id)
            let permissions = role.permissions.toArray().map(perm => {
                return perm
                  .toLowerCase()
                  .replace(/_/g, " ") // Replace all underscores with spaces
                  .replace(/\w\S*/g, txt => {
                    // Capitalize the first letter of each word
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                  });
              });
            //create the EMBED
            let roleinfo =  new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 512 }))
            .addFields({name: '**❱ Name:**', value: `\`${role.name}\``, inline: true})
            .addFields({name: '**❱ ID:**', value: `\`${role.id}\``, inline: true})
            .addFields({name: '**❱ Hex Color:**', value: `\`${role.hexColor}\``, inline: true})
            .addFields({name: '**❱ Date Created:**', value: "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", inline: true})
            .addFields({name: '**❱ Position:**', value: `\`${role.rawPosition}\``, inline: true})
            .addFields({name: '**❱ MemberCount:**', value: `\`${role.members.size} Members have it\``, inline: true})
            .addFields({name: '**❱ Hoisted:**', value: `\`${role.hoist ? "✔️" : "❌"}\``, inline: true})
            .addFields({name: '**❱ Mentionable:**', value: `\`${role.mentionable ? "✔️" : "❌"}\``, inline: true})
            .addFields({name: '**❱ Permissions:**', value: `\`${permissions}\``})
            .setFooter({text:`requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
            //send the EMBED
            interaction.followUp({embeds: [roleinfo]}) 
            break;
            case "give":
                let member = interaction.guild.members.cache.get(interaction.options.getUser("member").id)
                let giverole = interaction.options.getRole("role")
                if(!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.followUp({embeds: [
                  new MessageEmbed()
                      .setColor(ee.color)
                      .setDescription(`i don't Have \`Manage Roles\` permission To Run Command..`)
              ]})
                if (giverole.managed) {
                  return interaction.followUp({embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Cannot add That Role to This User **`)]})
               }
            if(member.roles.highest.position >= interaction.member.roles.highest) return interaction.followUp({embeds: [new MessageEmbed().setDescription(`** Your Role is Not High To add role this User **`).setColor(ee.color)]})
            if(interaction.member.roles.highest.position <= giverole.position) return interaction.followUp({embeds: [new MessageEmbed().setDescription("`Current Role is Higher Than You, Cannot Add It to User!`").setColor(ee.color)]})
            if(interaction.guild.me.roles.highest.position <= giverole.position) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`Role Is Currently Higher Than Me Therefore Cannot Add It To The User!`")]})
            if(member.roles.cache.has(giverole.id)) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`this user already has that role`")]})
            await member.roles.add(giverole.id)
            interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`${giverole} Role Has Been Added to <@${member.user.id}>`).setFooter({text: `Role added by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})}).setThumbnail(member.displayAvatarURL({dynamic: true}))]})
            break;
            case "remove":
              let members = interaction.guild.members.cache.get(interaction.options.getUser("member").id)
              let removerole = interaction.options.getRole("role")
              if(!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.followUp({embeds: [
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`i don't Have \`Manage Roles\` permission To Run Command..`)
            ]})
              if (removerole.managed) {
                return interaction.followUp({embeds: [new MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`** Cannot remove That Role to This User **`)]})
             }
          if(members.roles.highest.position >= interaction.member.roles.highest) return interaction.followUp({embeds: [new MessageEmbed().setDescription(`** Your Role is Not High To remove role this User **`).setColor(ee.color)]})
          if(interaction.member.roles.highest.position <= removerole.position) return interaction.followUp({embeds: [new MessageEmbed().setDescription("`Current Role is Higher Than You, Cannot remove It to User!`").setColor(ee.color)]})
          if(interaction.guild.me.roles.highest.position <= removerole.position) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`The Current Role Is Higher Than Me Therefore Can't Remove It To The User!`")]})
          if(!members.roles.cache.has(removerole.id)) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`This user doesn't have that role`")]})
          await members.roles.remove(removerole.id)
          interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`${removerole} Role Has Been Removed from <@${members.user.id}>`).setFooter({text: `Role Removed by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})}).setThumbnail(members.displayAvatarURL({dynamic: true}))]})
             break
            default:
            console.log(interaction.commandName)
            break;
        }
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
