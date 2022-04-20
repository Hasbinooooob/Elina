const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

const canva = require("canvacord")

module.exports = {
    name: 'trigger',
    aliases: [],
    category: 'Image',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: 'trigger / trigger <user>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let user = message.mentions.members.first()?.user || message.guild.members.cache.get(args[0])?.user || message.author

        let avatar = user.displayAvatarURL({dynamic: true, size: 4096, format: "png"})
        let image = await canva.Canvacord.trigger(avatar)
        let attacth = new MessageAttachment(image, "trigger.gif")
        return message.channel.send({files: [attacth]})
    }
}