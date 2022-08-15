const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
module.exports = {
    name: 'bans',
    aliases: [],
    category: 'Moderation',
    memberpermissions: ['ADMINISTRATOR', 'BAN_MEMBERS'],
    cooldown: 5,
    description: 'Fetch all Banned User',
    usage: '[COMMAND]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const Banned = (await message.guild.bans.fetch()).map((member) => member.user.tag).join(`\n`)
        message.reply({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`\`${Banned || "none"}\``)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))]})
    }
}