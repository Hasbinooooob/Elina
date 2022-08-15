const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Util} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { parse } = require("twemoji-parser");
module.exports = {
  name: "enlargemoji",
  aliases: ["bigemoji"],
  category: "Fun",
  memberpermissions: [],
  description: "Converting Server emoji to PNG/GIF!",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        const emoji = args[0];
        if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);
        let customemoji = Util.parseEmoji(emoji);
        if (customemoji.id) {
          const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
            customemoji.animated ? "gif" : "png"
          }`;
          const Added = new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`\`${customemoji.name}\` \`${customemoji.id}\``)
            .setImage(Link);
          return message.channel.send({ embeds: [Added] });
        } else {
          let CheckEmoji = parse(emoji, { assetType: "png" });
          if (!CheckEmoji[0])
            return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setDescription(`\`Please Give Me A Valid Emoji!\``).setColor(ee.color)]})
          message.channel.send({embeds: [new MessageEmbed().setDescription(`\`You Can Use Normal Emoji Without Adding In Server!\``).setColor(ee.color)]});
        }
    } catch (error) {
      console.log(error.stack);
    }
  },
};