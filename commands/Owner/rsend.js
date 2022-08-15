const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
module.exports = {
    name: 'rsend',
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
        const MessageID = args[0]
        if(!MessageID) return message.delete()
        if(isNaN(MessageID)) return message.delete()
        const reason = args.slice(1).join(" ")
        if(!reason) return message.delete()
        message.delete()
        ;(await message.channel.messages.fetch()).get(MessageID).reply({allowedMentions: {repliedUser: true}, content: reason})
    }
}