const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'leaveserver',
    aliases: [''],
    category: ' ',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        if (message.author.id !== "779348805920227358") return

        const guildId = args[0];

        if (!args.length) return message.channel.send({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription("** Please Provide an Guild ID **")]}).then((msg => {
            setTimeout(() => {
                msg.delete()
            }, 10000);
        }))

        const guild = client.guilds.cache.find((g) => g.id === guildId) || client.guilds.cache.find((g) => g.name.toLowerCase() == args.join(" ").toLocaleLowerCase())

        if (!guild) return message.channel.send({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription("** This Guild Not Found .. **")]}).then((msg => {
            setTimeout(() => {
                msg.delete()
            }, 10000);
        }))

        try {

        let leaved = await guild.leave()
        
        if (leaved) {
            return message.channel.send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Successfully left guild: **${guild.name}**`)
                .setFooter({text: "leaving.."})]})
        } else {
            message.channel.send('i cant do....')
        }
            
        } catch (error) {
            console.log(error.stack)
            message.channel.send({embeds: [new MessageEmbed().setDescription(`\`${error.message}\``)]})
        }
    }
}