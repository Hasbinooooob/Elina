const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { Trivia } = require("weky");
module.exports = {
  name: "trivia",
  aliases: [],
  category: "Mini Games",
  memberpermissions: [],
  description: "trivia game",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        await Trivia({
            message: message,
            embed: {
              title: 'Trivia',
              description: 'You only have **{{time}}** to guess the answer!',
              color: ee.color,
              footer: "Mini games",
              timestamp: true,
            },
            difficulty: 'medium',
            thinkMessage: 'I am thinking',
            winMessage:
              'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
            loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
            emojis: {
              one: '1️⃣',
              two: '2️⃣',
              three: '3️⃣',
              four: '4️⃣',
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            returnWinner: false,
          });
    } catch (error) {
      console.log(error.stack);
    }
  },
};