const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
module.exports = {
  name: "password-generator",
  aliases: ["pass-gen"],
  category: "Utility",
  memberpermissions: [],
  description: "generate a password",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        function generateRandomString(length) {
            var chars =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.-_!#$%^&*?<>/";
            var random_string = "";
            if (length > 0) {
              for (var i = 0; i < length; i++) {
                random_string += chars.charAt(
                  Math.floor(Math.random() * chars.length)
                );
              }
            }
            return random_string;
          }
          let panjang = args[0]
          if(!panjang) {
            panjang = 9
          }
          if(isNaN(panjang)) return 
          const random = generateRandomString(panjang); // how long your password will be -> it is now 9 characters long
          password = `${random}`;
          const PasswordGen = new MessageEmbed()
          .setColor(ee.color)
          .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
          .setTitle("Here is your password")
          .addFields({name: "Your Password:", value: `\`${password}\``})
          .setFooter({ text: `Password by ${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}`})
          message.reply({embeds: [PasswordGen]})
    } catch (error) {
      console.log(error.stack);
    }
  },
};