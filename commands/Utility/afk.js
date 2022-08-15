const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const afkSchema = require(`../../utils/models/afk`)
module.exports = {
    name: 'afk',
    aliases: [],
    category: 'Utility',
    memberpermissions: [],
    cooldown: '',
    description: 'Put User in AFK',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
    const reason = args.join(" ") || 'No Reason Provided'
    const params = {
        Guild: message.guild.id,
        User: message.author.id
    }
    afkSchema.findOne({params}, async (err, data) => {
        if(data) {
            data.delete()
            message.channel.send({embeds: [new MessageEmbed().setDescription(`You are no longer AFK!`).setColor(ee.color)]})
        } else {
            new afkSchema({
                Guild: message.guild.id,
                User: message.author.id,
                Reason: reason,
                Date: Date.now()
            }).save()
            message.reply({embeds: [new MessageEmbed().setDescription(`You are now AFK for: \n\`${reason}\``).setColor(ee.color).setTimestamp().setFooter({text: `requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
        }
    })
    }
}