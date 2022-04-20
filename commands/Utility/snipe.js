const { Client, Message, MessageEmbed, Collection } = require('discord.js');

const snipes = require("../../events/snipe")


module.exports = {
    name: 'snipe',
    aliases: [],
    category: '🛑 Others',
    memberpermissions: [],
    cooldown: 5,
    description: 'snipe command',
    usage: 'snipe',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            const sniped = snipes.get(message.channel.id)
        if(!sniped) return message.lineReply("no message deleted")

        let embed = new MessageEmbed()
        .setAuthor(`message by: ${sniped.author.tag}`, sniped.author.displayAvatarURL())
        .addField("message", `${sniped.content}`)
        .addField("FILE", `[LINK](${sniped.Link})`)
        .setTimestamp()
        .setColor("F037A5")
        .setFooter(`request by: ${message.author.tag}`, message.author.displayAvatarURL())

        message.reply({embeds: [embed]})
        } catch (e){
            console.log(e.stack)
        }
    }
}