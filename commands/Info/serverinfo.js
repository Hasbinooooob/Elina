const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require("moment")


module.exports = {
    name: 'serverinfo',
    aliases: ["serverstats"],
    category: 'Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show Information Of Server',
    usage: 'serverinfo',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
      
            function trimArray(arr, maxLen = 40) {
                if ([...arr.values()].length > maxLen) {
                  const len = [...arr.values()].length - maxLen;
                  arr = [...arr.values()].sort((a, b) => b?.rawPosition - a.rawPosition).slice(0, maxLen);
                  arr.map(role => `<@&${role.id}>`)
                  arr.push(`${len} more...`);
                }
                return arr.join(", ");
              }

            
            await message.guild.members.fetch();
            function emojitrimarray(arr, maxLen = 20) {
                if (arr.length > maxLen) {
                    const len = arr.length - maxLen;
                    arr = arr.slice(0, maxLen);
                    arr.push(`${len} more...`);
                }
                return arr.join(", ");
            }

            const verificationLevels = {
                NONE: 'None',
                LOW: 'Low',
                MEDIUM: 'Medium',
                HIGH: 'High',
                VERY_HIGH: 'Very High'
            };

            let emoji = message.guild.emojis.cache;

            let guildDescription = message.guild.description
                ? message.guild.description
                : null;

                let role = message.guild.roles;

                const userRoles = role.cache
.filter((role) => role.id !== message.guild.id).sort((a, b) => b.rawPosition - a.rawPosition).map((roles) => roles.toString()).join(", ")


            let boosts = message.guild.premiumSubscriptionCount;
            var boostlevel = 0;
            if (boosts >= 2) boostlevel = "1";
            if (boosts >= 15) boostlevel = "2";
            if (boosts >= 30) boostlevel = "3 / ∞";
            let maxbitrate = 96000;
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;

            let owner = message.guild.members.cache.get(message.guild.ownerId)?.user
            let embed = new MessageEmbed()
                .setColor(ee.color)
                .setAuthor({name: "Server Information About: " + message.guild.name, iconURL: message.guild.iconURL({ dynamic: true})})
                .addField("❱ Owner", `${owner}\n\`${owner.tag}\``, true)
                .addField("❱ Created On", "\`" + moment(message.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(message.guild.createdTimestamp).format("hh:mm:ss") + "`", true)
                .addField("❱ Category Channels", "\`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_CATEGORY").size + "\`", true)
                .addField("❱ All Channels", "\`" + message.guild.channels.cache.size + "\`", true)
                .addField("❱ Text Channels", "\`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size + "\`", true)
                .addField("❱ Voice Channels", "\`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size + "\`", true)
                .addField("❱ Stage Channels", "\`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_STAGE_VOICE").size + "\`", true)
                .addField("❱ Rules Channels",   `${message.guild.rulesChannel ? message.guild.rulesChannel : "`none`"}`, true)
                .addField("❱ Announcement Channels", `\` ${message.guild.channels.cache.filter((ch) => ch.type === "GUILD_NEWS").size} \``, true)
                .addField("❱ AFK Channels", `${message.guild.afkChannel ? message.guild.afkChannel : "`none`"}`, true)
                .addField("❱ Total Members", `\`${message.guild.memberCount} / ${message.guild.maximumMembers}\``, true)
                .addField("❱ Total Humans", " \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
                .addField("❱ Total Bots", "\`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", true)
                .addField("❱ ONLINE", "\`" + message.guild.members.cache.filter(member => member.presence && member.presence && member.presence.status != "offline").size + "\`", true)
                .addField("❱ OFFLINE", "\`" + message.guild.members.cache.filter(member => !member.presence || member.presence && member.presence.status == "offline").size + "\`", true)
                .addField("❱ Total Boosts", "\`" + message.guild.premiumSubscriptionCount + "\`", true)
                .addField("❱ Boost Level", "\`" + boostlevel + "\`", true)
                .addField("❱ Verification Level", `\`${verificationLevels[message.guild.verificationLevel]}\``,true)
                .addField("❱ Max-Talk-Bitrate", "\`" + maxbitrate + " kbps\`", true)
                .addField(`❱ [${message.guild.emojis.cache.size}] Emojis: `, `**Regular: ${emoji.filter(emo => !emo.animated).size}\nAnimated: ${emoji.filter(em => em.animated).size}**`, true)
                .addField(`❱ Stickers`, `\` ${message.guild.stickers.cache.size} \``, true)
                .addField(`❱ [${message.guild.roles.cache.size}] Roles: `, message.guild.roles.cache.size < 25 ? message.guild.roles.cache.filter((roles) => roles.id !== message.guild.id).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(", ") : message.guild.roles.cache.size > 25 ? trimArray(message.guild.roles.cache) : 'None')
                .setThumbnail(message.guild.iconURL({ dynamic: true}))
                .setFooter({text: "ID: " + message.guild.id, iconURL: message.guild.iconURL({ dynamic: true })})
                if(!message.guild.banner) {
                    message.reply({embeds: [embed]})
                } 
                if(message.guild.banner) {
                    embed.setImage(message.guild.fetch(true).then(async g => g.bannerURL({size: 4096})))
                    message.reply({embeds: [embed]})
                }
        } catch (e) {
            message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`${e.message}`)]}).then(() => {
                    console.log(e.stack)
                })
        }
    }
}