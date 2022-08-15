const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const fetch = require("node-fetch")
module.exports = {
  name: "google-maps",
  aliases: ["gmaps", "maps"],
  category: "Utility",
  memberpermissions: [],
  description: "Returns information about a location",
  usage: "[command] <location>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        const sit = args.join(' ');
        if (!args.length) return message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription("`please provide a valid location`")], allowedMentions: {repliedUser: true}});
        const site = `https://maps.google.com/?q=${args.join('+')}`;
        const { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
        let att = new MessageAttachment(body, `${sit}.png`);
        return message.channel.send({ files: [att] });
    } catch (error) {
      console.log(error.stack);
    }
  },
};