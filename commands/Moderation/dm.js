const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'dm',
    aliases: ['userdm'],
    category: 'Moderation',
    memberpermissions: ['ADMINISTRATOR' || "MANAGE_GUILD"],
    cooldown: 5,
    description: 'DM a User Using Bot',
    usage: '[COMMAND] + [text]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        message.member.permissions.has("MANAGE_GUILD")

        try {
            
        } catch (error) {
            console.log(error.stack)
        }


        let text = args.slice(1).join(' ');
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user

        if (!user) return message.reply({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`** Please Mention a User to Send Message **`)]}).then(msg => {
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            })
            
        

        if(user.bot) return message.reply({allowedMentions: false, content: "** Cannot send messages to this user **"})

        

        if (!text) {
            message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`** Please Write a Message to Send User **`)]}).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })
        }

        let userembed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`A Message From ${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`message : \`${text}\``)
            .setFooter(`DM by ${message.author.tag}`)


        user.send({embeds: [userembed]})
        message.reply({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Message SuccessFully Sent to <@${user.id}>`)]}).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })
            
    }
}