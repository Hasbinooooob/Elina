const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'voicechannel',
    aliases: ["vc"],
    category: 'Moderation',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: 'Create and Delete Text Channels',
    usage: '[COMMAND] + <delete> + <ch>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        if(!args[0]) return message.reply({ allowedMentions: {repliedUser: true},embeds: [new MessageEmbed().setColor(ee.wrongcolor).setDescription("```\n Example: [command] create / delete [channel name] ```")]})

        let channelName = args.slice(1).join(" ")

        // delete channel

        
            try {


                if(args[0] === "create") {
                    if(!channelName) return message.reply({embeds: [new MessageEmbed().setColor(ee.wrongcolor).setDescription("```\n Example: [command] create [channel name] ```")]})

                    await message.guild.channels.create(channelName, {
                        type: "GUILD_VOICE",
                        topic: "for chatting",
                        position: message.channel.rawPosition,
                    }).then((ch) => {
                        message.channel.send({embeds: [new MessageEmbed().setDescription(`<#${ch.id}> successfully made`).setColor(ee.color)]})
                    })
                }




                if(args[0] === "delete".toLocaleLowerCase()){
                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(ch => ch.name.toLowerCase() === args.slice(0).join(" ").toLocaleLowerCase())
                if (!channel) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Please Give Channel to Delete`)]})

                    
                await channel.delete().then(() => {
                    let del = new MessageEmbed()
                    .setColor("F037A5")
                    .setDescription(`\`${channel.name}\` has been deleted`)
                    message.channel.send({embeds: [del]}).then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 5000);
                    })
                })
            }

            } catch (e) {
                message.channel.send({embeds: [new MessageEmbed()
                    .setDescription(`\`${e.message}\``)
                    .setColor(ee.color)]})
            }
        
    }
}