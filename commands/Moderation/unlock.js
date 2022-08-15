const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require('ms')
module.exports = {
    name: 'unlock',
    aliases: [],
    category: 'Moderation',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: "Disable lockdown in a channel",
    usage: "unlock",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find((ch) => ch.name.toLowerCase() == args.join(" ").toLocaleLowerCase()) || message.channel
        if(channel.permissionOverwrites.cache.filter(permission => permission.deny.toArray().includes("SEND_MESSAGES")).size < 1)
          return message.reply({embeds :[new MessageEmbed()
            .setColor(ee.color)
            .setTitle("`This Channel is not locked!`")
          ],
        allowedMentions: {repliedUser: true}});
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
        await message.channel.send({embeds: [embed]}).then((msg) => {
           setTimeout(() => {
             msg.delete()
           }, 10000);
        })
    }
}