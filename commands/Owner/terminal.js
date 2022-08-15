const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const child = require("child_process")
module.exports = {
    name: 'terminal',
    aliases: [],
    category: 'Owner',
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
        if(message.author.id !== "779348805920227358") return;
        try {
            const command = args.join(" ");
            const embed = new MessageEmbed()
              .setDescription("please give a command to run in terminal!")
              .setColor("F037A5");
            if (!command) return message.channel.send({embeds: [embed]});
            child.exec(command, (err, res) => {
              if (err) return console.log(err);
              message.channel.send("```js\n" + res.slice(0, 2000) + "\n```", {
                code: "js",
              });
            });  
        } catch (error) {
            console.log(error.stack)
        }
	}        
  }
