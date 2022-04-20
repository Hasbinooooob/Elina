const { Client, Message, MessageEmbed, Collection } = require('discord.js');

const snipes = require("../../events/snipe")


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
        let channel = client.channels.cache.get("938358024605675520")
        let Embed = new MessageEmbed()
        .setTitle("new bug")
        .addField("server", message.guild.name)
        .addField("finder", message.author.tag)
        .addField("bug", `${bug}`)
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        channel.send({content: "<@779348805920227358>" , embeds: [Embed]})
    }
}