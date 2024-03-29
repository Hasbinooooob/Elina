const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { LieSwatter } = require("weky")
module.exports = {
  name: "lieswatter",
  aliases: [],
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
        await LieSwatter({
			message: message,
			embed: {
				title: 'Lie Swatter',
				color: ee.color,
				footer: 'Mini Games',
				timestamp: true
			},
			thinkMessage: 'I am thinking',
			winMessage:
				'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
			loseMessage: 'Better luck next time! It was a **{{answer}}**.',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
			buttons: { true: 'Truth', lie: 'Lie' }
		});
    } catch (error) {
      console.log(error.stack);
    }
  },
};