const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
const fetch = require("node-fetch")
const moment = require('moment');
module.exports = {
  name: "manga-search",
  aliases: ["mangasearch", "manga"],
  category: "Utility",
  memberpermissions: [],
  description: "",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        const title = args.join(' ');
        if (!title) return message.reply({embeds: [new MessageEmbed().setDescription("`Please specify a title to search!`").setColor(ee.color)]})
        fetch(`https://api.jikan.moe/v3/search/manga?q=${title}`)
            .then(res => res.json())
            .then(body => {
                const title = body.results[0].title;
                const mal_url = body.results[0].url;
                const imgae = body.results[0].image_url;
                const synopsis = body.results[0].synopsis;
                const type = body.results[0].type;
                const chapters = body.results[0].chapters;
                const volumes = body.results[0].volumes;
                const score = body.results[0].score;
                const start_date = body.results[0].start_date;
                const embed = new MessageEmbed()
                    .setTitle(title)
                    .setURL(mal_url)
                    .setThumbnail(imgae)
                    .setDescription(synopsis)
                    .addFields({name: `❱ Type`, value: type})
                    .addFields({name: `❱ Total Chapters`, value: `${chapters}`})
                    .addFields({name: `❱ Total Volumes`, value: `${volumes}`})
                    .addFields({name: `❱ Ratings`, value: `${score}`})
                    .addFields({name: `❱ Released`, value: `${moment(start_date).format('LLLL')}`})
                    .setColor(ee.color)
                    .setFooter({text: `Requested by : ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}
                    );
                message.channel.send({ embeds: [embed] });
            })
            .catch(err => {
                console.log(err.stack)
                const errembed = new MessageEmbed()
                    .setDescription(`That manga isn't found!`)
                    .setColor(ee.color);
                message.channel.send({ embeds: [errembed] });
            });
    } catch (error) {
      console.log(error.stack);
    }
  },
};