const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../config/embed.json");
const fetch = require("node-fetch")
module.exports = {
  name: "githubinfo",
  aliases: ["github"],
  category: "Info",
  memberpermissions: [],
  cooldown: 5,
  description: "",
  usage: "[command] [github username]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const name = args.join(' ')
    if(!name) return message.reply('Provide A Valid User To Search.') // If User Is Not Found On GitHub
    const url = `https://api.github.com/users/${name}` // Link From BOT Will Get Info
    let response
    try{
        response = await fetch(url).then(res => res.json())
        console.log(response)
    }
    catch(e) {
        return message.reply('An Error Occured, Try Again Later.')
    }
    const embed = new MessageEmbed()
    .setColor(ee.color)
    .setTitle(`${response.login}`)
    .setURL(response.html_url)
    .setThumbnail(response.avatar_url)
    .setDescription(`\`${response.bio ? response.bio : 'No Bio'}\``)
    .addFields([
      {
        name: "❱ Name",
        value: `\`${response.name}\``,
        inline: true
      },
      {
        name: "❱ Id",
        value: `\`${response.id.toLocaleString()}\``,
        inline: true
      },
      {
        name: "❱ type",
        value: `\`${response.type}\``,
        inline: true
      },
      {
        name: "❱ Public Repositories",
        value: `\`${response.public_repos.toLocaleString()}\``,
        inline: true
      },
      {
        name: "❱ Folowers",
        value: `\`${response.followers.toLocaleString()}\``,
        inline: true
      },
      {
        name: "❱ Following",
        value: `\`${response.following.toLocaleString()}\``,
        inline: true
      },
      {
        name: "❱ Email",
        value: `\`${response.email ? response.email : `No Email`}\``,
        inline: true
      },
      {
        name: "❱ Company",
        value: `\`${response.company ? response.company : `No Company`} \``,
        inline: true
      },
      {
        name: "❱ Location",
        value: `\`${response.location ? response.location : `No Location`}\``,
        inline: true
      },
      {
        name: "❱ Created at",
        value: `\`${response.created_at.toLocaleString()}\``,
        inline: true
      },
      {
        name: "❱ Update at",
        value: `\`${response.updated_at.toLocaleString()}\``,
        inline: true
      }
    ])
    let profile = new MessageButton()
    .setStyle("LINK")
    .setLabel("Profile")
    .setURL(response.html_url)
    let row = new MessageActionRow().addComponents([profile])
    message.reply({embeds: [embed], components: [row]})
  },
};