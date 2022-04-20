const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const AmeClient = require("amethyste-api");
let AmeAPI = new AmeClient(config.Amethyste);

module.exports = {
  name: "burn",
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
        
      if(message.attachments) {
        let file = message.attachments.first().url
        let image = await AmeAPI.generate("burn", {
            url: file
        })
        let attach = new MessageAttachment(image, "burn.png")
        message.reply({files: [attach]})
    }
    else {

const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
let image = await AmeAPI.generate("burn", {
    url: user.displayAvatarURL({format: "png", size: 4096})
})
let attach = new MessageAttachment(image, "burn.png")
return message.channel.send({files: [attach]})
    }
    } catch (error) {
      console.log(error.stack);
    }
  },
};