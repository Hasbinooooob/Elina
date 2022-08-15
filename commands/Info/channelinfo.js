const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require('moment');
let channelTypes = {
    "DM": "Dm",
    "GROUP_DM": "Group Dm",
    "GUILD_TEXT": "Text",
    "GUILD_VOICE": "Voice",
    "GUILD_NEWS": "News",
    "GUILD_NEWS_THREAD": "News Thread",
    "GUILD_STAGE_VOICE": "Stage Voice",
    "GUILD_PRIVATE_THREAD": "Private Thread",
    "GUILD_PUBLIC_THREAD": "Public Thread",
    "GUILD_STORE": "Store",
    "GUILD_DIRECTORY": "Directory"
}
module.exports = {
    name: 'channelinfo',
    aliases: ["chinfo"],
    category: 'Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show Info Of a Channel',
    usage: "channelinfo <#CHANNEL>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var channel = message.mentions.channels.first() || message.guild.channels.cache.find(ch => ch.name.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.guild.channels.cache.find(ch => ch.id === args[0])
            if (!channel) return message.reply({ allowedMentions: false,embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Channel Not Found`)]})
            const embeduserinfo =  new MessageEmbed()
            embeduserinfo.setColor(ee.color)
            embeduserinfo.addFields([
                {
                    name: "'**❱ Name **'",
                    value: `\`${channel.name}\``,
                    inline: true
                },
                {
                    name: "**❱ ID **'",
                    value: `\`${channel.id}\``,
                    inline: true
                },
                {
                    name: "**❱ Type **",
                    value: `\`${channelTypes[channel.type]}\``,
                    inline: true
                },
                {
                    name: "**❱ Description **",
                    value: `\` ${channel.topic ? channel.topic: "no Description"} \``,
                    inline: true
                },
                {
                    name: "**❱ Created **",
                    value: "\`" + moment(channel.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(channel.createdAt).format("hh:mm:ss") + "\`",
                    inline: true
                },
                {
                    name: "**❱ Position **",
                    value: `\`${channel.rawPosition}\``,
                    inline: true
                },
                {
                    name: "**❱ Manageable **",
                    value: `\`${channel.manageable ? "✔️" : "❌"}\``,
                    inline: true
                },
                {
                    name: "**❱ NSMW **",
                    value: `\`${channel.nsfw ? "✔️" : "❌"}\``,
                    inline: true
                }
            ])
            embeduserinfo.setThumbnail(message.guild.iconURL({dynamic: true}))
            embeduserinfo.setFooter({text: `request by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})    
            message.reply({embeds: [embeduserinfo]})
        } catch (e) {
            message.channel.send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`\`${e.message}\``)]})
        }
    }
}