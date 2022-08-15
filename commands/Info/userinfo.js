const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require("moment");
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
    name: 'userinfo',
    aliases: ["whois", "ui"],
    category: 'Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show Information Of User',
    usage: '[command] [USER] ',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args.join(" ").toLocaleLowerCase())?.user || message.author;
            if (!user) return message.reply("User Not Found");
            const member = message.guild.members.cache.get(user.id);
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
                  arr.push(`${len} \`more...\``);
                }
                return arr.join(" ");
              }
            const embeduserinfo =  new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setAuthor({name: "Information about:   " + member.user.username + "#" + member.user.discriminator, iconURL: member.displayAvatarURL({dynamic:true, size: 4096})})
            embeduserinfo.addFields({name: '**❱ Username**', value: `\`${member.user.tag}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Nickname**', value: `${member.nickname ? member.nickname : "`none`"}`, inline: true})
            embeduserinfo.addFields({name: '**❱ ID**', value: `\`${member.id}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Created at**', value: "\`" + moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",inline: true})
            embeduserinfo.addFields({name: '**❱ Joined Server**', value: "\`" + moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.joinedTimestamp).format("hh:mm:ss") + "\`", inline: true})
            embeduserinfo.addFields({name: '**❱ Badge**', value: `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Status**', value: `\`${statuses[member.presence ? member.presence.status : "offline"]} ${member.presence ? member.presence.status : "offline"}\``,inline: true})
            embeduserinfo.addFields({name: '**❱ Highest Role:**', value: `${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`, inline: true})
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
            embeduserinfo.addFields({name: `❱ [${roles.cache.size}] Roles`,value: `${roles.cache.size < 25 ? [...roles.cache.values()].sort((a, b) => b?.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(' ') : roles.cache.size > 25 ? trimArray(roles.cache) : "None"}`})
            embeduserinfo.setFooter({text: `request by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
            let fetchUser = await client.users.fetch(member.id);
          await fetchUser.fetch();
          if(fetchUser.bannerURL() !== null) {
            embeduserinfo.setImage(fetchUser.bannerURL({ dynamic: true, size: 4096}))
            message.reply({ embeds: [embeduserinfo] });
            }
            if(fetchUser.bannerURL() == null){
              message.reply({ embeds: [embeduserinfo] });
            }
        } catch (e) {
            console.log(e.stack)
            message.channel.send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`${e.message}`)]})
        }
    }
}
