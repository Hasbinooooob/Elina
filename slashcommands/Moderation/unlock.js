const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu  } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
module.exports = {
  name: "unlock",
  description: "unlock a channel",
  type: 1,
  defaultMemberPermissions: ["MANAGE_CHANNELS"],
  options: [
    {
        name: "channel",
        description: "channel to unlock",
        type: "CHANNEL",
        channelTypes: ["GUILD_NEWS", "GUILD_TEXT"],
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
        if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.followUp({embeds: [{description: "I don't have permission `MANAGE CHANNELS`!", color: ee.color}]})
        const channel = interaction.options.getChannel("channel") || interaction.guild.channels.cache.get(interaction.channel.id)
        if(channel.isThread()) {
            channel.setLocked(false, "idk")
            interaction.followUp({embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setTitle("Channel Updates")
                .setDescription(`🔒 ${channel} has been Unlocked`)]})
        }
        if(channel.permissionOverwrites.cache.filter(permission => permission.deny.toArray().includes("SEND_MESSAGES")).size < 1)
          return interaction.followUp({embeds :[new MessageEmbed()
            .setColor(ee.color)
            .setTitle("`This Channel is not locked!`")
          ]});
      await channel.permissionOverwrites.set(
        channel.permissionOverwrites.cache.map(permission => {
          let Obj = {
            id: permission.id,
            deny: permission.deny.toArray(),
            allow: permission.allow.toArray(),
          };
          if(Obj.deny.includes("SEND_MESSAGES")){
            Obj.allow.push("SEND_MESSAGES");
            let index = Obj.deny.indexOf("SEND_MESSAGES");
            if(index > -1){
              Obj.deny.splice(index, 1);
            }
          }
          if(Obj.deny.includes("ADD_REACTIONS")){
            Obj.allow.push("ADD_REACTIONS");
            let index = Obj.deny.indexOf("ADD_REACTIONS");
            if(index > -1){
              Obj.deny.splice(index, 1);
            }
          }
          return Obj;
      }))
        const embed =  new MessageEmbed()
        .setColor(ee.color)
        .setTitle("Channel Updates")
        .setDescription(`🔒 ${channel} has been Unlocked`)
        await interaction.followUp({embeds: [embed]}).then((msg) => {
           setTimeout(() => {
             msg.delete()
           }, 10000);
        })
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