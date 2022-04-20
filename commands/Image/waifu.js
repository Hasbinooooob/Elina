const { Client, Message, MessageEmbed } = require('discord.js');

const lolot = require("nekos.life")

const { sfw, nsfw } = new lolot()


const { getSFWImage, getNSFWImage } = require('waifu.pics-wrapper');

module.exports = {
    name: 'waifu',
    aliases: ["w"],
    category: '',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '[command]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

    getSFWImage("waifu").then((result) => {
        let embed = new MessageEmbed()
        .setColor("F037A5")
        .setTimestamp()
        .setImage(result)

        message.reply({embeds: [embed]})
       })

        

  

       
        
    }
}