const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
const Scraper = require('mal-scraper')
module.exports = {
    name: 'anime',
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
        .setURL(Anime.url)
        .setTitle(Anime.title)
        .setDescription(Anime.synopsis)
        .addField(`Type`, Anime.type, true)
        .addField(`Status`, Anime.status, true)
        .addField(`Premiered`, Anime.premiered, true)
        .addField(`Episodes`, Anime.episodes, true)
        .addField(`Duration`, Anime.duration, true)
        .addField(`Popularity`, Anime.popularity, true)
        .addField(`Genres`, Anime.genres.join(", "))
        .setThumbnail(Anime.picture)
        .setFooter(`Score - ${Anime.score}`)
        .setTimestamp();
      
        } catch (error) {
          console.log(error)
          return message.channel.send(`No Anime Found!`)
         
        };
      
        return message.reply({embeds: [Embed]});


        
    }
}