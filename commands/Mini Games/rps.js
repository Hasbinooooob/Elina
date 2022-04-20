const { Client, Message, MessageEmbed, Collection } = require('discord.js');

const {RockPaperScissors} = require("weky")

module.exports = {
  name: "rps",
  aliases: [],
  category: "Fun",
  description: "Return A Answer Of Question!",
  usage: "[Command]",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {

    let user = message.mentions.members.first()
        if(!user) return message.lineReply("please mention member")
        if(user.user.bot) return message.lineReply("you can't play with bots")

        await RockPaperScissors({
            message: message,
            opponent: user,
            embed: {
                title: 'Rock Paper Scissors',
                description: 'Press the button below to choose your element.',
                color: '#F037A5',
                footer: 'minigames',
                timestamp: true
            },
            buttons: {
                rock: 'Rock',
                paper: 'Paper',
                scissors: 'Scissors',
                accept: 'Accept',
                deny: 'Deny',
            },
            time: 60000,
            acceptMessage:
                '<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!',
            winMessage: '<@{{winner}}> won!',
            drawMessage: 'This game is deadlock!',
            endMessage: "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
            timeEndMessage:
                "Both of you didn't pick something in time. So, I dropped the game!",
            cancelMessage:
                '<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!',
            choseMessage: 'You picked {{emoji}}',
            noChangeMessage: 'You cannot change your selection!',
            othersMessage: 'Only {{author}} can use the buttons!',
            returnWinner: false
        });

  }
};