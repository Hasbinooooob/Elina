const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
module.exports = {
    name: 'lock',
    aliases: [],
    category: 'Moderation',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: "Start lockdown in a channel",
    usage: "lock",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find((ch) => ch.name.toLowerCase() == args.join(" ").toLocaleLowerCase()) || message.channel;
        let reason = args.slice(1).join(" ")
        if(!reason) {
            reason = "no reason"
        }
        if(channel.permissionOverwrites.cache.size < 1){
            await channel.permissionOverwrites.set(
              [{
                id: message.guild.roles.everyone.id,
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
        await message.channel.send({embeds: [embed]}).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 10000);
        })
    }
}