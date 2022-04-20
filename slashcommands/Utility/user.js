const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Activity  } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
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
            embeduserinfo.addField('**❱ Username:**', `<@${member.user.id}>\n\`${member.user.tag}\``, true)
            embeduserinfo.addField('**❱ ID:**', `\`${member.id}\``, true)
            embeduserinfo.addField('**❱ Avatar:**', `[\`Link to avatar\`](${member.user.displayAvatarURL({size: 4096, dynamic: true})})`, true)
            embeduserinfo.addField('**❱ Registered:**', "\`" + moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`", true)
            embeduserinfo.addField('**❱ Date Join Server:**', "\`" + moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.joinedTimestamp).format("hh:mm:ss") + "\`", true)
            embeduserinfo.addField('**❱ Flags:**', `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``, true)
            embeduserinfo.addField('**❱ Status:**', `\`${statuses[member.presence ? member.presence.status : "offline"]} ${member.presence ? member.presence.status : "offline"}\``,true)
            embeduserinfo.addField('**❱ Highest Role:**', `${member.roles.highest.id === interaction.guild.id ? 'None' : member.roles.highest}`, true)
            embeduserinfo.addField('**❱ Is a Bot:**', `\`${member.user.bot ? "✔️" : "❌"}\``, true)
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
            embeduserinfo.addField('**❱ Activity:**', `${userstatus}`)
            embeduserinfo.addField('**❱ Permissions:**', `\`${permissions}\``)
            embeduserinfo.addField(`❱ [${roles.cache.size}] Roles: `, roles.cache.size < 25 ? [...roles.cache.values()].sort((a, b) => b?.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : "None")
            embeduserinfo.setFooter({text: `request by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
            if(!member.user.banner) {
                interaction.followUp({embeds: [embeduserinfo]})
            } 
            if(member.user.banner) {
            embeduserinfo.setImage(member.user.fetch(true).then(async m => m.bannerURL({dynamic: true, size: 4096})))
            interaction.followUp({embeds: [embeduserinfo]})
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
            .addField("❱ PNG", `[\`LINK\`](${member.displayAvatarURL({ format: "png", size: 4096 })})`, true)
            .addField("❱ JPG", `[\`LINK\`](${member.displayAvatarURL({ format: "jpg", size: 4096 })})`, true)
            .addField("❱ JPEG", `[\`LINK\`](${member.displayAvatarURL({ format: "jpg", size: 4096 })})`, true)
            .addField("❱ WEBP", `[\`LINK\`](${member.displayAvatarURL({ format: "webp", size: 4096 })})`, true)

            interaction.followUp({embeds: [embed]})
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