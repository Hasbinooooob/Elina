const { Client, Message, MessageEmbed } = require('discord.js');

const {poll} = require("discord.js-poll")

module.exports = {
    name: 'poll',
    aliases: [],
    category: 'Moderation',
    memberpermissions: ["MANAGE_MESSAGES"],
    cooldown: 5,
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        poll(message, args, "+", "#F037A5")
    }
}