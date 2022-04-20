const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');


module.exports = {
    name: 'update',
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


        let embed = new MessageEmbed()
        .setTitle("new update")
        .setDescription("Update: \n 1.added slash command: `activities`\n 2.system music update")
        .setColor(ee.color)
        .setThumbnail(client.user.displayAvatarURL())

        message.channel.send({embeds: [embed]})


    }
}