const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const config = require("../../config/config.json")
module.exports = {
    name: 'reportBug',
    aliases: [],
    category: 'Utility',
    memberpermissions: [],
    cooldown: 5,
    description: 'report bug command',
    usage: 'report bug',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let bug = args.join(" ")
        if(!bug) return message.lineReply("give me the bug you found now")
        let owner = client.users.cache.get(config.ownerID)
        let Embed = new MessageEmbed()
        .setTitle("new bug")
        .addField("server", message.guild.name)
        .addField("finder", message.author.tag)
        .addField("bug", `${bug}`)
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        owner.send({embeds: [Embed]})
    }
}