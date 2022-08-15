const { Client, Message, MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: "gayrate",
  aliases: ["howgay"],
  category: "Fun",
  description: "gay rate",
  usage: "gayrate / gayrate @user",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user || message.author
    let gen = Math.floor(Math.random()*100 + 1);
    message.reply(`${member.tag} it is ${gen}% gay! :gay_pride_flag:`)
    
  }
};