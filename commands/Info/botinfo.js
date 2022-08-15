const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, version } = require('discord.js');
const config = require("../../config/config.json");
const moment = require("moment")
module.exports = {
  name: 'botinfo',
  category: "Info",
  aliases: ["bot", "stats"],
  cooldown: 5,
  description: 'Elina information',
  usage: '[command]',
  memberpermissions: [],
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
  let owner = client.users.cache.find(mem => mem.id === "779348805920227358").tag
  const duration = moment.duration(client.uptime).format(` D [days], H [hours], m [minutes], s [seconds]`)
      let vote = new MessageButton()
      .setStyle("LINK")
      .setLabel("Discord Bots list")
      .setURL("https://discordbotlist.com/bots/elina")
      let top = new MessageButton()
      .setStyle("LINK")
      .setLabel("Top gg")
      .setURL("https://top.gg/bot/878172039171694612")
      let row = new MessageActionRow()
      .addComponents(vote, top)
    let embed = new MessageEmbed()
    .setAuthor({name: `${client.user.username} bot`, iconURL: `${client.user.displayAvatarURL()}`, url: "https://elina-web.hasbi-jallunnab.repl.co/"})
    .setColor("F037A5")
    .addFields({name: "❱ ID", value: `\`${client.user.id}\``, inline: true})
    .addFields({name: "❱ Tag", value: `\`${client.user.tag}\``, inline: true})
    .addFields({name: "❱ Owner", value: `[\`${owner} \`](https://discordapp.com/users/779348805920227358/)`, inline: true})
    .addFields({name: "❱ version", value: "`4.4.5`", inline: true})
    .addFields({name: "❱ Servers", value: `\`${client.guilds.cache.size}\``, inline: true})
    .addFields({name: "❱ Users", value: `\`${client.users.cache.size}\``, inline: true})
    .addFields({name: "❱ Channels", value: `\`${client.channels.cache.size}\``, inline: true})
    .addFields({name: "❱ Discord.js version", value: `\`${version}\``, inline: true})
    .addFields({name: "❱ Commands Total", value: `\`${client.commands.size}\``, inline: true})
    .addFields({name: "❱ Slash commands total", value: `\`${client.slashCommands.size}\``, inline: true})
    .addFields({name: "❱ Created at", value: `\`${moment(client.user.createdTimestamp).format("DD/MM/YYYY")}\``, inline: true})
    .addFields({name: "❱ Bot uptime", value: `\`${duration}\``, inline: true})
    .setTimestamp()
    .setFooter({text: `requested by: ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
    .setImage("https://cdn.discordapp.com/attachments/942238766620377149/964000926966886400/Elina.gif?size=4096")
      message.reply({embeds: [embed], components: [row]})
  }
}
