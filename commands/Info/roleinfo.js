const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require('moment');
module.exports = {
    name: 'roleinfo',
    aliases: [],
    category: 'Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show Info Of a Role',
    usage: "roleinfo <@ROLE>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var roles = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() == args.join(" ").toLocaleLowerCase())
            if (!roles) return message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(`Role Not Found`)
            )
            const role = message.guild.roles.cache.get(roles.id)
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
            const embeduserinfo =  new MessageEmbed()
            embeduserinfo.setColor(ee.color)
            embeduserinfo.setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            embeduserinfo.addFields({name: '**❱ Name:**', value: `\`${role.name}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ ID:**', value: `\`${role.id}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Hex Color:**', value: `\`${role.hexColor}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Date Created:**', value: "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", inline: true})
            embeduserinfo.addFields({name: '**❱ Position:**', value: `\`${role.rawPosition}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ MemberCount:**', value: `\`${role.members.size} Members have it\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Hoisted:**', value: `\`${role.hoist ? "✔️" : "❌"}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Mentionable:**', value: `\`${role.mentionable ? "✔️" : "❌"}\``, inline: true})
            embeduserinfo.addFields({name: '**❱ Permissions:**', value: `\`${permissions}\``})
            embeduserinfo.setFooter({text:`requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
            //send the EMBED
            message.reply({embeds: [embeduserinfo]})
        } catch (e) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}