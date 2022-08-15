const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
module.exports = {
  name: "ascii",
  aliases: [],
  category: "Fun",
  memberpermissions: [],
  description: "Returns provided text in ascii format.",
  usage: "[command] [text]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        let text = args.join(" ");
        if (!text) {
          return message.reply({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`\`Usage: //ascii <msg>\``)], allowedMentions: {repliedUser: true}})
        }
        let maxlen = 20;
        if (text.length > 20) {
          return message.channel.send(
            `Please put text that has 20 characters or less because the conversion won't be good!`
          );
        }
        // AGAIN, MAKE SURE TO INSTALL FIGLET PACKAGE!
        figlet(text, function (err, data) {
          message.channel.send(data, {
            code: "AsciiArt",
          });
        });
    } catch (error) {
      console.log(error.stack);
    }
  },
};