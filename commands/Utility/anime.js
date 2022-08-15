const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
const Scraper = require('mal-scraper')
module.exports = {
    name: 'anime-search',
    category: "Utility",
    aliases: ["animesearch"],
    description: '',
    usage: '[command] <query>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let Text = args.join(" ");
        if (!Text) return message.reply({allowedMentions: {repliedUser: true}, content: "Please Give Something!"});
        if (Text.length > 200) return message.reply({allowedMentions: {repliedUser: true},content: "Text Limit - 200"});
        let Msg = await message.channel.send(`**Searching It For You **`);
        let Replaced = Text.replace(/ /g, " ");
        let Anime;
        let Embed;
        try {
        Anime = await Scraper.getInfoFromName(Replaced);
        if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";
        Embed = new MessageEmbed()
        .setColor("F037A5")
        .setURL(`${Anime.url}`)
        .setTitle(`${Anime.title}`)
        .setDescription(`${Anime.synopsis}`)
        .addFields({name: `❱ Type`, value: `${Anime.type}`, inline: true})
        .addFields({name: `❱ Status`, value: `${Anime.status}`, inline: true})
        .addFields({name: `❱ Premiered`, value: `${Anime.premiered}`, inline: true})
        .addFields({name: `❱ Episodes`, value: `${Anime.episodes}`, inline: true})
        .addFields({name: `❱ Duration`, value: `${Anime.duration}`, inline: true})
        .addFields({name: `❱ Popularity`, value: `${Anime.popularity}`, inline: true})
        .addFields({name: `❱ Genres`, value: `${Anime.genres.join(", ")}`})
        .setThumbnail(`${Anime.picture}`)
        .setFooter({text: `Score - ${Anime.score}`})
        .setTimestamp()
        } catch (error) {
          console.log(error)
          return message.channel.send(`No Anime Found!`)
        };
        return message.reply({embeds: [Embed]});
    }
}