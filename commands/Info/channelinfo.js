const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require('moment');

let channelTypes = {
    "GUILD_TEXT": "Text",
    "GUILD_VOICE": "Voice",
    "GUILD_NEWS": "Announcement",
    "GUILD_STAGE_VOICE": "Stage Voice"
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
            
            var role = message.mentions.channels.first() || message.guild.channels.cache.find(ch => ch.name.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.guild.channels.cache.find(ch => ch.id === args[0])

            if (!role) return message.reply({ allowedMentions: false,embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Channel Not Found`)]})


            //create the EMBED
            const embeduserinfo =  new MessageEmbed()
            embeduserinfo.setColor(ee.color)
            embeduserinfo.addField('**❱ Name:**', `\`${role.name}\``, true)
            embeduserinfo.addField('**❱ ID:**', `\`${role.id}\``, true)
            embeduserinfo.addField('**❱ Type **', `\`${channelTypes[role.type]}\``, true)
            embeduserinfo.addField(`**❱ Description **`, `\` ${role.topic ? role.topic: "no Description"} \``, true)
            embeduserinfo.addField('**❱ Date Created:**', "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", true)
            embeduserinfo.addField('**❱ Position:**', `\`${role.rawPosition}\``, true)
            embeduserinfo.addField('**❱ Manageable:**', `\`${role.manageable ? "✔️" : "❌"}\``, true)
            embeduserinfo.addField(`**❱ NSMW **`, `\`${role.nsfw ? "✔️" : "❌"}\``, true)
            embeduserinfo.setThumbnail(message.guild.iconURL())
            embeduserinfo.setFooter(`request by: ${message.author.tag}`, message.author.displayAvatarURL())
            //send the EMBED        
            message.reply({embeds: [embeduserinfo]})
        } catch (e) {
            message.channel.send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`\`${e.message}\``)]})

        }
    }
}