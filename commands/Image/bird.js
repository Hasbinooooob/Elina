const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

const gen = require("images-generator")

module.exports = {
    name: 'bird',
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
        let image = await gen.animal.bird()
        let attach = new MessageAttachment(image, "random-bird.png")
        return message.reply({files: [attach]})
    }
}