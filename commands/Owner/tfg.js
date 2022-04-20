const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

const {Calculator, RockPaperScissors} = require("weky")

const { getSFWImage, getNSFWImage } = require('waifu.pics-wrapper');

const fetch = require("node-fetch");

const lolot = require("nekos.life")

const { sfw, nsfw } = new lolot()

module.exports = {
    name: 'verify-tfg',
    aliases: [''],
    category: ' ',
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
        if(message.author.id !== "779348805920227358") return message.reply("|| https://imgur.com/NQinKJB ||")

        let button = new MessageButton()
        .setLabel("verify")
        .setCustomId("TFG_verify")
        .setStyle("SUCCESS")


        let row = new MessageActionRow()
        .addComponents(button)


        let embed = new MessageEmbed()
        .setTitle("verify your self")
        .setDescription("Click on the button below to verify!")
        .setColor("F037A5")


        message.channel.send({embeds: [embed], components: [row]})

        

        

        

        

        
       
	}        
    }
