const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');


module.exports = {
    name: 'qr-code',
    aliases: ["qr"],
    category: '',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '[text]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let text = args.join(" ")
        if(!text) return message.reply({allowedMentions: {repliedUser: true}, content: "Please provide valid text"})
        let qr = new MessageAttachment(encodeURI(`https://chart.googleapis.com/chart?chl=${text}&chs=400x400&cht=qr&chld=H%7C0`), "qr.png").setDescription(`requested by: ${message.author.tag}`)
        return message.channel.send({files: [qr]})
    }
}