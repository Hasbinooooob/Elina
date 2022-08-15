const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
module.exports = {
    name: 'resetnick',
    aliases: ['rest-nick'],
    category: 'Moderation',
    memberpermissions: ['MANAGE_NICKNAMES'],
    cooldown: 5,
    description: 'Reset Name of Any User',
    usage: '[COMMAND] + [user]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`** Please Mention a User to Change Nick Name**`)]}    
            )
        }
        if (user.roles.highest.position > message.member.roles.highest.position) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`** You cant change name of User Which is Equal Your Role**`)]}      
            )
        }
        if (user) {
            try {
                const OldName = `\`${user.nickname}\``;
                await user.setNickname(null);
                message.reply({embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`✅ NickName Reseted`)
                    .setDescription(`✅ <@${user.id}> NickName Successfully Reseted!!`)
                    .addField(`> 🔰 Changed By <@${message.author.id}>`, true)
                    .addField(`> ✨ OldName :- ${OldName} || > 🔴 NewName :- ${user.user.username}`,true)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))]}
                ).then((msg) => {         
           setTimeout(() => {
            msg.delete()
          }, 5000);
                })
            } catch (e) {
                message.reply({embeds: [new MessageEmbed()
                    .setDescription(e.message)
                    .setColor(ee.color)]})
            }
        }
    }
}