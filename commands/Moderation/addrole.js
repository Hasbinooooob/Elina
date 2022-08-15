const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
module.exports = {
    name: 'addrole',
    aliases: ['giverole'],
    category: 'Moderation',
    memberpermissions: ['MANAGE_ROLES'],
    description: 'Add role a user',
    usage: 'addrole + <@user> + <@role>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`**Please Mention a User to Give role**`)
                .setDescription(`> Usage =  ${prefix}addrole + <@user> + <@role>`)]})
        }
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if (!role) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`**Please Mention a Role **`)]})
        }
        if (role.managed) {
            return message.channel.send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`** Cannot add That Role to This User **`)]})
         }
        if(member.roles.highest.position >= message.member.roles.highest) return message.reply({embeds: [new MessageEmbed().setDescription(`** Your Role is Not High To add role this User **`).setColor(ee.color)]})
        if(message.member.roles.highest.position <= role.position) return message.reply({embeds: [new MessageEmbed().setDescription("`Current Role is Higher Than You, Cannot Add It to User!`").setColor(ee.color)]})
        if(message.guild.me.roles.highest.position <= role.position) return message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`Role Is Currently Higher Than Me Therefore Cannot Add It To The User!`")]})
        if(member.roles.cache.has(role.id)) return message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`this user already has that role`")]})
        message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`${role} Role Has Been Added to <@${member.user.id}>`).setFooter({text: `Role added by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setThumbnail(member.displayAvatarURL({dynamic: true}))]})
        } catch (error) {
            console.log(error.stack)
            message.channel.send({embeds: [new MessageEmbed().setDescription(`\`${error.message}\``).setColor(ee.wrongcolor)]})
        }
    }
}