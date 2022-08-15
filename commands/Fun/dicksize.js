const { Client, Message, MessageEmbed } = require('discord.js');
  let dick = [
    "8==D",
    "8===D",
    "8====D",
    "8=====D",
    "8======D",
    "8=======D",
    "8========D",
    "8=========D",
    "8==========D",
    "8===========D",
    "8============D",
    "8=============D",
    "8==============D",
    "8===============D",
    "8================D",
  ];
module.exports = {
    name: 'penis',
    aliases: ["dick"],
    category: 'Fun',
    memberpermissions: [],
    cooldown: 5,
    description: 'Fun command',
    usage: '[command] / [command] <user>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let penis = dick[Math.floor(Math.random() * dick.length)]
        let taggedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user || message.author
        let embed = new MessageEmbed()
        .setTitle(`This is the ${taggedUser.tag} penis size`)
        .setDescription(`**${penis}**`)
        .setTimestamp()
        .setThumbnail(taggedUser.displayAvatarURL())
        .setColor("F037A5")
        message.reply({embeds: [embed]})
    }
}