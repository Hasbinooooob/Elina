const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');


const {Calculator} = require("weky")


module.exports = {
    name: 'calculator',
    aliases: ['cal'],
    category: 'Utility',
    memberpermissions: ["SEND_MESSAGES"],
    cooldown: '',
    description: 'calculator with button',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        await Calculator({
			message: message,
			embed: {
				title: 'Calculator',
				color: '#F037A5',
				footer: 'Calculator command',
				timestamp: true,
			},
			disabledQuery: 'Calculator is disabled!',
			invalidQuery: 'The provided equation is invalid!',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
		});
        
    }
}