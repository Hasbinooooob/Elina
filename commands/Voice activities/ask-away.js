const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const activities = require("../../config/activities.json")
const fetch = require('node-fetch')
module.exports = {
  name: "ask-away",
  aliases: [],
  category: "Voice activities",
  memberpermissions: [],
  description: "",
  usage: "",
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
                target_application_id: activities.ask_away,
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
                .setDescription("I was unable to start a Ask Away session.")
                .setColor(ee.wrongcolor)]})
                const button = new MessageButton()
                .setStyle("LINK")
                .setLabel("Ask Away")
                .setURL(`https://discord.gg/${invite.code}`)
                .setEmoji("939931570645655634")
                let row = new MessageActionRow()
                .addComponents(button)

        const emebd = new MessageEmbed()
        .setDescription(`Click the button below to start a Ask Away session in ${channel}`)
        .setColor("F037A5")
        .setFooter({
            text: `request by : ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({dynamic: true}),
          })
        .setTimestamp()
        .setImage("https://cdn.discordapp.com/attachments/959030954234621952/997052743346831420/Ask_away.gif?size=4096")
          return message.reply({embeds: [emebd], components: [row]})
        })
    } catch (error) {
      console.log(error.stack);
    }
  },
};