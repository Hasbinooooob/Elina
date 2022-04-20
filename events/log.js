const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index');
const config = require('../config/config.json');
/** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

client.on("messageCreate", async message => {

    if(!message.guild) return

    let content = message.content ? message.content : null
    let server =  message.guild.name ? message.guild.name : null
    if(!server) return 

    let serverID = message.guildId ? message.guildId : null

    let chName = message.channel.name ? message.channel.name : null

    let author = message.author.tag ? message.author.tag : null

    let chID = message.channel.id ? message.channel.id : null

    let attachments = message.attachments.first() ? message.attachments.first().url: null

    let link = message.url ? message.url: null


    console.log(` server: ${server} \n serverID: ${serverID} \n channelID: ${chID} \n channel: ${chName} \n author: ${author} \n message: ${content} \n file: ${attachments} \n link: ${link}`)
})



