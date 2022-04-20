const { Client, Message, MessageEmbed } = require('discord.js');
var rn = require('random-number');

  


module.exports = {
    name: 'randomnumber',
    aliases: ["rn"],
    category: 'Fun',
    memberpermissions: [],
    cooldown: 5,
    description: 'Fun command',
    usage: '[command] <number> <number>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let result = Math.floor(Math.random() * 101)

        let nonumber = new MessageEmbed()
        .setColor("F037A5")
        .setTitle(`Random Number Is`)
        .setDescription(`>>> ${result}`)
        .setFooter(`1 - 100`)


        if(!args.length) return message.reply(nonumber)

       let minimal = args[0]
       if(isNaN(minimal)) return message.lineReply("please give the number correctly")


       let maximal = args[1]
       if(isNaN(maximal)) return message.lineReply("please give the number correctly")


       

    const embed = new MessageEmbed()
    .setColor("F037A5")
    .setTitle(`Random Number Is`)
    .setDescription(`>>> ${rn({min: minimal, max: maximal, integer: true})}`)
    .setFooter(`${minimal} - ${maximal}`)

    message.reply({embeds: [embed]})



        
    }
}