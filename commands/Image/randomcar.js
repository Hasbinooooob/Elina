const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const fetch = require("node-fetch")

module.exports = {
  name: "randomcar",
  aliases: ["car"],
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

        let res = await fetch("https://api.popcat.xyz/car")
        let json = await res.json()

        let image = new MessageAttachment(json.image, "car.png")
        message.channel.send({content: json.title, files: [image]})


    } catch (error) {
      console.log(error.stack);
    }
  },
};