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

        // if not a member
        if (!member) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`**Please Mention a User to Give role**`)
                .setDescription(`> Usage =  ${prefix}addrole + <@user> + <@role>`)]})
        }


        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        // if not a Role
        if (!role) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`**Please Mention a Role **`)]})
        }

        if (role.managed) {
            return message.channel.send(
                 new MessageEmbed()
                     .setColor(ee.color)
                     .setDescription(`** Cannot add That Role to This User **`)
            )
         }

        // // if role is high
        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.reply({ allowedMentions: false,embeds: [new MessageEmbed().setColor(ee.color).setDescription("`Cannot Add Role To This User`")]})

        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.reply({allowedMentions: false, embeds: [new MessageEmbed().setDescription("`Role Is Currently Higher Than Me Therefore Cannot Add It To The User!`").setColor(ee.color)]})

        // add role to user
        if (!member.roles.cache.has(role.id)) {
            await member.roles.add(role.id);
            message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`${role} Role Has Been Added to <@${member.user.id}>`)
                .setFooter(`Role added by ${message.author.username}`)]})
        }
            
        } catch (error) {
            console.log(error.stack)
            message.channel.send({embeds: [new MessageEmbed().setDescription(`\`${error.message}\``).setColor(ee.wrongcolor)]})

        }

        


    }
}