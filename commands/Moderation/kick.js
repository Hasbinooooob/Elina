const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
module.exports = {
    name: 'kick',
    aliases: [],
    category: 'Moderation',
    memberpermissions: ['KICK_MEMBERS'],
    cooldown: 5,
    description: 'Ban a User From Guild',
    usage: '[command] + <@user> + <reason>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`**Please Mention a User to kick**`)
                .setDescription(`> Usage =  ${prefix}kick + <@user> + <reason>`)]})
        }
      if(member.roles.highest.position >= message.member.roles.highest.position) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("Your Role is Not High To kick this User")]})
      if(member.roles.highest.position >= message.guild.me.roles.highest.position) return interaction.followUp({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`**My Role is Not High To kick this User!**`)]})
        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "no reason"
        }
        await member.kick(reason)
            message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`<@${member.user.id}> Kicked From Server \n\n > Reason = \`\`${reason}\`\``)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({text: `Kicked by ${message.author.username}`})]})
    }
}