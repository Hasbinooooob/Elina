const { Client, Message, MessageEmbed } = require('discord.js');
const { getSFWImage } = require('waifu.pics-wrapper')
module.exports = {
    name: 'neko',
    aliases: [],
    category: 'Fun',
    memberpermissions: [],
    description: 'random neko images',
    usage: '[command]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        getSFWImage('neko').then(result => {
        const embed = new MessageEmbed()
        .setImage(result)
        .setTimestamp()
        .setFooter({text: `request by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setColor("F037A5")
        return message.channel.send({embeds: [embed]})
        }).catch(e => console.log(e));
    }
}