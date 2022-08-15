const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
module.exports = {
    name: 'send',
    aliases: [],
    category: 'Owner',
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
        if(message.author.id !== "779348805920227358") return;
        const chID = args[0]
        if(isNaN(chID)) return message.delete()
        const channel = client.channels.cache.get(chID)
        if(!channel) return message.delete()
        const reason = args.slice(1).join(" ")
        if(!reason) return message.delete()
        message.delete()
        channel.send(reason)
    }
}