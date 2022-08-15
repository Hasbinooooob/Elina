const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { CoinFlip } = require('leaf-utils');
module.exports = {
  name: "coinflip",
  aliases: ["cf"],
  category: "Fun",
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
      await CoinFlip({
        message: message,
        slash_command: false,
        time: 300000, // time before the game ends in ms
        embed: {
            title: 'Coinflip',
            color: ee.color,
        },
        buttons: {
            heads: 'Heads',
            tails: 'Tails',
        },
        colors: {
            heads: 'DANGER',
            tails: 'PRIMARY',
        },
        startMessage: 'The coin is in the air Choose heads or tails below.',
        winMessage: 'GG, <@{{winner}}> The coin landed on **{{result}}**',
        loseMessage: '<@{{player}}> You lose The coin landed on **{{result}}**',
        authorOnly: 'Only <@{{author}}> can use these buttons'
    })

    } catch (error) {
      console.log(error.stack);
    }
  },
};

