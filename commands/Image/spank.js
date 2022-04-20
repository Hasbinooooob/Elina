const { Client, Message, MessageEmbed,MessageAttachment } = require('discord.js');
const canva = require("canvacord")

module.exports = {
    name: 'spank',
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
        try {
            let user_1 = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user || client.user
            if(!user_1) return message.reply({embeds: [new MessageEmbed().setDescription("usage: `E!spank [@user] [@user]`").setColor(ee.color).setTimestamp()], allowedMentions: {repliedUser: true}})
            let user_2 = message.mentions.users.last() || message.guild.members.cache.get(args[1])?.user || message.author
            if(!user_2) return message.reply({embeds: [new MessageEmbed().setDescription("usage: `E!spank [@user] [@user]`").setColor(ee.color).setTimestamp()], allowedMentions: {repliedUser: true}})
            let image = await canva.Canvacord.spank(user_1.displayAvatarURL({format: "png"}), user_2.displayAvatarURL({format: "png"}))
            let attach = new MessageAttachment(image, "spank.png")
            return message.channel.send({files: [attach]})
        } catch (error) {
            console.log(error.stack)
        }
    }
}