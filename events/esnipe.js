const { Client, Message, Collection } = require('discord.js');
const client = require('../index');

 const esnipes = new Collection()
/** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

client.on("messageUpdate", async (oldmsg , newmsg) =>{
    esnipes.set(oldmsg.channel.id, {
        old: oldmsg.content,
        update: newmsg.content,
        author: oldmsg.author,
        tele : oldmsg.url
    })
})

module.exports = esnipes;




