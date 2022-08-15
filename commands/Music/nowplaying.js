const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
module.exports = {
    name: "nowplaying",
    aliases: ["nowplay", "np"],
    category: "Music",
    memberpermissions: [],
    description: "Show Current Playing Song",
    usage: "",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
        const { channel } = message.member.voice;
        if (!channel)
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color).setDescription(`Please Join Voice Channel`)]}).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })
        if (
            message.guild.me.voice.channel &&
            channel.id != message.guild.me.voice.channel.id
        )
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.color).setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel.name}`)]}).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                });
        const queue = distube.getQueue(message.guild.id);
        if(!queue) return message.reply({embeds: [new MessageEmbed().setDescription("** Nothing Playing Right Now **").setColor(ee.wrongcolor)], allowedMentions: {repliedUser: true}}).then((msg) => {
            setTimeout(() => {
              msg.delete()
            }, 8000);
          })
        message.reply({embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setTitle("NOW PLAYING")
            .setDescription(`\n 1 - \`${queue.songs[0].name}\``)
            .setURL(queue.songs[0].url)
            .setThumbnail(queue.songs[0].thumbnail)]}).then((msg) => {
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            });
        } catch (e) {
            console.log(e.stack)
            message.reply({embeds: [new MessageEmbed().setDescription(e.message).setColor(ee.color)]}).then((msg) => {
                setTimeout(() => {
                    msg.delete()
                }, 8000);
            })
        }
    }
};
