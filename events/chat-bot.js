
const {Client} = require("smartestchatbot")
const client = require("..")

const config = require("../config/config.json")

const Schema = require("../utils/models/chatbot")

const scb = new Client()

client.on("messageCreate", async (message) => {




    let owner = client.users.cache.find(member => member.id === "779348805920227358")

    if(message.author.bot || !message.guild) return
    Schema.findOne({Guild: message.guild.id}, async (err , data) => {
        if(!data) return
        if(message.channel.id !== data.Channel) return;

        scb.chat({message: message.content, name: client.user.username, owner:`\`${owner.username}\``, user: message.author.username, language:"en"}).then(reply => {
            message.channel.send(`${reply}`)
    })
    })
})
