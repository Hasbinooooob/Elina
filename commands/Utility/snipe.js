const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const snipes = require("../../events/snipe")
const ee = require('../../config/embed.json')
module.exports = {
    name: 'snipe',
    aliases: [],
    category: 'Utility',
    memberpermissions: ["MANAGE_MESSAGES"],
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
        if(!sniped) return message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription('`no message deleted`')]})
        let embed = new MessageEmbed()
        .setAuthor({name: `message by: ${sniped.author.tag}`, iconURL: sniped.author.displayAvatarURL()})
        .addFields({name: "message", value: `${sniped.content}`})
        .setTimestamp()
        .setColor("F037A5")
        .setFooter({text: `request by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})

        embed.addFields(
            {
                name: "FILE", value: sniped.Link ? sniped.Link: "none"
            }
        )
        message.reply({embeds: [embed]})
        } catch (e){
            console.log(e.stack)
        }
    }
}