const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'servericon',
    aliases: ["iconserver"],
    category: 'Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show User Avatar',
    usage: '[Command]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let guild = message.guild
        let embed = new MessageEmbed()
        .setTitle(`${guild.name} Icon`)
        .setImage(guild.iconURL({dynamic: true, size: 4096}))
        .addFields([
            {
                name: "❱ PNG",
                value: `[\`LINK\`](${guild.iconURL({ format: "png", size: 4096 })})`,
                inline: true
            },
            {
                name: "❱ JPG",
                value: `[\`LINK\`](${guild.iconURL({ format: "jpg", size: 4096 })})`,
                inline: true
            },
            {
                name: "❱ JPEG",
                value: `[\`LINK\`](${guild.iconURL({ format: "jpg", size: 4096 })})`,
                inline: true
            },
            {
                name: "❱ WEBP",
                value: `[\`LINK\`](${guild.iconURL({ format: "webp", size: 4096 })})`,
                inline: true
            }
        ])
        .setColor(ee.color)
        message.reply({embeds: [embed]}) 
    }
}