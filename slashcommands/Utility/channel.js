const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageAttachment, MessageButton, MessageSelectMenu  } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.json");
const moment = require("moment")

let channelTypes = {
    "GUILD_TEXT": "Text",
    "GUILD_VOICE": "Voice",
    "GUILD_NEWS": "Announcement",
    "GUILD_STAGE_VOICE": "Stage Voice"
}


module.exports = {
  name: "channel",
  description: "channel",
  type: 1,
  memberpermissions: [],
  options: [
      {
          name: "info",
          description: "get channel information",
          type: "SUB_COMMAND",
          options: [
              {
                  name: "channel",
                  description: "Select a channel",
                  type: "CHANNEL",
                  required: false
              }
          ]
      },
      {
          name: "create",
          description: "create channel",
          type: "SUB_COMMAND",
          options: [
              {
                  name: "name",
                  type: "STRING",
                  description: "channel name",
                  required: true
              },
              {
                  name: "type",
                  type: "STRING",
                  description: "channel type",
                  required: true,
                  choices: [
                      {
                          name: "Category",
                          value: "ch_category"
                      },
                      {
                          name: "Text",
                          value: "ch_text"
                      },
                      {
                          name: "Voice",
                          value: "ch_voice"
                      },
                      {
                          name: "News",
                          value: "ch_news"
                      },
                      {
                          name: "Stage Voice",
                          value: "ch_stage"
                      }
                  ]
              },
              {
                  name: "topic",
                  description: "channel topic",
                  type: "STRING",
                  required: false
              }
          ]
      },
      {
        name: "delete",
        description: "delete channel",
        type: "SUB_COMMAND",
        options: [
            {
                name: "channel",
                description: "the channel to be deleted",
                type: "CHANNEL",
                required: true
            },
            {
              name: "reason",
              description: "reason",
              type: "STRING",
              required: false
          }
        ]
    }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
        let sub = interaction.options.getSubcommand()
        switch (sub) {
            case "info":
                let role = interaction.options.getChannel("channel").type === "" || interaction.channel;
                const embeduserinfo =  new MessageEmbed()
                    embeduserinfo.setColor(ee.color)
                    embeduserinfo.addField('**❱ Name:**', `\`${role.name}\``, true)
                    embeduserinfo.addField('**❱ ID:**', `\`${role.id}\``, true)
                    embeduserinfo.addField('**❱ Type **', `\`${channelTypes[role.type]}\``, true)
                    embeduserinfo.addField(`**❱ Topic **`, `\` ${role.topic ? role.topic: "no Topic"} \``, true)
                    embeduserinfo.addField('**❱ Date Created:**', "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", true)
                    embeduserinfo.addField('**❱ Position:**', `\`${role.rawPosition}\``, true)
                    embeduserinfo.addField('**❱ Manageable:**', `\`${role.manageable ? "✔️" : "❌"}\``, true)
                    embeduserinfo.addField(`**❱ NSMW **`, `\`${role.nsfw ? "✔️" : "❌"}\``, true)
                    embeduserinfo.setThumbnail(interaction.guild.iconURL({dynamic: true}))
                    embeduserinfo.setFooter({text:`request by: ${interaction.user.tag}` ,iconURL: interaction.user.displayAvatarURL({dynamic: true})})
                    //send the EMBED        
                    interaction.followUp({embeds: [embeduserinfo]});
            break;

            case "create":

            if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`You don't Have \`MANAGE CHANNELS\` To Run Command..`)]})
            let name = interaction.options.getString("name")
            let choices = interaction.options.getString("type")
            let topic = interaction.options.getString("topic")
            if(!topic){
                topic = "No Topic"
            }

            switch (choices) {
                case "ch_category":

                interaction.guild.channels.create(name, {
                    type: "GUILD_CATEGORY",
                    position: interaction.channel.position,
                    topic: topic
                }).then(async (ch) => {
                    interaction.followUp({embeds: [new MessageEmbed().setDescription(`<#${ch.id}> successfully made \nname: \`${name}\`\ntype: \`Category\``).setColor(ee.color).setFooter({text: `requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic:true})})]})
                })
                    break;
                    case "ch_text":
                interaction.guild.channels.create(name, {
                    type: "GUILD_TEXT",
                    position: interaction.channel.position,
                    topic: topic
                }).then(async (ch) => {
                    interaction.followUp({embeds: [new MessageEmbed().setDescription(`<#${ch.id}> successfully made \nname: \`${name}\`\ntype: \`Text\``).setColor(ee.color).setFooter({text: `requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic:true})})]})
                })
                    
                    break;

                    case "ch_voice":

                interaction.guild.channels.create(name, {
                    type: "GUILD_VOICE",
                    position: interaction.channel.position,
                    topic: topic
                }).then(async (ch) => {
                    interaction.followUp({embeds: [new MessageEmbed().setDescription(`<#${ch.id}> successfully made \nname: \`${name}\`\ntype: \`Voice\``).setColor(ee.color).setFooter({text: `requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic:true})})]})
                })
                    
                    break;

                    case "ch_news":

                interaction.guild.channels.create(name, {
                    type: "GUILD_NEWS",
                    position: interaction.channel.position,
                    topic: topic
                }).then(async (ch) => {
                    interaction.followUp({embeds: [new MessageEmbed().setDescription(`<#${ch.id}> successfully made \nname: \`${name}\`\ntype: \`News\``).setColor(ee.color).setFooter({text: `requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic:true})})]})
                })
                    
                    break;

                    case "ch_stage":
                interaction.guild.channels.create(name, {
                    type: "GUILD_STAGE_VOICE",
                    position: interaction.channel.position,
                    topic: topic
                }).then(async (ch) => {
                    interaction.followUp({embeds: [new MessageEmbed().setDescription(`<#${ch.id}> successfully made \nname: \`${name}\`\ntype: \`Stage Voice\``).setColor(ee.color).setFooter({text: `requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic:true})})]})
                })
                    break;
            
                default:
                    break;
            }
            break;

            case "delete": 
            if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.followUp({embeds: [new MessageEmbed().setColor(ee.color).setDescription(`You don't Have \`MANAGE CHANNELS\` To Run Command..`)]})
            let channel = interaction.options.getChannel("channel")
            let reason = interaction.options.getString("reason")
            if(!reason) {
                reason = "no reason"
            }

            await channel.delete().then(async (ch) => {
                interaction.followUp({embeds: [new MessageEmbed().setDescription(`\`${channel.name}\` has been deleted`).setColor(ee.color).setFooter({text: `requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic:true})})]})
            })

            break;
            default:
                console.log(interaction.commandName)
                break;
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
