const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
const ms = require("ms")

module.exports = {
  name: "clear",
  description: "Clear Messages from a Channel",
  type: "CHAT_INPUT",
  memberpermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
  options: [
      {
          name: "amount",
          description: "Number of message to delete",
          type: "NUMBER",
          required: false
      },
      {
          name: "channel",
          description: "Select the Channel",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT", "GUILD_NEWS"],
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

        let amount = interaction.options.getNumber("amount")
        let channel = interaction.options.getChannel("channel") || interaction.channel;
        if(!amount) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription("Please specify the amount of the messages to be deleted")]})
        if(amount > 150) return interaction.followUp({embeds: [new MessageEmbed().setDescription("The maximal amount is `150`").setColor(ee.color)]})
        
        if(amount) {

        const messages = await interaction.channel.messages.fetch({ limit: amount + 1})

        const filtered = messages.filter((msg) => Date.now() - msg.createdTimestamp < ms("14 days"))

            channel.bulkDelete(filtered, true).then(async () => {
               return interaction.channel.send({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`✅ Cleared **${filtered.size}**/**${amount}** messages!`)]}).then((msg) => {
                   setTimeout(() => {
                       msg.delete()
                   }, 5000);
               })
            })
            
            
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
};