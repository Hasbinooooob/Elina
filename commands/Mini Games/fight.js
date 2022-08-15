const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const ee = require("../../config/embed.json");
const { Fight } = require("weky")
module.exports = {
  name: "fight",
  aliases: ["Fight"],
  category: "Mini Games",
  description: "Fight user",
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
    await Fight({
        message: message,
        opponent: player,
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