const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'setnick',
    aliases: ['nickname'],
    category: 'Moderation',
    memberpermissions: ['MANAGE_NICKNAMES'],
    cooldown: 5,
    description: 'Change Name of Any User',
    usage: '[COMMAND] + [user] + [Name]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let nickname = args.slice(1).join(" ")

        // if not a user
        if (!user) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`** Please Mention a User to Change Nick Name**`)]})
        }

        if (user.roles.highest.position > message.member.roles.highest.position) {
            return message.reply({allowedMentions: false,embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`** You cant change name of User Which is Equal Your Role**`)]})
        }

        if (!nickname) {
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`** Please Provide a Nick Name**`)]})
        }

        if (nickname.length > 32) {
            return message.lineReply(
                new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`** Nick is Too Bigger Please Give Less Than 32 Words **`)
                    .setFooter(ee.footertext)
            )
        }

        if (user) {
            try {
                const OldName = `\`${user.nickname}\``;
                await user.setNickname(nickname);

                message.reply({embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`✅ NickName Changed`)
                    .setDescription(`✅ <@${user.id}> NickName Successfully Changed!!`)
                    .addField(`> 🔰 Changed By <@${message.author.id}>`,true)
                    .addField(`> OldName :- ${OldName} || > NewName :- ${nickname}`,true)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))]}).then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 7000);
                    })

            } catch (e) {
                console.log(e.stack)
                message.reply({embeds: [new MessageEmbed()
                    .setDescription(e.message)
                    .setColor(ee.color)
                ]})
            }
        }
    }
}