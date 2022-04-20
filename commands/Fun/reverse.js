const { Client, Message, MessageEmbed,MessageAttachment } = require('discord.js');

const fetch = require("node-fetch")




module.exports = {
    name: 'reverse-text',
    aliases: [],
    category: 'Fun',
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

        if(!text) return message.reply({content: "Please give something to reverse!"})

        let pekob = text.split("")

        let reverseA = pekob.reverse()

        let reverse = reverseA.join("")

        message.reply(reverse)

        
        
    }
}