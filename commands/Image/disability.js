const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const Meme = require("memer-api");
const meme = new Meme(config.meme_api)

module.exports = {
  name: "disability",
  aliases: [],
  category: "Image",
  memberpermissions: [],
  cooldown: 5,
  description: "",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

        meme.disability(user.displayAvatarURL({format: "png", size: 4096})).then(async (image) => {
            let attach = new MessageAttachment(image, "disability.png")
            message.channel.send({files: [attach]})
        })

    } catch (error) {
      console.log(error.stack);
    }
  },
};