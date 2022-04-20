
const config = require("../config/config.json"); //loading config file with token and prefix, and settings
const ee = require("../config/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { Client, Message, MessageEmbed } = require('discord.js');

const client = require("..");

/** 
  * @param {Client} client 
  * @param {Message} message 
  * @param {String[]} args 
  */

//here the event starts
client.on("messageCreate", async (message) => {

  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild || !message.channel) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();

    if (message.author.bot) return;
    
    
    let prefix = config.prefix

    function escapeRegex(str) {
      try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
      } catch (e) {
        console.log(String(e.stack).bgRed)
      }
    }

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id))
        return message.channel.send({embeds: [new Discord.MessageEmbed()
          .setDescription(`<@${message.author.id}>To see all Commands type: \`${config.prefix}help\``).setColor("F037A5")]});
      return;
    }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command) {
      if (!message.member.permissions.has(command.memberpermissions || [])) return message.reply({allowedMentions: false, content: `** ❌ You don't Have \`${command.memberpermissions}\` To Run Command.. **`})
      //run the command with the parameters:  client, message, args, Cmduser, text, prefix,
      command.run(client, message, args, prefix);
    }

  } catch (e) {
    console.log(String(e.stack).magenta)
    return message.channel.send({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setTitle(`Eror | An error occurred!`)
      .setDescription(`\`\`\`${String(JSON.stringify(e.message)).substr(0, 2000)}\`\`\``)]});
  }
})
