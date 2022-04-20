const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'invite',
    category: "Info",
    aliases: [],
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        
        message.reply({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setColor('F037A5')
            .setTitle("Invite & Support Link!")
            .addField("**Invite Link**", `[Click here to invite me](https://discord.com/api/oauth2/authorize?client_id=878172039171694612&permissions=1099511627775&scope=applications.commands%20bot)`)
            .setFooter(`Requested by ${message.author.tag}`, client.user.displayAvatarURL())
            .setURL("https://discord.gg/WDJWrSdP8A")
            .setTimestamp()]})


    }
}