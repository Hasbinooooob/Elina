const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const translate = require('@iamtraction/google-translate');
module.exports = {
  name: "translate",
  aliases: [],
  category: "Utility",
  memberpermissions: [],
  description: "Translates the given message.",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        const txt = args.slice(1).join(" ")
        const lang = args[0]
        if(!lang) return message.channel.send("Provide the ISO code of the language.")
        if(!txt) return message.channel.send("Provide a text to translate.")
        translate(txt, { to: lang }).then(res => {
          const embed = new MessageEmbed()
          .setDescription(res.text)
          .setColor(ee.color)
          .setFooter({text: `requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
          message.channel.send({ embeds: [embed] });
    }).catch(err => {
      message.channel.send("Please provide a valid ISO language code.")
    });
    } catch (error) {
      console.log(error.stack);
    }
  },
};