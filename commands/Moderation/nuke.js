const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
module.exports = {
    name: 'nuke',
    aliases: [],
    category: 'Moderation',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: 'nuke channel',
    usage: '[COMMAND]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            let ch = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find((ch) => ch.name.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.channel;
            if(!ch.deletable) return message.reply({allowedMentions: false, embeds: [new MessageEmbed().setDescription("This channel cannot be nuked").setColor(ee.color)]})
            if(ch.type === "GUILD_VOICE") return ch.clone().then((channel) => {
                message.react('<a:Elina_verified_1:944634584342085694>')
                channel.setPosition(ch.position)
                ch.delete()
            })
            if(ch.type === "GUILD_STAGE_VOICE") return ch.clone().then((channel) => {
                message.react("<a:Elina_verified_1:944634584342085694>")
                channel.setPosition(ch.position)
                ch.delete()
            })

        ch.clone().then(channel => {
            channel.setTopic(ch.topic ? ch.topic: null)
            channel.setPosition(ch.position)
            ch.delete()
            channel.send({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`\`${ch.name}\` has been Nuked`)
                .setImage("https://c.tenor.com/pX617LglxSoAAAAS/explode-blast.gif")
                .setFooter({text: `Nuked by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
        ]})
        })
        } catch (error) {
            console.log(error.stack)
            message.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`\`${error.message}\``)]})
        }
    }
}