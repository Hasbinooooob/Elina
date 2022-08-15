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
    .addFields({name: "Message Id", value: `${msg.id}`})
    .addFields({name: "author", value: `${msg.author.tag}`})
    .addFields({name: "content", value: `${msg.content ? msg.content: "`no message`"}`})
    .addFields({name: "created at", value: `${moment(msg.createdTimestamp).format("DD/MM/YYYY")}`})
    .setColor("F037A5")
    .setURL(msg.url)
    .setThumbnail(msg.author.displayAvatarURL())
    .setTimestamp()
   return message.reply({embed: embed})
    } catch (error) {
      console.log(error.stack)
    }
  }
};