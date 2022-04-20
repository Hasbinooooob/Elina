const { Client, Message, MessageEmbed,MessageAttachment } = require('discord.js');
const canva = require("canvacord")

module.exports = {
    name: 'affect',
    aliases: [],
    category: 'Image',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: 'affect <user>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let user = message.mentions.members.first()?.user || message.guild.members.cache.get(args[0])?.user || message.author

        let avatar = user.displayAvatarURL({dynamic: false, size: 4096, format: "png"})
        let image = await canva.Canvacord.affect(avatar)
        let attacth = new MessageAttachment(image, "affect.png")
        return message.channel.send({files: [attacth]})
    }
}