const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp'],
    category: 'Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show User Avatar',
    usage: '[command] [users]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var user = message.mentions.users.first() || message.guild.members.cache.find(member => member.user.tag.toLowerCase() == args.join(" ").toLocaleLowerCase())?.user || message.guild.members.cache.find(user => user.user.username.toLowerCase() == args.join(' ').toLocaleLowerCase())?.user ||  message.guild.members.cache.get(args[0])?.user || message.author;


            message.reply({embeds: [new MessageEmbed()
                .setColor("F037A5")
                .setTitle(`Avatar Of : ${user.tag}`)
                .addField("❱ PNG", `[\`LINK\`](${user.displayAvatarURL({ format: "png", size: 4096 })})`, true)
                .addField("❱ JPG", `[\`LINK\`](${user.displayAvatarURL({ format: "jpg", size: 4096 })})`, true)
                .addField("❱ JPEG", `[\`LINK\`](${user.displayAvatarURL({ format: "jpg", size: 4096 })})`, true)
                .addField("❱ WEBP", `[\`LINK\`](${user.displayAvatarURL({ format: "webp", size: 4096 })})`, true)
                .setFooter({text: `request by: ${message.author.tag}`}, message.author.displayAvatarURL())
                .setImage(user.displayAvatarURL({
                    dynamic: true, size: 4096,
                }))]});

        } catch (e) {
            console.log(e.stack)
            message.channel.send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(e.message)]})
        }
    }
}