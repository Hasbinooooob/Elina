const { Client, Message, MessageEmbed,MessageAttachment } = require('discord.js');
const canva = require("canvacord")
const fetch = require("node-fetch")

const ee = require("../../config/embed.json")


module.exports = {
    name: 'clyde',
    aliases: [],
    category: 'Image',
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
    }, 5000);
})

const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;
let response;
try {
  response = await fetch(url).then(res => res.json());
}
catch (e) {
  return message.channel.send('An error occured, please try again!');
}
const attach = new MessageAttachment(response.message, 'clyde.png');
return message.channel.send({files: [attach]});
    }
}