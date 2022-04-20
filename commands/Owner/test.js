const { Client, Message, MessageEmbed, MessageAttachment, MessageButton, MessageActionRow } = require('discord.js');
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

const bruh = require("neko-love")

let akeneko = require("akaneko")

let kon = new bruh.Client()


const { sfw, nsfw } = new lolot()

const Meme = require("memer-api");
const meme = new Meme(config.meme_api)

const AmeClient = require("amethyste-api");
let AmeAPI = new AmeClient(config.Amethyste);
const akinator = require("discord.js-akinator");



module.exports = {
    name: 'test',
    aliases: [''],
    category: ' ',
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

        let file = new MessageAttachment("https://cdn.discordapp.com/attachments/873897844510162964/941209576420827156/946edb9720377d3b-11_-_2022-02-06T202705.787.mp4", "bruh.mp4")
        if(message.author.id !== "779348805920227358") return message.reply({allowedMentions: {repliedUser: true}, files: [file]})

        try {

            akinator(message, {
                language: "id",
                childMode: false,
                gameType: "character",
                embedColor: "F037A5",
                useButtons: true
            })
        
        } catch (e) {
          console.log(e.stack)
        }

        
	}        
    }
