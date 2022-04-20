const { Client, Message, MessageEmbed,MessageAttachment } = require('discord.js');
const fetch = require("node-fetch")
const canva = require("canvacord")
module.exports = {
    name: 'tweet',
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
        const user = message.author.username;
		const text = args.join(" ");
		if(!text) return message.reply({allowedMentions: false, embeds: [new MessageEmbed().setTitle("Please provide valid text").setColor(ee.color)]}).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })
		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`));
			const json = await res.json();
			const attachment = new MessageAttachment(json.message, "tweet.png");
		message.channel.send({content: `${message.author.username} Just Tweeted!!`, files: [attachment]})
			message.delete();
		} catch(e){
		
    message,channel.send("Error Occured PLease go in Support server and contact the developer of the bot")
	
 
}
        
    }
}