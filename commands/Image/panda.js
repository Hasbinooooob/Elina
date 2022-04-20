const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

const gen = require("images-generator")

module.exports = {
    name: 'panda',
    aliases: [],
    category: '',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '[command]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setTimestamp()
        .setColor("F037A5")
        .setImage(await gen.animal.panda())
        return message.reply({embeds: [embed]})
    }
}