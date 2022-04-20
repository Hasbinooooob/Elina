const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../config/embed.json");

const fetch = require("node-fetch")

module.exports = {
  name: "githubinfo",
  aliases: ["github"],
  category: "",
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
    .setDescription(response.bio ? response.bio : 'No Bio') // Bio Of User Searched
    .addField("Name", `\`${response.name}\``,true)
    .addField('Id', `\`${response.id.toLocaleString()}\``, true)
    .addField("Type", `\`${response.type}\``, true)
    .addField('Public Repositories', `\`${response.public_repos.toLocaleString()}\``, true) // Repos Of User Searched
    .addField('Followers', `\`${response.followers.toLocaleString()}\``, true) // Followers Of User Searched
    .addField('Following', `\`${response.following.toLocaleString()}\``, true) // How Many Following Of User Searched
    .addField('Email', `\`${response.email ? response.email : `No Email`}\``, true) // Email Of User Searched
    .addField('Company', `\`${response.company ? response.company : `No Company`} \``, true) // Company Of User Searched
    .addField('Location', `\`${response.location ? response.location : `No Location`}\``, true) // Location Of User Searched
    .addField("Created at", response.created_at.toLocaleString(), true)
    .addField("Update at", response.updated_at.toLocaleString(), true)

    let profile = new MessageButton()
    .setStyle("LINK")
    .setLabel("Profile")
    .setURL(response.html_url)

    let row = new MessageActionRow().addComponents([profile])

    message.reply({embeds: [embed], components: [row]})
  },
};