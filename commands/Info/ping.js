const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");
const ee = require('../../config/embed.json')
module.exports = {
    name: 'ping',
    category: "Info",
    aliases: [],
    cooldown: 5,
    description: 'Get ping',
    usage: 'uptime',
    memberpermissions: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        try {

            
            await message.channel.send({embeds: [new MessageEmbed().setColor("F037A5").setDescription("🏓 Pinging...")]}).then( msg =>{
            const ping = new MessageEmbed()
            .setTitle(':ping_pong: Pong!')
            .setDescription(`> > 🎈 Ping ${Date.now() - message.createdTimestamp}ms`)
            .setColor('F037A5')
            .setTimestamp()
            msg.edit({embeds: [ping]});
        })
        } catch (error) {
            console.log(error)
            
        }

        
    }
}