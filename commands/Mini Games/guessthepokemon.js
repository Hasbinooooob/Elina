const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { GuessThePokemon } = require('leaf-utils');
module.exports = {
  name: "guessthepokemon",
  aliases: ["gtp"],
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
        await GuessThePokemon({
            message: message,
            slash_command: false,
            time: 300000,
            embed: {
              title: 'Guess The Pokemon',
              description: 'Type in chat what you think the pokemon is',
              color: ee.color,
              stopcolor: '#D52000',
            },
            button: {
              label: 'Stop',
              style: 'DANGER',
              emoji: '⏹️' // optional
            },
            correctMessage: 'GG! You guessed the correct pokemon. It was {{pokemon}}',
            wrongMessage: 'Wrong. It was {{pokemon}}',
            stopMessage: 'You have ended the game, the correct pokemon was {{pokemon}}',
            authorOnly: 'Only <@{{author}}> can use this button!',
        })
    } catch (error) {
      console.log(error.stack);
    }
  },
};