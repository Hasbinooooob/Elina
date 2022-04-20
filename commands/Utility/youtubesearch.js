const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'youtubesearch',
    category: "Utility",
    aliases: ["yt-search", "youtubeSearch"],
    description: '',
    usage: '[command] <query>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        const text = args.join(' ');
    const search = args.join('+');
    if (!text) {
    return message.channel.send("Enter some text to search for")
    }
    const embed = new MessageEmbed()
    .setTitle("YT Search")
    .addField(`You Searched for`, `${text}`)
    .addField(`Results`, `[Here's What I found](https://youtube.com/results?search_query=${search})`)
    .setColor("F037A5");
    message.reply({embeds: [embed]});

    }
}