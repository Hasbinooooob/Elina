const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

const gen = require("images-generator")

module.exports = {
    name: 'dog',
    aliases: [],
    category: '',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: 'cat',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let embed = new MessageEmbed()
        .setTimestamp()
        .setColor("F037A5")
        .setImage(await gen.animal.dog())
        return message.reply({embeds: [embed]})
    }
}