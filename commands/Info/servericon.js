const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'servericon',
    aliases: ["iconserver"],
    category: 'Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show User Avatar',
    usage: '[Command]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        

        let guild = message.guild
        let embed = new MessageEmbed()
        .setTitle(`${guild.name} Icon`)
        .setImage(guild.iconURL({dynamic: true, size: 4096}))
        .addField("❱ PNG", `[\`LINK\`](${guild.iconURL({dynamic: true, size: 4096, format: "png"})})`, true)
        .addField("❱ JPG", `[\`LINK\`](${guild.iconURL({dynamic: true, size: 4096, format: "jpg"})})`, true)
        .addField("❱ JPEG", `[\`LINK\`](${guild.iconURL({dynamic: true, size: 4096, format: "jpeg"})})`, true)
        .addField("❱ WEBP", `[\`LINK\`](${guild.iconURL({dynamic: true, size: 4096, format: "webp"})})`, true)
        .setColor(ee.color)


        message.reply({embeds: [embed]})
            
    }
}