const { Client, Message, MessageEmbed, Collection } = require('discord.js');

const {QuickClick} = require("weky")

module.exports = {
  name: "quickclick",
  aliases: ["fastclick"],
  category: "Fun",
  description: "Fun command",
  usage: "[Command]",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {

    await QuickClick({
        message: message,
        embed: {
            title: 'Quick Click',
            color: 'F037A5',
            footer: 'quickclick',
            timestamp: true
        },
        time: 10000,
        waitMessage: 'The buttons may appear anytime now!',
        startMessage:
            'First person to press the correct button will win. You have **{{time}}**!',
        winMessage: 'GG, <@{{winner}}> pressed the button in **{{time}} seconds**.',
        loseMessage: 'No one pressed the button in time. So, I dropped the game!',
        emoji: '🗿',
        ongoingMessage:
            "A game is already runnning in <#{{channel}}>. You can't start a new one!"
    });

    

  }
};