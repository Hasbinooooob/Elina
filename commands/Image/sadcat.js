const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")

module.exports = {
  name: "sadcat",
  aliases: [],
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
        let text = args.join("+")
        if(!text) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setTitle("Please provide valid text").setColor(ee.color)]}).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })
        let attach = new MessageAttachment(`https://api.popcat.xyz/sadcat?text=${text}`, "sad_cat.png")
        message.channel.send({files: [attach]})
    } catch (error) {
      console.log(error.stack);
    }
  },
};