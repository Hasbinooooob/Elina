const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'ban',
    aliases: [],
    category: 'Moderation',
    memberpermissions: ['BAN_MEMBERS'],
    cooldown: 5,
    description: 'Ban a User From Guild',
    usage: 'ban + <@user> + <reason>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        // if not a member
        if (!member) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`**Please Mention a User to Ban**`)
                .setDescription(`> Usage =  ${prefix}ban + <@user> + <reason>`)]})
        }

        // if member role not high
        if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`** Your Role is Not High To Ban this User **`)]})

        let reason = args.slice(1).join(" ")

        // if not a Role
        if (!reason) {
            reason = "no reason"
        }
        // add role to user
        if (member) {
            await member.ban(reason)
            message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`> <@${member.user.id}> Banned From Server \n\n > Reason = \`\`${reason}\`\``)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter(`Banned by ${message.author.username}`)]})
        }


    }
}