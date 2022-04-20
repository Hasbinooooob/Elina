const { Client, Message, MessageEmbed, Collection } = require('discord.js');

const {Fight} = require("weky")

module.exports = {
  name: "fight",
  aliases: ["Fight"],
  category: "Fun",
  description: "Fight user",
  usage: "[Command]",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {

    let user = message.mentions.members.first()

    if(!user) return message.lineReply("please mention people to use this command")

    if(user.user.bot) return message.lineReply("you can't play with bots")

    await Fight({
        message: message,
        opponent: user,
        embed: {
            title: 'Fight ',
            color: '#F037A5',
            footer: 'Fight command',
            timestamp: true
        },
        buttons: {
          hit: 'Hit',
          heal: 'Heal',
          cancel: 'Stop',
          accept: 'Accept',
          deny: 'Deny'
        },
        acceptMessage: '<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
        winMessage: 'GG, <@{{winner}}> won the fight!',
        endMessage: '<@{{opponent}}> didn\'t answer in time. So, I dropped the game!',
        cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
        fightMessage: '{{player}} you go first!',
        opponentsTurnMessage: 'Please wait for your opponents move!',
        highHealthMessage: 'You cannot heal if your HP is above 80!',
        lowHealthMessage: 'You cannot cancel the fight if your HP is below 50!',
        returnWinner: false,
        othersMessage: 'Only {{author}} can use the buttons!'
    });
  }
};