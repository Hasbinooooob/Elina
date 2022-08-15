const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { Sudo } = require("weky")
module.exports = {
  name: "sudo",
  aliases: [],
  category: "Mini Games",
  memberpermissions: [],
  description: "Sudo game",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      let player = message.mentions.users.first() || message.guild.members.cache.find((m) => m.user.username.toLowerCase() ===  args.join(" ").toLocaleLowerCase())?.user || message.guild.members.cache.get(args[0])?.user
      if(!player) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setDescription("`please mention member to use this command!`").setColor(ee.color)]})
      if(player.bot) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setDescription("`you can't play with bots`").setColor(ee.color)]})
      if(player === message.author) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`\`you can't play with yourself\``)]})
        await Sudo({
            message: message,
            deleteMessage: false,
            text: "Sudo",
            member: player
        })
    } catch (error) {
      console.log(error.stack);
    }
  },
};