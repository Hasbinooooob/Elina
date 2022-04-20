const { Client, Message, MessageEmbed,MessageAttachment } = require('discord.js');

const DIG = require("discord-image-generation");

module.exports = {
    name: 'rip-2',
    aliases: [],
    category: 'Image',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let user = message.mentions.members.first()?.user || message.guild.members.cache.get(args[0])?.user || message.author

        let avatar = user.displayAvatarURL({dynamic: false, size: 4096, format: "png"})

        let image = await new DIG.Rip().getImage(avatar)
        
        let attacth = new MessageAttachment(image, "RIP.png")
        return message.channel.send({files: [attacth]})
        
    }
}