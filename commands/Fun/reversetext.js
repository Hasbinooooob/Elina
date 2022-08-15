const { Client, Message, MessageEmbed,MessageAttachment } = require('discord.js');
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const { reverseText } = require('discord-gamecord');

module.exports = {
    name: 'reversetext',
    aliases: [],
    category: 'Fun',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
    const text = args.join(" ")
if (!text) return message.reply({allowedMentions: false, embeds: [new MessageEmbed().setTitle("Please provide valid text").setColor(ee.color)]}).then((msg) => {
    setTimeout(() => {
        msg.delete()
    }, 5000);})
    message.reply(await reverseText(text))
    }
}