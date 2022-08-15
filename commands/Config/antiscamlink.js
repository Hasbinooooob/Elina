const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const db = require("../../utils/models/antiscam")
module.exports = {
  name: "antiscamlink",
  aliases: ["antiscam"],
  category: "Config",
  memberpermissions: ["ADMINISTRATOR"],
  description: "",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        let bruh = args[0].toLowerCase()
        if(!bruh) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`\`Example: [command] [enable / disable]\``)]})
        switch (bruh) {
            case "on":
                let alredy = await db.findOne({GuildID: message.guild.id})
                if(alredy) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Antiscam is already enabled`)]})
                let newSetup = new db({GuildID: message.guild.id}).save()
                message.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Successfully **enabled** antiscam`)]})
            break;

            case "enable":
                let already = await db.findOne({GuildID: message.guild.id})
                if(already) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Antiscam is already enabled`)]})
                let NewSetup = new db({GuildID: message.guild.id}).save()
                message.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Successfully **enabled** antiscam`)]})
            break;

            case "off":
                let isSetup = await db.findOne({GuildId: message.guild.id})
                if(!isSetup) return message.reply({allowedMentions: { repliedUser: true }, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Antiscam is not enabled`)]})
                await db.findOneAndDelete({GuildID: message.guild.id})
                message.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Successfully **disabled** antiscam`)]})
            break;

            case "disable":
                let issetup = await db.findOne({GuildID: message.guild.id})
                if(!issetup) return message.reply({allowedMentions: { repliedUser: true }, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Antiscam is not enabled`)]})
                await db.findOneAndDelete({GuildId: message.guild.id})
                message.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Successfully **disabled** antiscam`)]})
            break;
        
            default:
            break;
        }
    } catch (error) {
      console.log(error.stack);
    }
  },
};