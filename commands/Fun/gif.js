const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const giphy = require("giphy-api")("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");
module.exports = {
  name: "giphy",
  aliases: ["gif"],
  category: "Fun",
  memberpermissions: [],
  description: "Get gifs based on your search",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        if (args.length === 0) {
            message.channel.send("No Search terms!");
            return;
          }
          if (args.length === 1) {
            term = args.toString();
          } else {
            term = args.join(" ");
          }
          giphy.search(term).then(function (res) {
            // Res contains gif data!
            let id = res.data[0].id;
            let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`;
            const embed = new MessageEmbed()
              .setTitle(`First result for \`${term}\` on GIPHY`)
              .setImage(msgurl)
              .setFooter({text: `Powered by GIPHY`, iconURL: "https://raw.githubusercontent.com/Giphy/GiphyAPI/f68a8f1663f29dd9e8e4ea728421eb2977e42d83/api_giphy_logo_sparkle_clear.gif"})
              .setColor(ee.color);
            message.channel.send({ embeds: [embed] });
          });
    } catch (error) {
      console.log(error.stack);
    }
  },
};