const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require("../../config/config.json");
const ee = require("../../config/embed.json")
const activities = require("../../config/activities.json")
const fetch = require('node-fetch')
module.exports = {
  name: 'fishington-io',
  category: "Voice activities",
  aliases: ["fishing"],
  cooldown: 5,
  description: 'game',
  usage: '[command] / [command] [voice ch]',
  memberpermissions: [],
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    try {
        const channel = message.member.voice.channel || message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find((ch) => ch.name.toLowerCase() == args.join(" ").toLocaleLowerCase())
        if (!channel) return message.reply({allowedMentions: false ,embeds: [new MessageEmbed()
            .setDescription("You must be connected to a voice channel to use this command.")
            .setColor("#ff0000")]})
        if(channel.type !== "GUILD_VOICE") return message.reply({allowedMentions: false, embeds: [new MessageEmbed().setColor(ee.color).setDescription("You must be connected to a voice channel to use this command")]})
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: activities.fishington,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.channel.send({embeds: [new MessageEmbed()
                .setDescription("I was unable to start a Fishington.io session")
                .setColor(ee.wrongcolor)]})
                const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Fishington")
                .setURL(`https://discord.gg/${invite.code}`)
                .setEmoji("939931570645655634")
                let row = new MessageActionRow()
                .addComponents(button)
        const emebd = new MessageEmbed()
        .setDescription(`Click the button below to start a Fishington.io session in ${channel}`)
        .setColor("F037A5")
        .setFooter({
            text: `request by : ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({dynamic: true}),
          })
        .setTimestamp()
        .setImage("https://images.crazygames.com/games/fishington-io/cover-1615371400662.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop")
          return message.reply({embeds: [emebd], components: [row]})
        })
    } catch (e) {
        console.log(e.stack)
        message.channel.send({embeds: [new MessageEmbed().setColor(ee.wrongcolor).setDescription(`\`${e.message}\``)]})
    }
  }
}