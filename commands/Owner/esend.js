const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const { text } = require('express');
const { restart } = require('nodemon');

module.exports = {
    name: 'esend',
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

        try {

        message.delete()
        ;(await message.channel.messages.fetch()).get(MessageID).edit({content: reason})
            
        } catch (error) {
            console.log(error.stack)
        }
        




 
        


    }
}