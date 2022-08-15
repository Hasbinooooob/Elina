const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const ee = require("../../config/embed.json");
const { RockPaperScissors } = require("weky")
module.exports = {
  name: "rockpaperscissors",
  aliases: ["rps"],
  category: "Mini Games",
  description: "Return A Answer Of Question!",
  usage: "[Command]",
  /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {
    let player = message.mentions.users.first() || message.guild.members.cache.find((m) => m.user.username.toLowerCase() ===  args.join(" ").toLocaleLowerCase())?.user || message.guild.members.cache.get(args[0])?.user
        if(!player) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setDescription("`please mention member to use this command!`").setColor(ee.color)]})
        if(player.bot) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setDescription("`you can't play with bots`").setColor(ee.color)]})
        if(player === message.author) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`\`you can't play with yourself\``)]})
        await RockPaperScissors({
            message: message,
            opponent: player,
            embed: {
                title: 'Rock Paper Scissors',
                description: 'Press the button below to choose your element.',
                color: '#F037A5',
                footer: 'Mini Games',
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