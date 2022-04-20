const { Client, Message, MessageEmbed, ShardingManager } = require('discord.js');
const Statcord = require("statcord.js")
const client = require('../index');
const config = require('../config/config.json')
/** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
client.on('ready', () => {
  console.log(
    `
    ..............................................................................
    ........................${client.user.username} Is Online ....................
    ..............................................................................
    `
  );

  let acti = [
    `E!help`,
    `${client.guilds.cache.size} server added`,
    `${client.users.cache.size} users`,
    `Your ❤️`
  ]
  setInterval(() => {
    let statuss = acti[Math.floor(Math.random() * acti.length)]
    client.user.setActivity(statuss, {type: "STREAMING", url: "https://www.twitch.tv/hasbinooooob"})
  },5000)

  let statcord = new Statcord.Client({
    client,
    postCpuStatistics: true,
    postNetworkStatistics: true,
    postMemStatistics: true,
    key: "statcord.com-nAOa29sblI2yL3T0u6TV"
  })

  statcord.post()

  statcord.on("autopost-start", async () => {
    console.log("Start post")
  })

  statcord.on("post", status => {
    // status = false if the post was successful
    // status = "Error message" or status = Error if there was an error
    if (!status) console.log("Successful post");
    else console.error(status);
});



})



