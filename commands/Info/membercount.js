const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
    name: 'membercount',
    category: "Info",
    aliases: [],
    cooldown: 5,
    description: 'Show all Member',
    usage: 'membercount',
    memberpermissions: [" "],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        message.channel.send({embeds: [new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setTimestamp()
            .setColor("F037A5")
            .setDescription(`** 🔰Total Members ** :- \`\`${message.guild.memberCount}\`\`  \n **<:Elina_members:954318823773847552> Total Humans ** :-  \`\`${message.guild.members.cache.filter(member => !member.user.bot).size}\`\`   \n **✨ Total Bots** :- \`\`${message.guild.members.cache.filter(member => member.user.bot).size}\`\``)]})
    }
}