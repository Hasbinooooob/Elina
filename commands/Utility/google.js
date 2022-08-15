const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'googlesearch',
    category: "Utility",
    aliases: [],
    description: '',
    usage: '[command] <query>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
    const sentence = args.join("+")
    let sntnce = message.content.split(' ');
    sntnce.shift();
    sntnce = sntnce.join(' ');
    if (!sentence) return message.reply('**Please specify a search query.**');
     let embed = new MessageEmbed()
      .setTitle('**You Searched Google**')
      .setDescription(
        `**Your Search Query:** ${sntnce}\n\n **Search Result** - [Click Here](https://www.google.com/search?q=${sentence}&oq=${sentence}&aqs=chrome.0.69i59l2j0l2j69i60j69i61l2j69i65.1147j0j7&sourceid=chrome&ie=UTF-8)`
      )
      .setColor("F037A5")
      .setTimestamp()
      .setFooter("Google command", message.author.avatarURL())
    message.reply({embeds: [embed]});
    }
}