const { Client, Message, MessageEmbed } = require('discord.js');
let fetch = require("node-fetch")
module.exports = {
    name: 'wikipedia',
    aliases: ["wiki"],
    category: 'Utility',
    memberpermissions: [],
    cooldown: 5,
    description: 'Fun command',
    usage: '[command] <query>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const wiki = args.slice().join(' ')
        if(!wiki) return message.reply({allowedMentions: {repliedUser: true}, content: "Please Provide A Query To Search"}) // If Nothing Is Searched
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}` // From Here BOT Will Search For It
        let response
        try {
            response = await fetch(url).then(res => res.json())
        }      
        catch (e) {
            console.log(e.stack)
            return message.reply({allowedMentions: {repliedUser: true}, content: "An Error Occured, Try Again"})
        }
        try {
            if(response.type === 'disambiguation') { // If Their Are Many Results With Same Seached Topic
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(response.title)
                .setURL(response.content_urls.desktop.page)
                .setDescription([`
                ${response.extract}
                Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`]) // If Their Are Many Results With Same Seached Topic
                message.reply({embeds: [embed]})
            }
            else { // If Only One Result
                const embed = new MessageEmbed()
                .setColor("F037A5")
                .setTitle(response.title)
                .setThumbnail(response.thumbnail.source)
                .setURL(response.content_urls.desktop.page)
                .setDescription(response.extract)
                message.reply({embeds: [embed]})
            }
        }
        catch (e) {
            console.log(e.stack)// If Searched Query Is Not Available
        }
    }
}