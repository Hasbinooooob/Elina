const { Client, Message, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Permissions, Modal, TextInputComponent} = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json")
module.exports = {
  name: "",
  aliases: [],
  category: "",
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
      
    } catch (error) {
      console.log(error.stack);
    }
  },
};

//slash
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu, Modal, TextInputComponent } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
module.exports = {
  name: "",
  description: "",
  type: 1,
  memberpermissions: [],
  options: [],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
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

//contexMenu Message
const { Client, ContextMenuInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
module.exports = {
  name: "",
  type: 3,
  memberpermissions: [],
  /**
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
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

//contexMenu Message
const { Client, ContextMenuInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");

module.exports = {
  name: "",
  type: 2,
  memberpermissions: [],
  /**
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
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