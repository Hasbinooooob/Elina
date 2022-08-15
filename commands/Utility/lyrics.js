const fetch = require('node-fetch')
const { MessageEmbed, MessageActionRow, MessageButton, Message, Client } = require('discord.js')
const ee = require("../../config/embed.json")
module.exports = {
  name: "lyrics",
  aliases: [],
  description: "Get the song lyrics!",
  memberpermissions: [],
  category: "Utility",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        const song = args.join(" ")
        if(!song) return message.channel.send("Please enter a song name!")  
        await fetch(`https://api.popcat.xyz/lyrics?song=${song}`)
        .then(res => res.json())
        .then(json => {
            if(json.lyrics) {
                message.channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`Lyrics of ${json.title}`)
                        .setDescription(json.lyrics)
                        .setThumbnail(json.image)
                        .setColor(ee.color)
                        .setFooter({text: `Artist: ${json.artist}`})
                    ]
                })
            } else {
                message.reply({
                    allowedMentions: {repliedUser: true},
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`No lyrics found for ${song}`)
                        .setColor(ee.color)
                    ]
                })
            }
        })
    } catch (error) {
        console.log(error.stack)
        message.channel.send({embeds: [new MessageEmbed().setDescription(`\` ${error.message} \``)]})
    }
}
} 