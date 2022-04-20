const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")

module.exports = {
  name: "drake",
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
        const splitArgs = args.join(" ").split("|")
        const text_1 = splitArgs[0]
        if (!text_1) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed()
            .setDescription(`Provide proper arguments! \nNote: Use '|' to split the text \nExample: E!drake kick ${client.user.username} | invite ${client.user.username}`)
            .setColor(ee.color)
    ]})
        const text_2 = splitArgs[1]
        if (!text_2) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed()
            .setDescription(`Provide proper arguments! \nNote: Use '|' to split the text \nExample: E!drake kick ${client.user.username} | invite ${client.user.username}`)
            .setColor(ee.color)
    ]})
        let attach = new MessageAttachment(`https://api.popcat.xyz/drake?text1=${text_1}&text2=${text_2}`, "drake.png")
        message.channel.send({files: [attach]}) 
    } catch (error) {
      console.log(error.stack);
    }
  },
};
