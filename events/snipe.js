const { Client, Message, Collection } = require('discord.js');
const client = require('../index');

 const snipes = new Collection()
/** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

client.on("messageDelete", async message => {
    snipes.set(message.channel.id, {
        content: message.content ? message.content: "no messages deleted",
        Link: message.attachments.first() ? message.attachments.first().url: null,
        author: message.author
    })
})

module.exports = snipes;





