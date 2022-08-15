const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
module.exports = {
  name: "search-music",
  aliases: ["searchm"],
  category: "Music",
  memberpermissions: "",
  description: "Search Song",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
    const { channel } = message.member.voice;
    if (!channel)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join Voice Channel To Search Song`)
      ]})
        .then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.reply({ allowedMentions: false,embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Please Join My Voice Channel ${message.guild.me.voice.channel}`)]})
        .then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
    if (!args.length)
      return message.reply({allowedMentions: false,embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`Please Enter Song Name to Play Song`)
    ]}).then((msg) => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        });
    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) return message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`I am Not Allowed In Voice Channel`)]
    }).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 5000);
        });
        let songs = args.join(" ")
        distube.search(songs, {
            type: "video",
            safeSearch: true,
            limit: 15
        }).then((ss) => {
            let tracks = ss
              .map((song, index) => {
                return [
                  `\`${index + 1}\`) [\`${song.name}\`](${song.url}) \`[${song.formattedDuration}]\``,
                ].join(" ' ");
              })
              .join("\n\n");
            let embed = new MessageEmbed()
              .setColor(ee.color)
              .setTitle(`\`${songs}\` Search Results`)
              .setDescription(tracks.substr(0, 3800))
              .setFooter({text: `requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
              let menu = new MessageSelectMenu()
              .setMinValues(1)
              .setMaxValues(1)
              .setDisabled(false)
              .setCustomId("search")
              .setPlaceholder(`choose the song you want to play`)
              .addOptions(
                ss.map((song, index) => {
                  return {
                    label: song.name.substr(0, 50),
                    value: song.url,
                    description: `${song.formattedDuration} | ${song.uploader.name}`
                  };
                })
              )
              .addOptions({label: "Cancel", value: "cancel", description: "cancel this search"})
            let menuraw = new MessageActionRow().addComponents(menu);
            message
              .channel.send({embeds: [embed], components: [menuraw] })
              .then(async (msg) => {
                let filter = (i) => i.user.id === message.member.id;
                let collector = await msg.createMessageComponentCollector({
                  filter: filter, time: 30000
                });
                collector.on("collect", async (interaction) => {
                  if (interaction.isSelectMenu()) {
                    if (interaction.customId === "search") {
                      await interaction.deferUpdate().catch((e) => {}); 
                      if(interaction.values[0] === "cancel") {
                       return msg.edit({embeds: [new MessageEmbed().setDescription("You Canceled the search").setColor(ee.color)]}).then(async (msg) => {
                        collector.stop("canceled the search music")
                       })
                        }
                      let song = interaction.values[0];
                      distube.play(channel, song, {
                        member: interaction.member,
                        textChannel: interaction.channel,
                      });
                      try {
                        msg.edit({components: [new MessageActionRow().addComponents(menu.setDisabled(true))]})
                      } catch (error) {
                        console.log(error.stack)
                      }
                    }
                  }
                });
                collector.on("end", async () => {
                    let click = new MessageActionRow().addComponents(menu.setDisabled(true))
                    msg.edit({components: [click]})
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })
              });
          });
        } catch (error) {
            console.log(error)
        }
  },
};
