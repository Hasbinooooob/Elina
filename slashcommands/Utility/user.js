const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Activity  } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
const config_2 = require("../../config/config_2.json")
const moment = require("moment")
const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
const statuses = {
    "online": "🟢",
    "idle": "🟠",
    "dnd": "🔴",
    "offline": "⚫️"
}
module.exports = {
  name: "user",
  description: "user",
  type: 1,
  memberpermissions: [],
  defaultPermission: true,
  options: [
      {
          name: "info",
          description: "gets user information",
          type: "SUB_COMMAND",
          options: [
              {
                  name: "user",
                  description: "target to get information",
                  type: "USER",
                  required: false
              }
          ] 
      },
      {
          name: "avatar",
          description: "gets user avatar",
          type: "SUB_COMMAND",
          options: [
              {
                  name: "user",
                  description: "target to get main avatar",
                  type: "USER",
                  required: false
              }
          ] 
      },
      {
        name: "permisions",
        description: "show user permisions",
        type: "SUB_COMMAND",
        options: [
          {
              name: "user",
              description: "target to show user permisions",
              type: "USER",
              required: false
          }
      ] 
      },
      {
        name: "banner",
        description: "show user banner",
        type: "SUB_COMMAND",
        options: [
          {
              name: "user",
              description: "target to show user banner",
              type: "USER",
              required: false
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
        if(sub === "info") {
            var user = interaction.options.getUser("user") || interaction.user
            const member = interaction.guild.members.cache.get(user.id);
            const roles = member.roles;
            const userFlags = member.user.flags.toArray();
            const activity = member.presence ? member.presence.activities[0] : {
                type: "CUSTOM",
                emoji: {
                  name: "🗿"
                },
                state : "Not having an activity"
              };
            const permissions = member.permissions.toArray().map(perm => {
                return perm
                  .toLowerCase()
                  .replace(/_/g, " ") // Replace all underscores with spaces
                  .replace(/\w\S*/g, txt => {
                    // Capitalize the first letter of each word
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                  });
              });
              function trimArray(arr, maxLen = 25) {
                if ([...arr.values()].length > maxLen) {
                  const len = [...arr.values()].length - maxLen;
                  arr = [...arr.values()].sort((a, b) => b?.rawPosition - a.rawPosition).slice(0, maxLen);
                  arr.map(role => `<@&${role.id}>`)
                  arr.push(`${len} more...`);
                }
                return arr.join(", ");
              }
            //create the EMBED
            const embeduserinfo =  new MessageEmbed()
            embeduserinfo.setColor(ee.color)
            embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            embeduserinfo.setAuthor({name: "Information about:   " + member.user.username + "#" + member.user.discriminator, iconURL: member.displayAvatarURL({dynamic:true, size: 4096})})
            embeduserinfo.addFields({name: '**❱ Username**', value: `\`${member.user.tag}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Nickname**', value: `${member.nickname ? member.nickname : "`none`"}`, inline: true})
            embeduserinfo.addFields({name: '**❱ ID**', value: `\`${member.id}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Created at**', value: "\`" + moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",inline: true})
            embeduserinfo.addFields({name: '**❱ Joined Server**', value: "\`" + moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.joinedTimestamp).format("hh:mm:ss") + "\`", inline: true})
            embeduserinfo.addFields({name: '**❱ Badge**', value: `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Status**', value: `\`${statuses[member.presence ? member.presence.status : "offline"]} ${member.presence ? member.presence.status : "offline"}\``,inline: true})
            embeduserinfo.addFields({name: '**❱ Highest Role:**', value: `${member.roles.highest.id === interaction.guild.id ? 'None' : member.roles.highest}`, inline: true})
            embeduserinfo.addFields({name: '**❱ Is a Bot**', value: `\`${member.user.bot ? "✔️" : "❌"}\``, inline: true})
            var userstatus = "Not having an activity";
            if(activity){
                if(activity.type === "CUSTOM"){
                  let emoji = `${activity.emoji ? activity.emoji?.id  ? `<${activity.emoji?.animated ? "a": ""}:${activity.emoji?.name}:${activity.emoji?.id }>`: activity.emoji?.name : ""}`
                  userstatus = `${emoji} \`${activity.state || "Not having an acitivty."}\``
                }
                else{
                  userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
                }
              }
            embeduserinfo.addFields({name: '**❱ Activity:**', value: `${userstatus}`})
            embeduserinfo.addFields({name: '**❱ Permissions:**', value: `\`${permissions}\``})
            embeduserinfo.addFields({name: `❱ [${roles.cache.size}] Roles`,value: `${roles.cache.size < 25 ? [...roles.cache.values()].sort((a, b) => b?.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(' ') : roles.cache.size > 25 ? trimArray(roles.cache) : "`None`"}`})
            embeduserinfo.setFooter({text: `request by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
          let fetchUser = await client.users.fetch(member.id);
          await fetchUser.fetch();
          if(fetchUser.bannerURL() !== null) {
            embeduserinfo.setImage(fetchUser.bannerURL({ dynamic: true, size: 4096}))
            interaction.followUp({ embeds: [embeduserinfo] });
            }
            if(fetchUser.bannerURL() == null){
              interaction.followUp({ embeds: [embeduserinfo] });
            }
        }
        if(sub === "avatar") { 
            let user = interaction.options.getUser("user") || interaction.user;
            let member = interaction.guild.members.cache.get(user.id)

            let embed = new MessageEmbed()
            .setTitle(`${member.nickname ? member.nickname : member.user.username} Avatar`)
            .setColor(ee.color)
            .setTimestamp()
            .setImage(member.displayAvatarURL({dynamic: true, size: 4096}))
            .addFields([
              {
                  name: "❱ PNG",
                  value: `[\`LINK\`](${user.displayAvatarURL({ format: "png", size: 4096 })})`,
                  inline: true
              },
              {
                  name: "❱ JPG",
                  value: `[\`LINK\`](${user.displayAvatarURL({ format: "jpg", size: 4096 })})`,
                  inline: true
              },
              {
                  name: "❱ JPEG",
                  value: `[\`LINK\`](${user.displayAvatarURL({ format: "jpg", size: 4096 })})`,
                  inline: true
              },
              {
                  name: "❱ WEBP",
                  value: `[\`LINK\`](${user.displayAvatarURL({ format: "webp", size: 4096 })})`,
                  inline: true
              }
          ])

            return interaction.followUp({embeds: [embed]})
        }

        if(sub === "permisions") {
          let users = interaction.options.getUser("user") || interaction.user;
          let members = interaction.guild.members.cache.get(users.id)
          const permissions = members.permissions.toArray().map(perm => {
            return perm
              .toLowerCase()
              .replace(/_/g, " ") // Replace all underscores with spaces
              .replace(/\w\S*/g, txt => {
                // Capitalize the first letter of each word
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              });
          });
          return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).addFields({name: "**❱ Member:**", value: `\`${members.user.tag}\``}).addFields({name: '**❱ Permissions:**', value: `\`${permissions}\``}).setThumbnail(members.displayAvatarURL({dynamic: true}))]})
        }
        if(sub === "banner"){
          let users = interaction.options.getUser("user") || interaction.user
          let fetchUser = await client.users.fetch(users.id);
          await fetchUser.fetch();
          if(fetchUser.bannerURL() !== null) {
            let embed = new MessageEmbed()
            .setColor(ee.color)
            .setAuthor({name: `${fetchUser.tag} banner`,iconURL: fetchUser.displayAvatarURL({dynamic: true}), url: fetchUser.bannerURL({dynamic: true, size: 4096})})
            .setImage(fetchUser.bannerURL({ dynamic: true, size: 4096}))
            .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})});
            interaction.followUp({ embeds: [embed] });
            }
            if(fetchUser.bannerURL() == null){
              let nobanner = new MessageEmbed()
              .setColor(ee.color)
              .setDescription(`\`${fetchUser.tag} doesn't have a banner\``)
              return interaction.followUp({ embeds: [nobanner] });
            }
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
};