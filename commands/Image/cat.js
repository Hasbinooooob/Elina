const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

const gen = require("images-generator")

module.exports = {
    name: 'cat',
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
        let image = await gen.animal.cat()
        let attach = new MessageAttachment(image, "random-cat.png")
        return message.reply({files: [attach]})
    }
}