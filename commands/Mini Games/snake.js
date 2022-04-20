const { Client, Message, MessageEmbed, Collection } = require('discord.js');

const {Snake} = require("weky")

module.exports = {
  name: "snake",
  aliases: ["Snake"],
  category: "Fun",
  description: "Fun command",
  usage: "[Command]",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {

    await Snake({
        message: message,
        embed: {
            title: 'Snake',
            description: 'GG, you scored **{{score}}** points!',
            color: '#F037A5',
            footer: 'Fun command',
            timestamp: true
        },
        emojis: {
            empty: '⬛',
            snakeBody: '🟩',
            food: '🍎',
            up: '⬆️',
            right: '⬅️',
            down: '⬇️',
            left: '➡️',
        },
        othersMessage: 'Only <@{{author}}> can use the buttons!',
        buttonText: 'Cancel'
    });

    
  }
};