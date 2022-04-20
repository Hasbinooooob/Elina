const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index');
const config = require('../config/config.json');
/** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

client.on("interactionCreate", async (interaction) => {

    try {


        if(interaction.isButton()) {
            if(interaction.customId === "TFG_verify") {
               let role = interaction.guild.roles.cache.get("908682789363261460")
               let member = interaction.member
               await member.roles.add(role)
               interaction.reply({content: "You have been verified!", ephemeral: true})
            }
        }
        
    } catch (error) {
        console.log(error)
    }


    
})


