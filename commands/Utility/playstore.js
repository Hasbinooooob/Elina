const PlayStore = require("google-play-scraper");
const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'playstore',
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
        if (!args[0])
      return message.reply({content: "Please Give Something To Search", allowedMentions: {repliedUser: true}})
    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;
      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.reply(`No Application Found`);
      }
      let Embed = new MessageEmbed()
        .setColor("F037A5")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addFields({name: `Price`, value: App.priceText})
        .addFields({name: `Developer`, value: App.developer})
        .addFields({name: `Ratings`, value: App.scoreText})
        .setFooter({text: `Requested By ${message.author.tag}`})
        .setTimestamp();
      return message.reply({embeds: [Embed]});
    });
    }
}