const { Client, Message, MessageEmbed, Collection } = require('discord.js');

const Schema = require("../../utils/models/chatbot")


module.exports = {
  name: "remove-chatbot",
  aliases: ["del-chatbot"],
  category: "chat-bot",
  memberpermision: ["ADMINISTRATOR"],
  description: "chat with bot",
  usage: "[commands] channel",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])

    if(!channel) return message.reply({content: "please mention channel", allowedMentions: {repliedUser: true}})

    if(channel.type !== "GUILD_TEXT") return message.reply({content: "please mention text channel"})


    Schema.findOneAndDelete({Guild: message.guild.id , Channel: channel.id}, async (err , data) => {

        if(err) console.log(err)
        
    })
    message.reply(`Removed chatbot in ${channel}`)
  }
};