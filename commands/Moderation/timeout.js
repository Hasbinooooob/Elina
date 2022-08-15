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
    usage: '[command] + <@user> + <time> <reason>',
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
                .setTitle(`**Please Mention a User to Timeout**`)
                .setDescription(`> Usage =  ${prefix}timeout + <@user> + <time> <reason>`)]})
        }
        if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`** Your Role is Not High To Timeout this User **`)]})
            let time = args[1]
            if(!time) return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`> Usage =  ${prefix}timeout + <@user> + <time> <reason>`)]})
     let msTime = ms(time)
      if(!msTime) return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Please specify a valid time!**`)
        .setDescription(`> Usage =  ${prefix}timeout + <@user> + <time> <reason>`)]})
        let reason = args.slice(2).join(" ")
        if (!reason) {
            reason = "no reason"
        }
    if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("Your Role is Not High To timeout this User")]})
    if(member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`**My Role is Not High To timeout this User!**`)]})
        member.timeout(msTime, reason).then(async () => {
        message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`${member} has been timeout\n time: \`${time}\`\n reason: \`${reason}\``)]})
      })
    }
}