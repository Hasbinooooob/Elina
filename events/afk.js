const client = require("..")
const Discord = require('discord.js')
const ee = require("../config/embed.json")

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;
    const db = require("../utils/models/afk")
    const moment = require('moment');
    db.findOne({ Guild: message.guild.id, User: message.author.id }, async(err, data) => {
      if(err) throw err;
      if(data) {
        data.delete()
        const afk = new Discord.MessageEmbed()
        .setDescription(`Welcome back ${message.author}, You are no longer AFK`)
        .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setColor(ee.color)
        .setTimestamp()

        message.reply({embeds: [afk]}).then(async (msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        })
      } else return;
    })

    const mentionedUser = message.mentions.users.first();
    if(mentionedUser) {

        const params = {
            Guild: message.guild.id,
            User: mentionedUser.id
        }
        const data = await db.findOne(params)

        if(data) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`${mentionedUser.username} is currently AFK!`)
            .setColor(ee.color)
            .setDescription(`Reason: \`${data.Reason}\` \n Since: <t:${Math.round(data.Date / 1000)}:R>`)
            .setTimestamp()

            message.reply({embeds: [embed], allowedMentions: {repliedUser: true}}).then(async (msg) => {
              setTimeout(() => {
                msg.delete()
              }, 10 * 1000);
            })
        }
      }
  })