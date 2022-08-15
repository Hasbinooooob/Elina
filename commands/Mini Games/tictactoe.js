
    const { Client, Message, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
    const config = require("../../config/config.json")
    const { TicTacToe } = require("discord-gamecord")
    const ee = require('../../config/embed.json')
    module.exports = {
      name: "tictactoe",
      aliases: ["ttt"],
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
                new TicTacToe({
                        message: message,
                        slash_command: false,
                        opponent: player,
                        embed: {
                          title: 'Tic Tac Toe',
                          overTitle: 'Game Over',
                          color: ee.color,
                        },
                        oEmoji: '🔵',
                        xEmoji: '❌',
                        blankEmoji: '➖',
                        oColor: 'PRIMARY',
                        xColor: 'DANGER',
                        waitMessage: 'Waiting for the opponent...',
                        turnMessage: '{emoji} | Its now **{player}** turn!',
                        askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Tic Tac Toe!',
                        cancelMessage: 'Looks like they refused to have a game of Tic Tac Toe. \:(',
                        timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
                        drawMessage: 'It was a draw!',
                        winMessage: '{emoji} | **{winner}** won the game!',
                        gameEndMessage: 'The game went unfinished :(',
                      }).startGame();
        } catch (error) {
          console.log(error.stack);
        }
      },
    };