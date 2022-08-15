const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu  } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
module.exports = {
  name: "qrcode",
  description: "convert your text to qr code",
  type: 1,
  memberpermissions: [],
  defaultPermission: true,
  options: [
      {
          name: "text",
          description: "give your text to convert!",
          type: "STRING",
          required: true
      }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async ( client, interaction, args ) => {
    try {
        let text  = interaction.options.getString("text", true)
        let qr = new MessageAttachment(encodeURI(`https://chart.googleapis.com/chart?chl=${text}&chs=400x400&cht=qr&chld=H%7C0`), "qr.png").setDescription(`requested by: ${interaction.user.tag}`)
        return interaction.followUp({files: [qr]})
    } catch (error) {
      console.log(error.stack);
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`ERROR | An error occurred!`)
            .setDescription(`\`${error.message}\``),
        ],
      });
    }
  },
}