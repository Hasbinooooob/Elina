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
 .setColor("F037A5")
            embeduserinfo.setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            embeduserinfo.addField('**❱ Name:**', `\`${role.name}\``, true)
            embeduserinfo.addField('**❱ ID:**', `\`${role.id}\``, true)
            embeduserinfo.addField('**❱ Hex Color:**', `\`${role.hexColor}\``, true)
            embeduserinfo.addField('**❱ Date Created:**', "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", true)
            embeduserinfo.addField('**❱ Position:**', `\`${role.rawPosition}\``, true)
            embeduserinfo.addField('**❱ MemberCount:**', `\`${role.members.size} Members have it\``, true)
            embeduserinfo.addField('**❱ Hoisted:**', `\`${role.hoist ? "✔️" : "❌"}\``, true)
            embeduserinfo.addField('**❱ Mentionable:**', `\`${role.mentionable ? "✔️" : "❌"}\``, true)
            embeduserinfo.addField('**❱ Permissions:**', `\`${permissions}\``)
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