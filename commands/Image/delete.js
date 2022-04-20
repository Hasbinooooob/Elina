const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

const canva = require("canvacord")

module.exports = {
    name: 'delete',
    aliases: [],
    category: 'Image',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: 'delete / delete <user>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let user = message.mentions.members.first()?.user || message.guild.members.cache.get(args[0])?.user || message.author

        let avatar = user.displayAvatarURL({dynamic: true, size: 4096, format: "png"})
        let image = await canva.Canvacord.delete(avatar, true)
        let attacth = new MessageAttachment(image, "delete.png")
        return message.channel.send({files: [attacth]})
    }
}