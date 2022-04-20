const { Client, Message, MessageEmbed, Collection } = require('discord.js');

const moment = require("moment")

module.exports = {
  name: "firstmsg",
  aliases: [],
  category: "Fun",
  description: "finding first message",
  usage: "[command]",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {

    try {


      const fetchMsg = await message.channel.messages.fetch({
        after: 1,
        limit: 1
    })

    const msg = fetchMsg.first()

    let embed = new MessageEmbed()
    .setTitle("First message of this channel")
    .addField("Message Id", `${msg.id}`)
    .addField("author", msg.author.tag)
    .addField("content", msg.content ? msg.content: null)
    .setColor("F037A5")
    .addField("created at", moment(msg.createdTimestamp).format("DD/MM/YYYY"))
    .setURL(msg.url)
    .setThumbnail(msg.author.displayAvatarURL())
    .setTimestamp()

   return message.reply({embed: embed})
      
    } catch (error) {
      console.log(error.stack)
      
    }

  }
};