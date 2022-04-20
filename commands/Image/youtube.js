const { Client, Message, MessageEmbed,MessageAttachment } = require('discord.js');
const canva = require("canvacord")

module.exports = {
    name: 'youtube',
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
        let text = args.join(" ")
        if (!text) return message.reply({allowedMentions: false, embeds: [new MessageEmbed().setTitle("Please provide valid text").setColor(ee.color)]}).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })
        let user = message.mentions.members.first()?.user || message.guild.members.cache.get(args[0])?.user || message.author
        let avatar = user.displayAvatarURL({dynamic: false, size: 4096, format: "png"})
        let image = await canva.Canvacord.youtube({username: user.username, content: text, avatar: avatar, dark: false})
        let attacth = new MessageAttachment(image, "youtube.png")
        return message.channel.send({files: [attacth]})
    }
}