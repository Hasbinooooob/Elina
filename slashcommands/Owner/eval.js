const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, TextInputComponent, Modal, Message } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
module.exports = {
  name: "eval",
  description: "eval some code",
  type: 1,
  memberpermissions: [],
  options: [
    {
        name: "code",
        description: "the code",
        type: "STRING",
        required: true
    }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, interaction, message, args) => {
    try {
        if(interaction.user.id !== config.ownerID) return

        i = interaction

        let result = interaction.options.getString("code")
        let evaluated = eval(result);
        const success = new MessageEmbed() // Prettier()
         .setColor("F037A5")
         .addField(`Input:\n`, "```js\n" + `${result}` + "```", false)
         .addField(`Output:\n`, "```js\n" + evaluated + "```", true)
        interaction.followUp({embeds: [success]});
        
       } catch (err) {
        const errormessage = new MessageEmbed() // Prettier()
        .setColor("#e31212")
        .setTitle("An error has occured")
        .addField(`Input:\n`, "```js\n" + `${result}` + "```", false)
        .addField(`Output:\n`, "```js\n" + `${err.message}` + "```", true)
        interaction.reply({embeds: [errormessage]});
        return console.log(err.stack)
       } 
  },
}
