const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu  } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
module.exports = {
  name: "lock",
  description: "lock a channel",
  type: 1,
  defaultMemberPermissions: ["MANAGE_CHANNELS"],
  options: [
    {
        name: "channel",
        description: "channel to lock",
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
        let channels = interaction.options.getChannel("channel") || interaction.channel
        let channel = interaction.guild.channels.cache.get(channels.id)
        if(channel.isThread()) {
            channel.setLocked(true)
            interaction.followUp({embeds: [new MessageEmbed().setDescription(`🔒 ${channel} has been locked`).setColor(ee.color).setTitle("Channel Updates")]})
        }
        if(channel.permissionOverwrites.cache.size < 1){
            await channel.permissionOverwrites.set(
              [{
                id: interaction.guild.roles.everyone.id,
                deny: ["SEND_MESSAGES", "ADD_REACTIONS"],
              }]
            )
        } else {
        await channel.permissionOverwrites.set(
          channel.permissionOverwrites.cache.map(permission => {
            let Obj = {
              id: permission.id,
              deny: permission.deny.toArray(),
              allow: permission.allow.toArray(),
            };
            if(Obj.allow.includes("SEND_MESSAGES")){
              Obj.deny.push("SEND_MESSAGES");
              let index = Obj.allow.indexOf("SEND_MESSAGES");
              if(index > -1){
                Obj.allow.splice(index, 1);
              }
            }
            if(Obj.allow.includes("ADD_REACTIONS")){
              Obj.deny.push("ADD_REACTIONS");
              let index = Obj.allow.indexOf("ADD_REACTIONS");
              if(index > -1){
                Obj.allow.splice(index, 1);
              }
            }
            return Obj;
        }))
        }
        const embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle("Channel Updates")
            .setDescription(`🔒 ${channel} has been Locked`)
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
