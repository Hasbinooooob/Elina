const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const esnipe = require("../../events/esnipe")
module.exports = {
    name: 'editsnipe',
    aliases: ["esnipe"],
    category: 'Utility',
    memberpermissions: [],
    cooldown: 5,
    description: 'editsnipe command',
    usage: '[command]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            let snipe = esnipe.get(message.channel.id)
            if(!snipe) return message.reply("There is nothing to snipe!")
            let embed = new MessageEmbed()
            .setAuthor(`message by ${snipe.author.tag}`, snipe.author.displayAvatarURL(), snipe.tele)
            .setColor("F037A5")
            .setTimestamp()
            .addField("old message", snipe.old)
            .addField("new message", snipe.update)
            .setFooter(`requested by ${message.author.tag}`, message.author.displayAvatarURL())
            message.reply({embeds: [embed]})
        } catch (e){
            console.log("bruh")
        }
    }
}