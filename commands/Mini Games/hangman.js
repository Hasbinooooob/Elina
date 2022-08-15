const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, Modal, TextInputComponent} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { Hangman } = require("klaymon")
module.exports = {
  name: "hangman",
  aliases: [],
  category: "Mini Games",
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
    const word = args.join(" ")
    await Hangman({
        message: message, // Message Parameter
        client: Client, // Client Parameter
        words: word, // Word to guess // Default: random
        button: {
            color: "BLURPLE", // Buttons color
        },
        looseMessage: "Ah, i got you.", // Loose message / default: Aight, it seems you lost...
        winMessage: "You're safe... for now", // Win message / default : Cool, you saved me.
        otherMessage: "Only {{author}} can use the button." // The message if someone tries to use the emojis if the onlyAuthor argument is true / Default : Only {{author}} can use the emojis
    })  
    } catch (error) {
      console.log(error.stack);
    }
  },
};