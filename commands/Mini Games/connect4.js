const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { Connect4 } = require("discord-gamecord")
module.exports = {
  name: "connect4",
  aliases: ["c4"],
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
        let player = message.mentions.users.first() || message.guild.members.cache.find((m) => m.user.username.toLowerCase() ===  args.join(" ").toLocaleLowerCase())?.user || message.guild.members.cache.get(args[0])?.user
            if(!player) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setDescription("`please mention member to use this command!`").setColor(ee.color)]})
            if(player.bot) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setDescription("`you can't play with bots`").setColor(ee.color)]})
            if(player === message.author) return message.reply({allowedMentions: {repliedUser: true}, embeds: [new MessageEmbed().setColor(ee.color).setDescription(`\`you can't play with yourself\``)]})
            new Connect4({
                message: message,
                slash_command: false,
                opponent: player,
                embed: {
                  title: 'Connect 4',
                  color: ee.color,
                },
                emojis: {
                  player1: '🔵',
                  player2: '🟡'
                },
                waitMessage: 'Waiting for the opponent...',
                turnMessage: '{emoji} | Its turn of player **{player}**.',
                winMessage: '{emoji} | **{winner}** won the game!',
                gameEndMessage: 'The game went unfinished :(',
                drawMessage: 'It was a draw!',
                othersMessage: 'You are not allowed to use buttons for this message!',
                askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Connect 4!',
                cancelMessage: 'Looks like they refused to have a game of Connect4. \:(',
                timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
              }).startGame()
    } catch (error) {
      console.log(error.stack);
    }
  },
};