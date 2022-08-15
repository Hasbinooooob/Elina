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
            function trimArray(arr, maxLen = 20) {
                if ([...arr.values()].length > maxLen) {
                  const len = [...arr.values()].length - maxLen;
                  arr = [...arr.values()].sort((a, b) => b?.rawPosition - a.rawPosition).slice(0, maxLen);
                  arr.map(role => `<@&${role.id}>`)
                  arr.push(`${len} \`more...\``);
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
            const nsfwLevels = {
                DEFAULT: "Default",
                EXPLICIT: "Explicit",
                SAFE: "Safe",
                AGE_RESTRICTED: "Age Restricted"
            }
            let emoji = message.guild.emojis.cache;
            let guildDescription = message.guild.description
                ? message.guild.description
                : "none"
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
                .addFields({name: "❱ Owner", value: `${owner}\n\`${owner.tag}\``, inline: true})
                .addFields({name: "❱ Description", value: `\`${guildDescription}\``, inline: true})
                .addFields({name: "❱ Created at", value: "\`" + moment(message.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(message.guild.createdTimestamp).format("hh:mm:ss") + "`", inline: true})
                .addFields({name: "❱ All Channels", value: "\`" + message.guild.channels.cache.size + "\`", inline: true})
                .addFields({name: "❱ Category Channels", value: "\`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_CATEGORY").size + "\`", inline: true})
                .addFields({name: "❱ Text Channels", value: "\`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size + "\`", inline: true})
                .addFields({name: "❱ Voice Channels", value: "\`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size + "\`", inline: true})
                .addFields({name: "❱ Total Members", value: `\`${message.guild.memberCount} / ${message.guild.maximumMembers}\``, inline: true})
                .addFields({name: "❱ Total Humans", value: " \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", inline: true})
                .addFields({name: "❱ Total Bots", value: "\`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", inline: true})
                .addFields({name: "❱ ONLINE", value: "\`" + message.guild.members.cache.filter(member => member.presence && member.presence && member.presence.status != "offline").size + "\`", inline: true})
                .addFields({name: "❱ OFFLINE", value: "\`" + message.guild.members.cache.filter(member => !member.presence || member.presence && member.presence.status == "offline").size + "\`", inline: true})
                .addFields({name: "❱ Total Boosts",  value: "\`" + message.guild.premiumSubscriptionCount + "\`", inline: true})
                .addFields({name: "❱ Boost Level", value: "\`" + boostlevel + "\`", inline: true})
                .addFields({name: "❱ Verification Level", value: `\`${verificationLevels[message.guild.verificationLevel]}\``, inline: true})
                .addFields({name: "❱ NSFW Level", value: `\` ${nsfwLevels[message.guild.nsfwLevel]} \``, inline: true})
                .addFields({name: "❱ Max-Talk-Bitrate", value: "\`" + maxbitrate + " kbps\`", inline: true})
                .addFields({name: `❱ [${message.guild.emojis.cache.size}] Emojis: `, value: `**Regular: ${emoji.filter(emo => !emo.animated).size}\nAnimated: ${emoji.filter(em => em.animated).size}**`, inline: true})
                .addFields({name: `❱ Stickers`, value: `\` ${message.guild.stickers.cache.size} \``, inline: true})
                .addFields({name: `❱ [${message.guild.roles.cache.size}] Roles: `, value: `${message.guild.roles.cache.size < 20 ? message.guild.roles.cache.filter((roles) => roles.id !== message.guild.id).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(", ") : message.guild.roles.cache.size > 20 ? trimArray(message.guild.roles.cache) : 'None'}`})
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