const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { ShuffleGuess } = require("weky")
module.exports = {
  name: "shuffleguess",
  aliases: ["sg"],
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
        await ShuffleGuess({
            message: message,
            embed: {
              title: 'Shuffle Guess',
              color: es.color,
              footer: es.footertext,
              timestamp: true,
            },
            word: ['Milrato'],
            button: { cancel: 'Cancel', reshuffle: 'Reshuffle' },
            startMessage:
              'I shuffled a word it is **`{{word}}`**. You have **{{time}}** to find the correct word!',
            winMessage:
              'GG, It was **{{word}}**! You gave the correct answer in **{{time}}.**',
            loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
            incorrectMessage: "No {{author}}! The word isn't `{{answer}}`",
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            time: 60000,
          });
    } catch (error) {
      console.log(error.stack);
    }
  },
};