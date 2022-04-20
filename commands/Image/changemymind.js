const { Client, Message, MessageEmbed,MessageAttachment } = require('discord.js');
const canva = require("canvacord")

module.exports = {
    name: 'changemymind',
    aliases: [],
    category: 'Image',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let kata = args.join(" ")
        if(!kata) return message.reply({allowedMentions: false, embeds: [new MessageEmbed().setTitle("Please provide valid text").setColor(ee.color)]}).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })
        let image = await canva.Canvacord.changemymind(kata)
        let attacth = new MessageAttachment(image, "changemymind.png")
        return message.channel.send({files: [attacth]})
    }
}