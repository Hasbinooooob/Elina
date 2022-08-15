const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const { FootballMatch } = require('leaf-utils')
module.exports = {
  name: "football",
  aliases: [],
  category: "Mini Games",
  description: "football command",
  usage: "[Command]",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {
    await FootballMatch({
        message: message,
        slash_command: false,
        embed: {
            title: 'Football Match',
            color: "#F037A5",
        },
        buttons: {
            left: 'Left',
            middle: 'Middle',
            right: 'Right',
        },
        emojis: {
            goalkeeper: '🧍‍♂️',
            goal: '🥅',
            soccer: '⚽',
        },
        winMessage: 'GG, <@{{winner}}> scored in **{{time}} seconds**.',
        loseMessage: '<@{{player}}> You lose',
        ongoingMessage: 'A game is already runnning in <#{{channel}}>. You cant start a new one',
        authorOnly: 'Only <@{{author}}> can use these buttons!',
    })
  }
};