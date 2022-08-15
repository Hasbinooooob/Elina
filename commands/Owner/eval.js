const Discord = require("discord.js")
const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Modal, MessageCollector, TextInputComponent } = require('discord.js');
const { Canvacord } = require("canvacord")
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
module.exports = {
    name: 'eval',
    aliases: [''],
    category: 'Owner',
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
        if(message.author.id !== "779348805920227358") return;
        try {
            var result = args.join(` `);
            if (!result) {
             return message.reply({allowedMentions: false, content: "Please input code to evaluate!"});
            }
            let evaluated = await eval(result);
            const success = new MessageEmbed() // Prettier()
             .setColor("F037A5")
             .addField(`Input:\n`, "```js\n" + `${result}` + "```", false)
             .addField(`Output:\n`, "```js\n" + evaluated + "```", true)
            message.reply({embeds: [success]});
           } catch (err) {
            const errormessage = new MessageEmbed() // Prettier()
            .setColor("#e31212")
            .setTitle("An error has occured")
            .addField(`Input:\n`, "```js\n" + `${result}` + "```", false)
            .addField(`Output:\n`, "```js\n" + `${err.message}` + "```", true)
            message.channel.send({embeds: [errormessage]});
            return console.log(err.stack)
           } 
    }
}