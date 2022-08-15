const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, DiscordAPIError} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
module.exports = {
  name: "steam",
  aliases: [],
  category: "Utility",
  memberpermissions: [],
  description: "",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      let gamename = args.join(" ")
      if(!gamename) return message.reply({embeds: [new MessageEmbed().setDescription("`Please specify a title to search!`").setColor(ee.color)]})
      let msg = await interaction.followUp(`Searching for the game... (If this stuck then your game name is not valid)`);
      let data = await fetch(`https://api.popcat.xyz/steam?q=${gamename}`).then(x => x.json())
      const embed = new Discord.MessageEmbed()
      .setAuthor(data.name,data.error, client.user.displayAvatarURL(), `${data.website}`)
      .setDescription(data.description, "Developer:", data.developers)
      .setImage(data.thumbnail)
      .setFooter(`Price, ${data.price}`)
      .setColor('#f7c555')
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [embed] });
      }, 1000);
    } catch (error) {
      console.log(error.stack);
    }
  },
};