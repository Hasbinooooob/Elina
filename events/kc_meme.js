const client = require("..");
const  { MessageAttachment } = require("discord.js")
const config = require("../config/config.json")

//kc
client.on("messageCreate", async (message) => {
    try {
        if(message.author.id !== config.ownerID) return
        if(message.channel.id !== "911412219961573386") return
        if(!message.attachments.first()) return

        if(message.attachments.first()) {

            let file = new MessageAttachment(message.attachments.first().url).setDescription(`meme by ${message.author.tag}`)

            let channel = client.channels.cache.get("962908461916635177")
            channel.send({files: [file]})
        }
    } catch (error) {
        console.log(error.stack)
    }
})



//TFG
client.on("messageCreate", async (message) => {
    try {
        if(message.author.id !== config.ownerID) return
        if(message.channel.id !== "962908461916635177") return
        if(!message.attachments.first()) return

        if(message.attachments.first()) {

            let file = new MessageAttachment(message.attachments.first().url).setDescription(`meme by ${message.author.tag}`)

            let channel = client.channels.cache.get("911412219961573386")
            channel.send({files: [file]})

        }
    } catch (error) {
        console.log(error)
    }
})