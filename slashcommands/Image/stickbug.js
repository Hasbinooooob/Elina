const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
const discordfuns = require("discord-funs")
const fetch = require("node-fetch")
module.exports = {
  name: "stickbug",
  description: "turn image into stickbug",
  type: 1,
  memberpermissions: ["ATTACH_FILES"],
  defaultPermission: true,
  default_member_permissions: Permissions.FLAGS.ATTACH_FILES,
  dm_permission: true,
  options: [
    {
        name: 'image',
        description: "the image [ image must be in png/jpeg/jpg format ]",
        type: "ATTACHMENT",
        required: false
    },
    {
      name: "url",
      description: "Image url",
      type: "STRING",
      required: false
    },
    {
      name: "user",
      description: "User Avatar",
      type: "USER",
      required: false
    }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
    let images = interaction.options.getAttachment("image") 
    if(images){
    let buf = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=stickbug&url=${images.proxyURL}`))
    let json = await buf.json()
    let attach = new MessageAttachment(json.message, "stickbug.mp4")
    interaction.followUp({files: [attach]})
    }

    let string = interaction.options.getString("url")
    if(string) {

    if(!string.includes("https://")) return interaction.followUp({embeds: [{description: "`it was an invalid url!`", color: ee.color}]})
    let buff = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=stickbug&url=${string}`))
    let jsonn = await buff.json()
    let attachh = new MessageAttachment(jsonn.message, "stickbug.mp4")
    interaction.followUp({files: [attachh]})
    }

    let member = interaction.options.getUser("user")
    if(member) {
    let bufff = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=stickbug&url=${member.displayAvatarURL({dynamic: false, format: 'png'})}`))
    let jsonnn = await bufff.json()
    let attachhh = new MessageAttachment(jsonnn.message, "stickbug.mp4")
    interaction.followUp({files: [attachhh]})
    }
    
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

