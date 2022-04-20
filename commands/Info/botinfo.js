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
    .addField("❱ ID", `\`${client.user.id}\``, true)
    .addField("❱ Tag", `\`${client.user.tag}\``, true)
    .addField("❱ Owner", `[\`${owner} \`](https://discordapp.com/users/779348805920227358/)`)
    .addField("❱ version", "`3.6.3`")
    .addField("❱ Servers", `\`${client.guilds.cache.size}\``, true)
    .addField("❱ Users", `\`${client.users.cache.size}\``, true)
    .addField("❱ Channels", `\`${client.channels.cache.size}\``, true)
    .addField("❱ Discord.js version", `\`${version}\``, true)
    .addField("❱ Commands Total", `\`${client.commands.size}\``, true)
    .addField("❱ Slash commands total", `\`${client.slashCommands.size}\``, true)
    .addField("❱ Created at", `\`${moment(client.user.createdTimestamp).format("DD/MM/YYYY")}\``)
    .addField("❱ Bot uptime", `\`${duration}\``, true)
    .setTimestamp()
    .setFooter({text: `requested by: ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
    .setImage("https://cdn.discordapp.com/attachments/942238766620377149/964000926966886400/Elina.gif?size=4096")

      message.reply({embeds: [embed], components: [row]})
  }
}
