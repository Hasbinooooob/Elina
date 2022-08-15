const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'invite',
    category: "Info",
    aliases: [],
    description: 'send invite link',
    usage: '[command]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        message.reply({embeds: [new MessageEmbed()
            .setAuthor({name: client.user.tag, iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setColor(ee.color)
            .addFields({name: "**Invite Link**",  value:`[Click here to invite me](https://discord.com/api/oauth2/authorize?client_id=878172039171694612&permissions=1945627743&scope=bot%20applications.commands)`})
            .setTimestamp()]})
    }
}