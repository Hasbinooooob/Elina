const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")

module.exports = {
  name: "patpat",
  aliases: ["headpat"],
  category: "Image",
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
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
      let image = new MessageAttachment(`https://api.popcat.xyz/pet?image=${user.displayAvatarURL({format: "png", size: 4096})}`, "patpat.gif")
      message.channel.send({files: [image]})
    } catch (error) {
      console.log(error.stack);
    }
  },
};