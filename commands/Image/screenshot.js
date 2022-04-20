const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")

module.exports = {
  name: "screenshot",
  aliases: ["ss"],
  category: "",
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
        let url = args[0]
        if(!url) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setTitle("Please provide url").setColor(ee.color)]}).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })
        let image = new MessageAttachment(`https://api.popcat.xyz/pet?image=https://cdn.discordapp.com/avatars/902273947926683718/82875b2c030751d85f2323114d878187.png?size=4096`, "screenshot.png")
        message.channel.send({files: [image]})
    } catch (error) {
      console.log(error.stack);
    }
  },
};