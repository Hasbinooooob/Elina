const { Client, Message, MessageEmbed } = require('discord.js');
const akeneko = require("akaneko")

const image = require("images-generator")

const {getSFWImage} = require('waifu.pics-wrapper')

module.exports = {
    name: 'neko',
    aliases: [],
    category: '',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: 'neko',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        getSFWImage('neko').then(result => {
            

        const embed = new MessageEmbed()
        .setImage(result)
        .setTimestamp()
        .setFooter(`request by: ${message.author.tag}`, message.author.displayAvatarURL())
        .setColor("F037A5")
        return message.channel.send({embeds: [embed]})
        }).catch(e => console.log(e));
    }
}