const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require("../../config/embed.json")
const ms = require("ms")
module.exports = {
    name: 'reminder',
    aliases: [],
    category: 'Utility',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let time = args[0]
        if(!time) {
          var embed = new MessageEmbed()
        .setDescription(" What is the time when the reminder should be off? ")
        .setColor(ee.color)
        return message.reply({allowedMentions: {repliedUser: true},embeds: [embed]});
        }
        if(ms(time) > ms("1w")){
         var embed = new MessageEmbed()
         .setDescription(`\n ${message.author.tag} You cannot set your reminder for more than 1w`)
          .setColor()
         return message.reply({allowedMentions: {repliedUser: true},embeds: [embed]});
        }
        let alert = args.slice(1).join(" ")
        if(!alert) {
          var embed = new MessageEmbed()
         .setDescription(`What is reminder for?`)
          .setColor("RANDOM")
         return message.reply({allowedMentions: {repliedUser: true},embeds: [embed]});
        }
       var embed = new MessageEmbed()
         .setDescription(`**Successfull**`)   
        .setColor(ee.color)
        .addFields({name: `Time:`, value: `\`${time}\``, inline: true})
        .addFields({name: `For:`, value: `\`${alert}\``, inline: true})
        message.reply({embeds: [embed]})
        setTimeout(() => {
            let DP = new MessageEmbed()
            .setAuthor({name: `Your reminder is Done`, iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setColor(ee.color)
            .addFields({name: "Duration", value: `\`${time}\``, inline: true})
            .addFields({name: `Reason:`, value: `\`${alert}\``, inline: true})
            message.author.send({embeds: [DP]})
        }, ms(time))
    }
}

