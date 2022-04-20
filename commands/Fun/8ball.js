const { Client, Message, MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: "8ball",
  aliases: [],
  category: "Fun",
  description: "Return A Answer Of Question!",
  usage: "8ball <Question>",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {
    
    const Responses = ["Yes", "No", "Maybe", "Probably", "Not Sure", "Definitely", "Certainly"]
    const random = Responses[Math.floor(Math.random () * Responses.length)];
    const Question = args.join(" ");

    if (!Question) return message.reply({content: "Please Give Your Question", allowedMentions: {repliedUser: true}});

    return message.reply({content: `${random}`})
  }
};