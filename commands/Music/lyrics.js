const fetch = require('node-fetch')
const { MessageEmbed, MessageActionRow, MessageButton, Message, Client } = require('discord.js')
const ee = require("../../config/embed.json")
module.exports = {
  name: "lyrics",
  aliases: [],
  description: "Get the song lyrics!",
  memberpermissions: [],
  category: "utility",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
   const arg = args.join(" ")
   if(!arg) return message.channel.send("Please enter a song name!")
   else {
       try {

        let res = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(arg)}}`).then(res => {
          res.json().then(result => {
              const button = new MessageButton()
              .setLabel("Lyrics Link!")
              .setStyle("LINK")
              .setURL(result.links.genius)
              const row = new MessageActionRow({ components: [button] })
              const embed = new MessageEmbed()
              .setTitle(`${result.title}`)
              .setFooter(`By ${result.author}`)
              .setURL(result.links.genius)
              .setDescription(`${result.lyrics}`)
              .setThumbnail(result.thumbnail.genius || client.user.displayAvatarURL())
              .setColor(ee.color)
              message.reply({ embeds: [embed], components: [row] })
              console.log(result)
          })
      })
           
       } catch (error) {
           console.log(error.stack)
           message.channel.send({embeds: [new MessageEmbed().setDescription(`\` ${error.message} \``)]})
       }
      
   }
}
} 