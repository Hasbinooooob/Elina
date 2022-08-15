const { Client, Message, MessageEmbed, MessageAttachment, MessageButton, MessageActionRow, MessageSelectMenu, Util } = require('discord.js');
const Discord = require("discord.js")
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const activities = require("../../config/activities.json")
const distube = require("../../utils/distubeClient")
const {Canvacord} = require("canvacord")
const dick = require("discord-image-generation")
const { getSFWImage, getNSFWImage } = require('waifu.pics-wrapper');
const fetch = require("node-fetch");
const lolot = require("nekos.life")
let akeneko = require("akaneko")
const { sfw, nsfw } = new lolot()
const AmeClient = require("amethyste-api");
let AmeAPI = new AmeClient(config.Amethyste);
const { readdirSync } = require("fs")
module.exports = {
    name: 'test',
    aliases: [''],
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
        let file = new MessageAttachment("https://cdn.discordapp.com/attachments/882091875589324836/979225471155855370/GTAtitles-1.mp4", "bruh.mp4")
        if(message.author.id !== "779348805920227358") return message.reply({allowedMentions: {repliedUser: true}, files: [file]})
        try {
        const { channel } = message.member.voice
      if(!channel) return message.reply({allowedMentions: {repliedUser: true}, content: "you must join voice channel"})
      if(channel.type !== "GUILD_VOICE") return
     channel.createInvite({
        maxAge: 86400,
        maxUses: 0,
        targetType: 2,
        targetApplication: "880218394199220334",
      }).then((invite) => {
        if(!invite.code) return message.channel.send({content: "I was unable to start a Watch Together session"})
        message.channel.send({content: `${invite.url}`})
      })
          
        } catch (e) {
          console.log(e.stack)
        } 
	}        
  }
