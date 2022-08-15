const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { FindEmoji } = require("leaf-utils");
module.exports = {
  name: "findemoji",
  aliases: [],
  category: "Utility",
  memberpermissions: [],
  description: "",
  usage: "[command]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        await FindEmoji({
            message: message,
            slash_command: false,
            args: args,
            time: 300000,
            embed: {
                title: "Successfully created a new emoji",
                description: "Click on these buttons to find emojis",
                color: ee.color,
            },
            buttons: {
                back: "Back",
                next: "Next",
                add: "Add",
            }, // emojis are optional
            emojis: {
                back: "⬅️",
                next: "➡️",
                add: "⏺️",
            },
            colors: {
                back: "PRIMARY",
                next: "PRIMARY",
                add: "DANGER",
            },
            noResultMessage: "No results found for **{{query}}**",
            errorMessage: "An error has occured. I can't add this emoji",
            authorOnly: "Only <@{{author}}> can use these buttons!",
        });
    } catch (error) {
      console.log(error.stack);
    }
  },
};
