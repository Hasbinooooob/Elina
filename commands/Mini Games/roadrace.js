const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, Modal, TextInputComponent} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { RoadRace } = require("klaymon")
module.exports = {
  name: "roadrace",
  aliases: [],
  category: "Mini Games",
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
     const opponent = message.mentions.users.first() || message.guild.members.cache.find((m) => m.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase())?.user || message.guild.members.cache.get(args[0])?.user
     if(!opponent) return message.reply({embeds: [new MessageEmbed().setDescription(`\`Please mention an opponent\``).setColor(ee.color)]})
     if(opponent.bot) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setDescription("`you can't play with bots`").setColor(ee.color)]})
     if(opponent.id === message.author.id) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`\`you can't play with yourself\``)]})

   await RoadRace({
    message: message,
    opponent: opponent, 
   winMessage: `Cool! {{whoWin}} won the game!` 
    
  })   
    } catch (error) {
      console.log(error.stack);
    }
  },
};