const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require('ms');

module.exports = {
    name: 'timeout',
    aliases: [],
    category: 'Moderation',
    memberpermissions: ['MODERATE_MEMBERS'],
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
            .setDescription(`** Your Role is Not High To Timeout this User **`)]})

            let time = args[1]
            if(!time) return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`**Please Mention a User to Ban**`)
                .setDescription(`> Usage =  ${prefix}timeout + <@user> + <time> <reason>`)]})

     let msTime = ms(time)
      if(!msTime) return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Please specify a valid time!**`)
        .setDescription(`> Usage =  ${prefix}timeout + <@user> + <time> <reason>`)]})



        let reason = args.slice(2).join(" ")

        // if not a Role
        if (!reason) {
            reason = "no reason"
        }
        // add role to user
        if (member) {
            await member.timeout(msTime, reason)
            message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`> <@${member.user.id}> has been timeout From Server \n\n > Reason = \`\`${reason}\`\`\n > Time = ${time}`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter(`requested by ${message.author.username}`)]})
        }


    }
}